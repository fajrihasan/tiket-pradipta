-- ============================================
-- PRADIPTA 2026 — Supabase Setup
-- Jalankan di Supabase SQL Editor (Dashboard)
-- ============================================

-- 1. Tabel profiles (untuk role user)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile saat user baru signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Tabel events
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabel orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  event_id UUID REFERENCES events(id),
  buyer_name TEXT NOT NULL,
  buyer_email TEXT,
  buyer_phone TEXT,
  total_amount INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Tabel tickets
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  event_id UUID REFERENCES events(id),
  ticket_type TEXT DEFAULT 'VIP',
  holder_name TEXT,
  is_used BOOLEAN DEFAULT false,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- RLS Policies (agar admin bisa baca semua)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Profiles: user bisa baca profile sendiri
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Profiles: admin bisa baca semua
CREATE POLICY "Admin can read all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Events: semua user bisa baca
CREATE POLICY "Anyone can read events" ON events
  FOR SELECT USING (true);

-- Orders: admin bisa baca semua
CREATE POLICY "Admin can read all orders" ON orders
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Tickets: admin bisa baca semua
CREATE POLICY "Admin can read all tickets" ON tickets
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- Sample Data (contoh data untuk testing)
-- ============================================

-- Events
INSERT INTO events (name, description, date, location) VALUES
  ('PRADIPTA 2026 - Spark of Radiance', 'Acara perpisahan angkatan 2026 SMK Negeri 5 Malang', '2026-05-09 08:00:00+07', 'SMK Negeri 5 Malang'),
  ('Pre-Event: Night Glow', 'Malam keakraban sebelum acara utama', '2026-05-08 19:00:00+07', 'Aula SMKN 5 Malang'),
  ('After Party: Radiant Farewell', 'Private party penutupan Pradipta', '2026-05-09 20:00:00+07', 'Ballroom Hotel');
