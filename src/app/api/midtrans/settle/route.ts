import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendTicketEmail } from "@/lib/email";
import QRCode from "qrcode";
import crypto from "crypto";

/**
 * Dipanggil dari frontend setelah Midtrans Snap onSuccess.
 * Proses: update order → generate tiket + QR → kirim email.
 */
export async function POST(req: NextRequest) {
  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json({ error: "order_id required" }, { status: 400 });
    }

    // Find order
    const { data: order, error: findError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", order_id)
      .single();

    if (findError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Skip if already processed
    if (order.status === "paid") {
      return NextResponse.json({
        message: "Already processed",
        status: "paid",
      });
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
    const { data: tickets, error: ticketError } = await supabaseAdmin
      .from("tickets")
      .insert(ticketRows)
      .select("id, qr_code");

    if (ticketError) {
      console.error("Ticket insert error:", ticketError);
    }

    // Send email with QR codes
    let emailStatus = "no_email";
    if (order.email) {
      try {
        await sendTicketEmail(order.email, order.full_name, qrBuffers);
        emailStatus = "sent";
      } catch (emailError: any) {
        console.error("Email send error:", emailError);
        emailStatus = `failed: ${emailError.message}`;
      }
    }

    return NextResponse.json({
      message: "Payment processed",
      status: "paid",
      tickets_created: tickets?.length || 0,
      email: emailStatus,
    });
  } catch (err: any) {
    console.error("Settle error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
