import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import LogoutButton from "@/app/admin/LogoutButton";

export const metadata = {
  title: "Scan Tiket — Pradipta 2026",
};

export default async function PanitiaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Hanya role "panitia" yang bisa akses
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "panitia") {
    redirect("/login");
  }

  return (
    <div
      className="fixed inset-0 z-100 min-h-screen bg-[#0f0f1a] text-white overflow-y-auto"
      style={{ fontFamily: "Inter, Poppins, sans-serif" }}
    >
      {/* Top Bar */}
      <nav className="sticky top-0 z-50 bg-[#0f0f1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm font-bold">
              P
            </div>
            <span className="text-lg font-bold tracking-tight">
              Pradipta{" "}
              <span className="text-emerald-400 text-sm font-normal">
                Scanner
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2"
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali
            </a>
            <span className="w-px h-5 bg-white/10" />
            <LogoutButton />
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
