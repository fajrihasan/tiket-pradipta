import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendTicketEmail } from "@/lib/email";
import QRCode from "qrcode";
import crypto from "crypto";

/**
 * TEST ONLY — Simulasi webhook Midtrans secara manual.
 * Panggil: GET /api/midtrans/test-settle?order_id=<uuid>
 * Ini akan:
 *   1. Update order status → "paid"
 *   2. Generate QR tiket
 *   3. Kirim email QR ke pembeli
 *
 * HAPUS ENDPOINT INI DI PRODUCTION!
 */
export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.json(
      { error: "order_id query param required" },
      { status: 400 },
    );
  }

  // Find order
  const { data: order, error: findError } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (findError || !order) {
    return NextResponse.json(
      { error: `Order not found: ${orderId}`, details: findError },
      { status: 404 },
    );
  }

  if (order.status === "paid") {
    return NextResponse.json({ message: "Already paid", order });
  }

  // Update to paid
  await supabaseAdmin
    .from("orders")
    .update({ status: "paid" })
    .eq("id", order.id);

  // Generate tickets
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

  // Send email
  let emailResult = "skipped";
  if (order.email) {
    try {
      await sendTicketEmail(order.email, order.full_name, qrBuffers);
      emailResult = `sent to ${order.email}`;
    } catch (err: any) {
      emailResult = `failed: ${err.message}`;
    }
  }

  return NextResponse.json({
    message: "Order settled (test)",
    order_id: order.id,
    status: "paid",
    tickets_created: tickets?.length || 0,
    tickets,
    ticket_error: ticketError,
    email: emailResult,
  });
}
