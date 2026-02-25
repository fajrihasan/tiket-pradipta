-- ============================================
-- MIGRATION: Midtrans Payment Integration
-- Jalankan di Supabase SQL Editor
-- ============================================

-- 1. Tambah kolom midtrans_order_id ke orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS midtrans_order_id TEXT;

-- 2. RLS policies untuk insert/update dari webhook (service role bypass RLS)
-- Tapi jika perlu, tambahkan policy untuk public access:

-- Allow public insert orders (dari API route)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Public insert orders'
  ) THEN
    CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Allow public insert tickets (dari webhook)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'tickets' AND policyname = 'Public insert tickets'
  ) THEN
    CREATE POLICY "Public insert tickets" ON tickets FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Allow public update orders (dari webhook)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Public update orders'
  ) THEN
    CREATE POLICY "Public update orders" ON orders FOR UPDATE USING (true);
  END IF;
END $$;
