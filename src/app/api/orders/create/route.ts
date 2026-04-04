import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getPresaleInfo } from "@/lib/presale";

// Generate a random 3 digit number for unique amount
function generatePaymentCode() {
    return Math.floor(100 + Math.random() * 900).toString();
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { buyer_name, buyer_email, buyer_phone, event_id, quantity } = body;

        // Validate
        const missing = [];
        if (!buyer_name) missing.push("buyer_name");
        if (!buyer_email) missing.push("buyer_email");
        if (!event_id) missing.push("event_id");
        if (!quantity) missing.push("quantity");

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
            .in("status", ["paid", "PAID"]);

        let soldCount = 0;
        if (!countError && soldData) {
            soldCount = soldData.reduce((acc, order) => acc + (order.quantity || 0), 0);
        }

        const presaleInfo = getPresaleInfo(soldCount);
        const baseTotal = presaleInfo.priceNumber * quantity;

        // Generate unique amount that doesn't collide with existing PENDING orders
        let uniqueAmount = baseTotal;
        let paymentCode = "";
        let isUnique = false;
        let attempts = 0;

        while (!isUnique && attempts < 10) {
            paymentCode = generatePaymentCode();
            const testAmount = baseTotal + parseInt(paymentCode);

            const { data: existingOrder } = await supabaseAdmin
                .from("orders")
                .select("id")
                .eq("status", "PENDING_PAYMENT")
                .eq("unique_amount", testAmount)
                .maybeSingle();

            if (!existingOrder) {
                uniqueAmount = testAmount;
                isUnique = true;
            }
            attempts++;
        }

        if (!isUnique) {
            return NextResponse.json(
                { error: "Gagal membuat kode pembayaran unik. Coba beberapa saat lagi." },
                { status: 500 }
            );
        }

        // Insert order (matching actual DB column names)
        const { data: order, error: orderError } = await supabaseAdmin
            .from("orders")
            .insert({
                full_name: buyer_name,
                email: buyer_email,
                phone: buyer_phone || null,
                event_id,
                quantity,
                total_price: baseTotal,
                unique_amount: uniqueAmount,
                payment_code: paymentCode,
                payment_method: 'manual',
                status: "PENDING_PAYMENT",
            })
            .select("*")
            .single();

        if (orderError || !order) {
            console.error("Order insert error:", orderError);
            return NextResponse.json(
                { error: "Gagal membuat order" },
                { status: 500 },
            );
        }

        return NextResponse.json({
            order_id: order.id,
            unique_amount: uniqueAmount,
            payment_code: paymentCode,
            total_price: baseTotal,
        });
    } catch (err: any) {
        console.error("Create order error:", err);
        return NextResponse.json(
            { error: err.message || "Server error" },
            { status: 500 },
        );
    }
}
