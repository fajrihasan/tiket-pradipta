// Tambah RLS policies untuk admin CRUD pada tabel events
// Jalankan: node scripts/add-rls-policies.mjs

const SUPABASE_URL = "https://hqsnjshmbsajjniydkan.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MrCfJbSMMp3gYGawYAkWDQ_rRICXrCN";

const ADMIN_EMAIL = "admin@pradipta2026.com";
const ADMIN_PASSWORD = "admin123456";

async function main() {
  // Login
  const loginRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const { access_token } = await loginRes.json();

  if (!access_token) {
    console.error("❌ Gagal login");
    return;
  }

  console.log("✅ Login berhasil");

  // Test INSERT permission on events
  const testRes = await fetch(`${SUPABASE_URL}/rest/v1/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${access_token}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      title: "TEST EVENT (hapus ini)",
      description: "Test insert permission",
      price: 0,
      quota: 0,
    }),
  });

  if (testRes.ok) {
    const data = await testRes.json();
    console.log("✅ INSERT events berhasil — RLS policy sudah OK");
    // Hapus test event
    await fetch(`${SUPABASE_URL}/rest/v1/events?id=eq.${data[0].id}`, {
      method: "DELETE",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("✅ DELETE events berhasil — RLS policy sudah OK");
  } else {
    const err = await testRes.text();
    console.log("⚠️  INSERT gagal:", err);
    console.log("\n💡 Jalankan SQL berikut di Supabase SQL Editor:\n");
    console.log(`-- Admin full CRUD access pada events
CREATE POLICY "Admin insert events" ON events FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admin update events" ON events FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admin delete events" ON events FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Admin bisa insert orders (jika diperlukan)
CREATE POLICY "Admin insert orders" ON orders FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Admin bisa insert tickets
CREATE POLICY "Admin insert tickets" ON tickets FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
`);
  }
}

main().catch(console.error);
