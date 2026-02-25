import { createClient } from "@/lib/supabase/server";

export default async function AdminTicketsPage() {
  const supabase = await createClient();

  // Fetch all tickets with order info
  const { data: tickets, error } = await supabase
    .from("tickets")
    .select(
      `
      id,
      qr_code,
      is_used,
      used_at,
      issued_at,
      order_id,
      orders (
        full_name,
        email,
        phone,
        event_id,
        events (
          title
        )
      )
    `,
    )
    .order("issued_at", { ascending: false });

  const totalTickets = tickets?.length || 0;
  const usedTickets = tickets?.filter((t) => t.is_used).length || 0;
  const unusedTickets = totalTickets - usedTickets;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Status Tiket</h1>
        <p className="text-sm text-gray-400">Total: {totalTickets} tiket</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#141422] border border-white/5 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-white">{totalTickets}</p>
          <p className="text-xs text-gray-400 mt-1">Total Tiket</p>
        </div>
        <div className="bg-[#141422] border border-white/5 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-emerald-400">{usedTickets}</p>
          <p className="text-xs text-gray-400 mt-1">Sudah Dipakai</p>
        </div>
        <div className="bg-[#141422] border border-white/5 rounded-2xl p-5 text-center">
          <p className="text-3xl font-bold text-amber-400">{unusedTickets}</p>
          <p className="text-xs text-gray-400 mt-1">Belum Dipakai</p>
        </div>
      </div>

      {/* Table */}
      {error && <p className="text-red-400 text-sm">Error: {error.message}</p>}

      <div className="bg-[#141422] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                <th className="text-left px-5 py-3">#</th>
                <th className="text-left px-5 py-3">QR Code</th>
                <th className="text-left px-5 py-3">Pembeli</th>
                <th className="text-left px-5 py-3">Event</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-left px-5 py-3">Digunakan</th>
                <th className="text-left px-5 py-3">Diterbitkan</th>
              </tr>
            </thead>
            <tbody>
              {(!tickets || tickets.length === 0) && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    Belum ada tiket.
                  </td>
                </tr>
              )}
              {tickets?.map((ticket, idx) => {
                const order = ticket.orders as any;
                const event = order?.events as any;
                return (
                  <tr
                    key={ticket.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition"
                  >
                    <td className="px-5 py-3 text-gray-500">{idx + 1}</td>
                    <td className="px-5 py-3">
                      <code className="text-xs bg-white/5 px-2 py-1 rounded font-mono">
                        {ticket.qr_code?.slice(0, 8)}...
                      </code>
                    </td>
                    <td className="px-5 py-3">
                      <div>
                        <p className="font-medium">{order?.full_name || "-"}</p>
                        <p className="text-xs text-gray-500">
                          {order?.email || ""}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-300">
                      {event?.title || "-"}
                    </td>
                    <td className="px-5 py-3">
                      {ticket.is_used ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ✓ Terpakai
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          ○ Belum
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400">
                      {ticket.used_at
                        ? new Date(ticket.used_at).toLocaleString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400">
                      {ticket.issued_at
                        ? new Date(ticket.issued_at).toLocaleString("id-ID")
                        : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
