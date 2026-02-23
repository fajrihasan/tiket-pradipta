import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "./AdminNav";

import LogoutButton from "./LogoutButton";

export const metadata = {
  title: "Admin Dashboard — Pradipta 2026",
};

export default async function AdminLayout({
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

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  return (
    <div
      className="fixed inset-0 z-100 min-h-screen bg-[#0f0f1a] text-white overflow-y-auto"
      style={{ fontFamily: "Inter, Poppins, sans-serif" }}
    >
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0f0f1a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-sm font-bold">
              P
            </div>
            <span className="text-lg font-bold tracking-tight">
              Pradipta{" "}
              <span className="text-purple-400 text-sm font-normal">Admin</span>
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
              Kembali ke Website
            </a>
            <span className="w-px h-5 bg-white/10" />
            <LogoutButton />
          </div>
        </div>
      </nav>

      {/* Navigation Tabs */}
      <AdminNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
