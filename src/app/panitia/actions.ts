"use server";

import { createClient } from "@/lib/supabase/server";

export type ScanResult = {
  status: "valid" | "used" | "not_found" | "error";
  message: string;
};

export async function validateTicket(qrCode: string): Promise<ScanResult> {
  try {
    const supabase = await createClient();

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { status: "error", message: "Sesi login tidak valid" };
    }

    // Find ticket by qr_code
    const { data: ticket, error: findError } = await supabase
      .from("tickets")
      .select("id, qr_code, is_used, used_at, order_id")
      .eq("qr_code", qrCode)
      .single();

    if (findError || !ticket) {
      return { status: "not_found", message: "Tiket tidak valid" };
    }

    // Already used
    if (ticket.is_used) {
      const usedAt = ticket.used_at
        ? new Date(ticket.used_at).toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      return {
        status: "used",
        message: `Tiket sudah digunakan${usedAt ? ` pada ${usedAt}` : ""}`,
      };
    }

    // Mark as used
    const { error: updateError } = await supabase
      .from("tickets")
      .update({
        is_used: true,
        used_at: new Date().toISOString(),
      })
      .eq("id", ticket.id);

    if (updateError) {
      return {
        status: "error",
        message: `Gagal update tiket: ${updateError.message}`,
      };
    }

    return { status: "valid", message: "Tiket Valid — Silakan Masuk!" };
  } catch (err) {
    return { status: "error", message: "Terjadi kesalahan sistem" };
  }
}
