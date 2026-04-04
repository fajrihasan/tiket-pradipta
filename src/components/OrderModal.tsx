"use client";

import { useState } from "react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  price: string;
  priceNumber: number;
  eventId: string;
}

export default function OrderModal({
  isOpen,
  onClose,
  packageName,
  price,
  priceNumber,
  eventId,
}: OrderModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // form fields
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");
  const [kelas, setKelas] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // states
  const [step1Error, setStep1Error] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "pending" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function resetAndClose() {
    if (paymentStatus === "success") {
      window.location.reload();
      return;
    }
    setCurrentStep(1);
    setNama("");
    setNis("");
    setKelas("");
    setEmail("");
    setHp("");
    setQuantity(1);
    setAgreed(false);
    setStep1Error(false);
    setLoading(false);
    setPaymentStatus("idle");
    setErrorMsg("");
    setShowTerms(false);
    onClose();
  }

  function goStep2() {
    if (!nama || !nis || !kelas || !email || !hp || !agreed) {
      setStep1Error(true);
      setErrorMsg("");
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStep1Error(true);
      setErrorMsg("Format email tidak valid.");
      return;
    }
    setStep1Error(false);
    setErrorMsg("");
    setCurrentStep(2);
  }

  const [orderInfo, setOrderInfo] = useState<{ payment_code: string, unique_amount: number } | null>(null);

  async function handleBayar() {
    setLoading(true);
    setErrorMsg("");

    try {
      // Call new manual order creation API
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_name: nama,
          buyer_email: email,
          buyer_phone: hp,
          event_id: eventId,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.order_id) {
        setErrorMsg(data.error || "Gagal membuat transaksi");
        setLoading(false);
        return;
      }

      setOrderInfo({
        payment_code: data.payment_code,
        unique_amount: data.unique_amount
      });
      setPaymentStatus("pending");
      setCurrentStep(3);
    } catch (err) {
      setErrorMsg("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  const totalPrice = priceNumber * quantity;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-[6px] z-[100] flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="bg-[#0d0d0d] border border-[#2a2a2a] rounded-3xl w-full max-w-lg mx-4 overflow-hidden shadow-2xl">
        {/* Modal header */}
        <div className="px-8 pt-7 pb-5 border-b border-[#2a2a2a] flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
              PRADIPTA 2026
            </p>
            <h2 className="text-lg font-bold">
              <span>{packageName}</span>
              <span className="text-gray-500 font-normal"> — </span>
              <span className="text-purple-400">{price}</span>
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="text-gray-500 hover:text-white transition text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Step indicator */}
        {currentStep !== 3 && (
          <div className="flex items-center justify-center gap-3 py-4 border-b border-[#1a1a1a]">
            <div className={`step-dot ${currentStep >= 1 ? "active" : ""}`} />
            <div className="h-px w-10 bg-[#2a2a2a]" />
            <div className={`step-dot ${currentStep >= 2 ? "active" : ""}`} />
          </div>
        )}

        {/* STEP 1 – Biodata */}
        {currentStep === 1 && (
          <div className="px-8 py-7">
            <h3 className="text-base font-semibold mb-5">Isi Biodata Kamu</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="form-input col-span-2"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <input
                type="text"
                placeholder="NIS"
                className="form-input"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
              />
              <input
                type="text"
                placeholder="Kelas"
                className="form-input"
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                className="form-input col-span-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                placeholder="No. HP / WhatsApp"
                className="form-input col-span-2"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
              />

              {/* Quantity */}
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-2">
                  Jumlah Tiket
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl border border-white/20 text-white hover:bg-white/10 transition text-lg"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 rounded-xl border border-white/20 text-white hover:bg-white/10 transition text-lg"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    Total:{" "}
                    <span className="text-purple-400 font-semibold">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-5 text-sm text-gray-400">
              <input
                type="checkbox"
                id="agree-checkbox"
                className="accent-purple-500 w-4 h-4 mt-0.5 cursor-pointer"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <label htmlFor="agree-checkbox" className="cursor-pointer leading-relaxed">
                Saya menyetujui{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition"
                >
                  syarat dan ketentuan
                </button>{" "}
                pembelian tiket.
              </label>
            </div>
            {step1Error && (
              <p className="text-red-400 text-xs mt-3">
                {errorMsg ||
                  "Harap lengkapi semua data dan centang persetujuan."}
              </p>
            )}
            <button
              onClick={goStep2}
              className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 font-semibold text-sm hover:opacity-90 transition"
            >
              Lanjut ke Ringkasan →
            </button>
          </div>
        )}

        {/* STEP 2 – Ringkasan + Bayar */}
        {currentStep === 2 && (
          <div className="px-8 py-7">
            <h3 className="text-base font-semibold mb-5">Ringkasan Pesanan</h3>
            <div className="bg-[#141414] rounded-2xl p-5 text-sm space-y-3 border border-[#2a2a2a]">
              <div className="flex justify-between">
                <span className="text-gray-400">Paket</span>
                <span className="font-semibold">{packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Harga</span>
                <span className="font-semibold text-purple-300">{price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Jumlah</span>
                <span className="font-semibold">{quantity} tiket</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total</span>
                <span className="font-bold text-purple-300">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="h-px bg-[#2a2a2a]" />
              <div className="flex justify-between">
                <span className="text-gray-400">Nama</span>
                <span className="font-semibold">{nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">NIS</span>
                <span className="font-semibold">{nis}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Kelas</span>
                <span className="font-semibold">{kelas}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">E-mail</span>
                <span className="font-semibold text-xs break-all">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">No. HP</span>
                <span className="font-semibold">{hp}</span>
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-400 text-xs mt-3 text-center">
                {errorMsg}
              </p>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCurrentStep(1)}
                disabled={loading}
                className="flex-1 py-3 rounded-full border border-white/20 text-sm hover:bg-white/10 transition disabled:opacity-50"
              >
                ← Kembali
              </button>
              <button
                onClick={handleBayar}
                disabled={loading}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 font-semibold text-sm hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Bayar Sekarang 💳"
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 – Result */}
        {currentStep === 3 && (
          <div className="px-8 py-12 text-center">
            {paymentStatus === "success" && (
              <>
                <div className="pop-in text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-bold mb-2">Pembayaran Berhasil!</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Terima kasih, <strong className="text-white">{nama}</strong>!
                  <br />
                  Tiket QR Code akan dikirim ke email{" "}
                  <strong className="text-purple-400">{email}</strong>.
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Cek folder inbox atau spam jika belum muncul.
                </p>
              </>
            )}
            {paymentStatus === "pending" && (
              <>
                <div className="pop-in text-6xl mb-4">💳</div>
                <h3 className="text-xl font-bold mb-2">Instruksi Pembayaran</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Silakan transfer tepat sesuai jumlah berikut ke rekening di bawah ini.
                </p>
                <div className="bg-[#1a1a1a] p-5 rounded-2xl border border-purple-500/30 mb-6 text-left">
                  <p className="text-xs text-gray-500 mb-1">Total Bayar (HARUS SAMA PERSIS)</p>
                  <p className="text-2xl font-bold text-purple-400 mb-4">
                    Rp {orderInfo?.unique_amount?.toLocaleString("id-ID") ?? "..."}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">Bank Tujuan</p>
                  <p className="text-lg font-semibold text-white mb-4">BCA - 3850992770<br /><span className="text-sm font-normal text-gray-400">a.n. AZ ZAHRA ELEVANY YANUARY</span></p>
                  <p className="text-xs text-gray-400">
                    Sistem kami akan memverifikasi pembayaran Anda menggunakan kode unik <span className="font-bold text-white text-base">({orderInfo?.payment_code})</span> yang ditambahkan pada nominal. Tiket QR akan dikirim via email setelah admin mengkonfirmasi.
                  </p>
                </div>
              </>
            )}
            {paymentStatus === "error" && (
              <>
                <div className="pop-in text-6xl mb-4">❌</div>
                <h3 className="text-xl font-bold mb-2">Pemesanan Gagal</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Terjadi kesalahan. Silakan coba lagi.
                </p>
              </>
            )}
            <button
              onClick={resetAndClose}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 font-semibold text-sm hover:opacity-90 transition"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Terms Overlay Popup */}
        {showTerms && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowTerms(false)}
            />
            <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-8 max-w-sm w-full shadow-2xl pop-in">
              <h4 className="text-xl font-bold mb-4 text-white">Syarat & Ketentuan</h4>
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                <p>
                  1. Mohon pastikan <strong className="text-purple-400">E-mail</strong> dan <strong className="text-purple-400">Nomor WhatsApp</strong> yang Anda masukkan sudah benar.
                </p>
                <p>
                  2. Tiket QR Code dan informasi penting lainnya akan dikirimkan melalui kontak yang Anda berikan.
                </p>
                <p>
                  3. Panitia berhak menghubungi Anda melalui kontak tersebut untuk keperluan koordinasi acara.
                </p>
                <p>
                  4. Tiket yang sudah dibeli tidak dapat di-refund namun dapat dipindahtangankan dengan konfirmasi ke panitia.
                </p>
              </div>
              <button
                onClick={() => setShowTerms(false)}
                className="mt-8 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
