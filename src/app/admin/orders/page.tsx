import { createClient } from "@/lib/supabase/server";

interface Order {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
  events: { title: string } | null;
}

export default async function OrdersPage() {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, events(title)")
    .order("created_at", { ascending: false });

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  const statusColors: Record<string, string> = {
    paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          History Order
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Riwayat pembelian tiket — {(orders || []).length} order
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error.message}
        </div>
      )}

      {/* Table */}
      {!orders || orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Belum ada order.</p>
        </div>
      ) : (
        <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium">
                    Pembeli
                  </th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium hidden md:table-cell">
                    Event
                  </th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium hidden lg:table-cell">
                    Kontak
                  </th>
                  <th className="text-center px-6 py-4 text-gray-400 font-medium">
                    Qty
                  </th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium">
                    Total
                  </th>
                  <th className="text-center px-6 py-4 text-gray-400 font-medium">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-gray-400 font-medium hidden md:table-cell">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody>
                {(orders as Order[]).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">
                        {order.full_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 md:hidden">
                        {order.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-400 hidden md:table-cell">
                      {order.events?.title || "—"}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-gray-400 text-xs">{order.email}</p>
                      <p className="text-gray-500 text-xs">{order.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-center text-white">
                      {order.quantity}
                    </td>
                    <td className="px-6 py-4 text-right text-white font-medium">
                      {formatPrice(order.total_price)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500 text-xs hidden md:table-cell">
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
