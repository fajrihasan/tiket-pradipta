import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getPresaleInfo } from "@/lib/presale";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("quantity")
      .eq("status", "paid");

    if (error) {
      console.error("Error fetching orders:", error);
      return NextResponse.json(
        { error: "Failed to fetch presale info" },
        { status: 500 }
      );
    }

    const soldCount = data.reduce((acc, order) => acc + (order.quantity || 0), 0);
    const presaleInfo = getPresaleInfo(soldCount);

    return NextResponse.json({
      soldCount,
      ...presaleInfo,
    });
  } catch (err: any) {
    console.error("Presale info error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
