const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function reset() {
  console.log("Menghapus semua data tiket...");
  const { error: tErr } = await supabase.from('tickets').delete().neq('id', 'dummy');
  if (tErr) console.error("Error menghapus tiket:", tErr);
  
  console.log("Menghapus semua data pesanan (orders)...");
  const { error: oErr } = await supabase.from('orders').delete().neq('id', 'dummy');
  if (oErr) console.error("Error menghapus orders:", oErr);
  
  console.log("✅ Selesai! Riwayat pesanan dan tiket berhasil direset.");
}

reset();
