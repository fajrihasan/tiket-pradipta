import { NextRequest, NextResponse } from "next/server";
import { snap } from "@/lib/midtrans";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getPresaleInfo } from "@/lib/presale";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { buyer_name, buyer_email, buyer_phone, event_id, quantity, amount } =
      body;

    // Validate
    const missing = [];
    if (!buyer_name) missing.push("buyer_name");
    if (!buyer_email) missing.push("buyer_email");
    if (!event_id) missing.push("event_id");
    if (!quantity) missing.push("quantity");
    if (!amount) missing.push("amount");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Data tidak lengkap: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    // Fetch total sold tickets to determine presale price
    const { data: soldData, error: countError } = await supabaseAdmin
      .from("orders")
      .select("quantity")
      .eq("status", "paid");

    let soldCount = 0;
    if (!countError && soldData) {
      soldCount = soldData.reduce((acc, order) => acc + (order.quantity || 0), 0);
    }

    const presaleInfo = getPresaleInfo(soldCount);
    const actualPrice = presaleInfo.priceNumber;
    const totalPrice = actualPrice * quantity;

    // Insert order (matching actual DB column names)
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        full_name: buyer_name,
        email: buyer_email,
        phone: buyer_phone || null,
        event_id,
        quantity,
        total_price: totalPrice,
        status: "pending",
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("Order insert error:", orderError);
      return NextResponse.json(
        { error: "Gagal membuat order" },
        { status: 500 },
      );
    }

    // Create Midtrans transaction
    const orderId = `PRADIPTA-${order.id.slice(0, 8).toUpperCase()}-${Date.now()}`;

    // Update order with midtrans order_id
    await supabaseAdmin
      .from("orders")
      .update({ midtrans_order_id: orderId })
      .eq("id", order.id);

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: totalPrice,
      },
      customer_details: {
        first_name: buyer_name,
        email: buyer_email,
        phone: buyer_phone || "",
      },
      item_details: [
        {
          id: event_id,
          price: actualPrice,
          quantity: quantity,
          name: `Tiket PRADIPTA (${presaleInfo.name})`,
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);

    return NextResponse.json({
      snap_token: transaction.token,
      order_id: order.id,
    });
  } catch (err: any) {
    console.error("Midtrans create error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}
