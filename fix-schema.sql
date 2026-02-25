-- ============================================
-- ALIGNMENT MIGRATION: Pradipta 2026
-- Run this in Supabase SQL Editor to fix "Gagal membuat order"
-- ============================================

-- 1. Fix 'orders' table
ALTER TABLE IF EXISTS orders RENAME COLUMN buyer_name TO full_name;
ALTER TABLE IF EXISTS orders RENAME COLUMN buyer_email TO email;
ALTER TABLE IF EXISTS orders RENAME COLUMN buyer_phone TO phone;
ALTER TABLE IF EXISTS orders RENAME COLUMN total_amount TO total_price;
ALTER TABLE IF EXISTS orders ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;
ALTER TABLE IF EXISTS orders ADD COLUMN IF NOT EXISTS midtrans_order_id TEXT;

-- 2. Fix 'events' table
ALTER TABLE IF EXISTS events RENAME COLUMN name TO title;

-- 3. Fix 'tickets' table
ALTER TABLE IF EXISTS tickets ADD COLUMN IF NOT EXISTS qr_code TEXT;

-- 4. Ensure RLS allows the service role (usually already true)
-- Ensure public access for testing if needed
CREATE POLICY "Public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update orders" ON orders FOR UPDATE USING (true);
CREATE POLICY "Public select orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public insert tickets" ON tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Public select events" ON events FOR SELECT USING (true);
