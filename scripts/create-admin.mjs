// Script untuk membuat akun admin + sample data di Supabase
// Jalankan: node scripts/create-admin.mjs

const SUPABASE_URL = "https://hqsnjshmbsajjniydkan.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_MrCfJbSMMp3gYGawYAkWDQ_rRICXrCN";

const ADMIN_EMAIL = "admin@pradipta2026.com";
const ADMIN_PASSWORD = "admin123456";

async function main() {
  console.log("🔐 Membuat akun admin...\n");

  // 1. Sign up user
  const signUpRes = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });

  const signUpData = await signUpRes.json();

  if (signUpData.error) {
    if (signUpData.error.message?.includes("already")) {
      console.log("⚠️  User sudah ada, mencoba login...");
    } else {
      console.error("❌ Gagal signup:", signUpData.error.message || signUpData.error);
      return;
    }
  } else {
    console.log("✅ Akun dibuat:", signUpData.user?.email);
    console.log("   User ID:", signUpData.user?.id);
  }

  // 2. Login untuk mendapatkan token
  const loginRes = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });

  const loginData = await loginRes.json();

  if (loginData.error) {
    console.error("❌ Gagal login:", loginData.error_description || loginData.error);
    console.log("\n💡 Jika menggunakan email confirmation,");
    console.log("   matikan di Supabase Dashboard → Auth → Providers → Email → Confirm email = OFF");
    return;
  }

  const userId = loginData.user?.id;
  const accessToken = loginData.access_token;
  console.log("✅ Login berhasil, User ID:", userId);

  // 3. Cek apakah profile sudah ada
  const profileCheckRes = await fetch(
    `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}&select=id,role`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const existingProfiles = await profileCheckRes.json();

  if (existingProfiles.length === 0) {
    // Insert profile baru
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ id: userId, role: "admin" }),
    });

    if (insertRes.ok) {
      console.log("✅ Profile admin dibuat");
    } else {
      console.log("⚠️  Gagal insert profile:", await insertRes.text());
      console.log(`\n💡 Jalankan SQL ini di Supabase SQL Editor:`);
      console.log(`   INSERT INTO profiles (id, role) VALUES ('${userId}', 'admin');`);
    }
  } else {
    // Update role ke admin
    const updateRes = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${accessToken}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ role: "admin" }),
      }
    );

    if (updateRes.ok) {
      console.log("✅ Role diubah ke 'admin'");
    } else {
      console.log("⚠️  Gagal update role:", await updateRes.text());
      console.log(`\n💡 Jalankan SQL ini di Supabase SQL Editor:`);
      console.log(`   UPDATE profiles SET role = 'admin' WHERE id = '${userId}';`);
    }
  }

  // 4. Insert sample events
  console.log("\n📦 Menambahkan sample data...");

  const eventsData = [
    { title: "PRADIPTA 2026 - Spark of Radiance", description: "Acara perpisahan angkatan 2026 SMK Negeri 5 Malang", event_date: "2026-05-09T08:00:00+07:00", location: "SMK Negeri 5 Malang", price: 200000, quota: 500 },
    { title: "Pre-Event: Night Glow", description: "Malam keakraban sebelum acara utama", event_date: "2026-05-08T19:00:00+07:00", location: "Aula SMKN 5 Malang", price: 50000, quota: 200 },
    { title: "After Party: Radiant Farewell", description: "Private party penutupan Pradipta", event_date: "2026-05-09T20:00:00+07:00", location: "Ballroom Hotel", price: 150000, quota: 100 },
  ];

  const eventsInsertRes = await fetch(`${SUPABASE_URL}/rest/v1/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(eventsData),
  });

  let eventId = null;
  if (eventsInsertRes.ok) {
    const insertedEvents = await eventsInsertRes.json();
    console.log(`✅ ${insertedEvents.length} events ditambahkan`);
    eventId = insertedEvents[0]?.id;
  } else {
    const errText = await eventsInsertRes.text();
    if (errText.includes("duplicate") || errText.includes("already")) {
      console.log("⚠️  Events sudah ada, skip...");
      // Coba fetch event yang ada
      const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/events?select=id&limit=1`, {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${accessToken}` },
      });
      const existing = await fetchRes.json();
      eventId = existing[0]?.id;
    } else {
      console.log("⚠️  Gagal insert events:", errText);
    }
  }

  if (!eventId) {
    // Last try: fetch any existing event
    const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/events?select=id&limit=1`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${accessToken}` },
    });
    const existing = await fetchRes.json();
    eventId = existing[0]?.id;
  }

  if (eventId) {
    // 5. Insert sample orders
    const ordersData = [
      { event_id: eventId, full_name: "Budi Santoso", email: "budi@mail.com", phone: "081234567890", quantity: 2, total_price: 400000, status: "paid" },
      { event_id: eventId, full_name: "Siti Rahma", email: "siti@mail.com", phone: "081234567891", quantity: 1, total_price: 200000, status: "paid" },
      { event_id: eventId, full_name: "Ahmad Fauzi", email: "ahmad@mail.com", phone: "081234567892", quantity: 3, total_price: 600000, status: "paid" },
      { event_id: eventId, full_name: "Dewi Lestari", email: "dewi@mail.com", phone: "081234567893", quantity: 1, total_price: 200000, status: "pending" },
      { event_id: eventId, full_name: "Rizky Pratama", email: "rizky@mail.com", phone: "081234567894", quantity: 2, total_price: 400000, status: "paid" },
    ];

    const orderInsertRes = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${accessToken}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(ordersData),
    });

    if (orderInsertRes.ok) {
      const insertedOrders = await orderInsertRes.json();
      console.log(`✅ ${insertedOrders.length} orders ditambahkan`);

      // 6. Insert sample tickets
      const ticketsData = [];
      insertedOrders.forEach((order, i) => {
        for (let t = 0; t < (order.quantity || 1); t++) {
          ticketsData.push({
            order_id: order.id,
            qr_code: `QR-${order.id.slice(0, 8)}-${t + 1}`,
            is_used: i < 2, // Orders 1 & 2 sudah digunakan
            issued_at: new Date().toISOString(),
          });
        }
      });

      const ticketInsertRes = await fetch(`${SUPABASE_URL}/rest/v1/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${accessToken}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(ticketsData),
      });

      if (ticketInsertRes.ok) {
        const usedCount = ticketsData.filter((t) => t.is_used).length;
        console.log(`✅ ${ticketsData.length} tickets ditambahkan (${usedCount} sudah digunakan)`);
      } else {
        console.log("⚠️  Gagal insert tickets:", await ticketInsertRes.text());
      }
    } else {
      console.log("⚠️  Gagal insert orders:", await orderInsertRes.text());
    }
  } else {
    console.log("⚠️  Tidak ada event. Buat event dulu di Supabase.");
  }

  console.log("\n========================================");
  console.log("🎉 Selesai! Login dengan:");
  console.log(`   Email    : ${ADMIN_EMAIL}`);
  console.log(`   Password : ${ADMIN_PASSWORD}`);
  console.log("========================================\n");
}

main().catch(console.error);
