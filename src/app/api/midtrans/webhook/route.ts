import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendTicketEmail } from "@/lib/email";
import QRCode from "qrcode";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      transaction_status,
      order_id,
      gross_amount,
      signature_key,
      status_code,
      fraud_status,
    } = body;

    // Verify signature
    const serverKey = process.env.MIDTRANS_SERVER_KEY!;
    const expectedSignature = crypto
      .createHash("sha512")
      .update(`${order_id}${status_code}${gross_amount}${serverKey}`)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      console.error("Invalid Midtrans signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    // Find order by midtrans_order_id
    const { data: order, error: findError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("midtrans_order_id", order_id)
      .single();

    if (findError || !order) {
      console.error("Order not found:", order_id, findError);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Handle transaction status
    if (
      transaction_status === "capture" ||
      transaction_status === "settlement"
    ) {
      // Check fraud status for card payments
      if (fraud_status && fraud_status !== "accept") {
        return NextResponse.json({ message: "Fraud detected" });
      }

      // Skip if already paid
      if (order.status === "paid") {
        return NextResponse.json({ message: "Already processed" });
      }

      // Update order status to paid
      await supabaseAdmin
        .from("orders")
        .update({ status: "paid" })
        .eq("id", order.id);

      // Generate tickets with QR codes
      const quantity = order.quantity || 1;
      const qrBuffers: { qrCode: string; buffer: Buffer }[] = [];
      const ticketRows: any[] = [];

      for (let i = 0; i < quantity; i++) {
        const qrCode = crypto.randomUUID();
        const buffer = await QRCode.toBuffer(qrCode, {
          width: 400,
          margin: 2,
          color: { dark: "#000000", light: "#ffffff" },
        });

        qrBuffers.push({ qrCode, buffer });
        ticketRows.push({
          order_id: order.id,
          qr_code: qrCode,
          is_used: false,
        });
      }

      // Insert tickets
      const { error: ticketError } = await supabaseAdmin
        .from("tickets")
        .insert(ticketRows);

      if (ticketError) {
        console.error("Ticket insert error:", ticketError);
      }

      // Send email with QR codes
      if (order.email) {
        try {
          await sendTicketEmail(order.email, order.full_name, qrBuffers);
        } catch (emailError) {
          console.error("Email send error:", emailError);
          // Don't fail the webhook — tickets are already created
        }
      }

      return NextResponse.json({ message: "Payment processed" });
    }

    if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      await supabaseAdmin
        .from("orders")
        .update({ status: "cancelled" })
        .eq("id", order.id);

      return NextResponse.json({ message: "Order cancelled" });
    }

    if (transaction_status === "pending") {
      return NextResponse.json({ message: "Payment pending" });
    }

    return NextResponse.json({ message: "Unhandled status" });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
