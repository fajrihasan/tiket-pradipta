import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import qrcode from "qrcode";
import { sendTicketEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
    try {
        const { order_id } = await req.json();

        if (!order_id) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        // 1. Fetch order details
        const { data: order, error: orderError } = await supabaseAdmin
            .from("orders")
            .select("*")
            .eq("id", order_id)
            .single();

        if (orderError || !order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        if (order.status === "PAID") {
            // It's already paid, but lets check if tickets were successfully created in a previous failed run
            const { data: existingTickets } = await supabaseAdmin
                .from("tickets")
                .select("id")
                .eq("order_id", order_id);

            if (existingTickets && existingTickets.length > 0) {
                return NextResponse.json({ message: "Order is already paid and tickets exist" }, { status: 200 });
            }
            // If tickets don't exist, we continue to generate them.
        } else if (order.status !== "PENDING_PAYMENT" && order.status !== "pending") {
            return NextResponse.json({ error: "Invalid order status for confirmation" }, { status: 400 });
        }

        // 2. Generate tickets and QR codes FIRST to avoid order status desync
        const ticketInserts = [];
        for (let i = 0; i < (order.quantity || 1); i++) {
            const ticketId = crypto.randomUUID();
            ticketInserts.push({
                id: ticketId,
                order_id: order.id,
                qr_code: ticketId // fill qr_code natively to bypass not-null constraint
            });
        }

        const { data: createdTickets, error: ticketsError } = await supabaseAdmin
            .from("tickets")
            .insert(ticketInserts)
            .select("id");

        if (ticketsError || !createdTickets) {
            console.error("Failed to create tickets:", ticketsError);
            return NextResponse.json({ error: "Failed to create tickets: " + ticketsError.message }, { status: 500 });
        }

        // 3. Update status to PAID only AFTER tickets are successfully created
        if (order.status !== "PAID") {
            const { error: updateError } = await supabaseAdmin
                .from("orders")
                .update({ status: "PAID" })
                .eq("id", order_id);

            if (updateError) {
                console.error("Failed to update status:", updateError);
                return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
            }
        }

        // 4. Generate QR Code buffers & URLs for emails
        const qrBuffers = [];
        for (const t of createdTickets) {
            // The QR simply holds the ticket ID data
            const qrData = t.id;
            const buffer = await qrcode.toBuffer(qrData, { width: 300 });
            qrBuffers.push({
                qrCode: qrData,
                buffer,
            });
        }

        // 5. Send Email
        try {
            await sendTicketEmail(order.email || order.buyer_email, order.full_name || order.buyer_name, qrBuffers);
        } catch (emailErr) {
            console.error("Error sending email:", emailErr);
            // We don't fail the request if email fails, but it would be good to log it.
        }

        return NextResponse.json({ message: "Payment confirmed and tickets sent successfully" });

    } catch (err: any) {
        console.error("Admin order confirm error:", err);
        return NextResponse.json(
            { error: err.message || "Server error" },
            { status: 500 }
        );
    }
}
