import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const supabase = await createClient();

  const [eventsRes, ordersRes, ticketsRes, usedTicketsRes] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("tickets").select("*", { count: "exact", head: true }),
    supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })
      .eq("is_used", true),
  ]);

  return {
    totalEvents: eventsRes.count ?? 0,
    totalOrders: ordersRes.count ?? 0,
    totalTickets: ticketsRes.count ?? 0,
    totalUsedTickets: usedTicketsRes.count ?? 0,
  };
}

const statCards = [
  {
    key: "totalEvents",
    label: "Total Event",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "rgba(139,92,246,0.15)",
  },
  {
    key: "totalOrders",
    label: "Total Order",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "rgba(59,130,246,0.15)",
  },
  {
    key: "totalTickets",
    label: "Total Tiket Terjual",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
        />
      </svg>
    ),
    gradient: "from-emerald-500 to-green-500",
    bgGlow: "rgba(16,185,129,0.15)",
  },
  {
    key: "totalUsedTickets",
    label: "Tiket Sudah Digunakan",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "rgba(245,158,11,0.15)",
  },
] as const;

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Ringkasan data event Pradipta 2026
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="group relative bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all duration-300 overflow-hidden"
          >
            {/* Background glow */}
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: card.bgGlow }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} mb-4 shadow-lg`}
              >
                <span className="text-white">{card.icon}</span>
              </div>

              {/* Value */}
              <p className="text-3xl font-bold tracking-tight mb-1">
                {stats[card.key].toLocaleString("id-ID")}
              </p>

              {/* Label */}
              <p className="text-sm text-gray-400">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state hint */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Data diambil secara realtime dari database
        </div>
      </div>
    </div>
  );
}
