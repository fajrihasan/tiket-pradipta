"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Order {
    id: string;
    buyer_name: string;
    full_name?: string;
    email: string;
    buyer_email?: string;
    phone?: string;
    buyer_phone?: string;
    quantity: number;
    total_price: number;
    unique_amount: number;
    payment_code: string;
    status: string;
    created_at: string;
}

export default function AdminPaymentsPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [confirmingId, setConfirmingId] = useState<string | null>(null);

    const fetchOrders = async () => {
        setIsLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("status", "PENDING_PAYMENT")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching orders:", error);
        } else {
            setOrders(data || []);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleConfirm = async (orderId: string) => {
        if (!window.confirm("Konfirmasi pembayaran untuk pesanan ini? Aksi ini akan mengirim email tiket.")) {
            return;
        }

        setConfirmingId(orderId);
        try {
            const res = await fetch("/api/admin/orders/confirm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id: orderId }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Pembayaran berhasil dikonfirmasi dan tiket dikirim!");
                fetchOrders();
            } else {
                alert("Gagal mengkonfirmasi: " + data.error);
            }
        } catch (err) {
            console.error("Error confirming:", err);
            alert("Terjadi kesalahan.");
        } finally {
            setConfirmingId(null);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] p-8">
            <h1 className="text-3xl font-bold mb-8 text-white">Admin: Validasi Pembayaran</h1>

            {orders.length === 0 ? (
                <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#2a2a2a] text-center text-gray-400">
                    Tidak ada pembayaran yang menunggu verifikasi.
                </div>
            ) : (
                <div className="grid gap-4">
                    {orders.map((o) => (
                        <div key={o.id} className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#2a2a2a] flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    ID: <span className="font-mono">{o.id}</span>
                                </p>
                                <p className="font-bold text-lg text-white">
                                    {o.full_name || o.buyer_name} <span className="text-gray-400 font-normal">({o.email || o.buyer_email})</span>
                                </p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Total Transfer: <strong className="text-purple-400 text-base">Rp {o.unique_amount?.toLocaleString("id-ID")}</strong>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Kode Pembayaran: <span className="bg-purple-900/50 text-purple-200 px-2 py-0.5 rounded ml-1">{o.payment_code}</span> |
                                    Jumlah: {o.quantity} tiket | Waktu: {new Date(o.created_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                                <button
                                    onClick={() => handleConfirm(o.id)}
                                    disabled={confirmingId === o.id}
                                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-full hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {confirmingId === o.id ? "Memproses..." : "Konfirmasi & Kirim Tiket"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
