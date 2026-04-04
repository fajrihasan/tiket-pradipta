-- ============================================
-- MIGRATION: Manual Payment Integration
-- Jalankan di Supabase SQL Editor
-- ============================================

-- 1. Tambah kolom payment_code dan unique_amount ke orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_code TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS unique_amount INTEGER;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT DEFAULT 'manual';

-- Secara opsional, tabel status dapat diperbarui dengan default 'PENDING_PAYMENT'.
-- Sebelumnya status mungkin 'pending'. Kita akan gunakan status 'PENDING_PAYMENT', 'PAID', 'CANCELLED'.
-- Jika mau mengubah default status.
ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'PENDING_PAYMENT';

-- 2. Drop midtrans_order_id jika sudah tidak dipakai (opsional, amannya dibiarkan jika ada historis)
-- Tapi kalau proyek ini murni refactor dari nol tanpa data historis penting:
-- ALTER TABLE orders DROP COLUMN IF EXISTS midtrans_order_id;

-- 3. Policy jika ada yang perlu disesuaikan. 
-- Sebelumnya ada policy insert etc.

-- 4. Reload PostgREST schema cache agar perubahan langsung terbaca oleh API Next.js otomatis
NOTIFY pgrst, reload_schema;
