"use client";

import { useState } from "react";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: any) => void;
          onPending?: (result: any) => void;
          onError?: (result: any) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

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

  // states
  const [step1Error, setStep1Error] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "success" | "pending" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function resetAndClose() {
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

  async function handleBayar() {
    setLoading(true);
    setErrorMsg("");

    try {
      // Call API to create order + get snap token
      const res = await fetch("/api/midtrans/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_name: nama,
          buyer_email: email,
          buyer_phone: hp,
          event_id: eventId,
          quantity,
          amount: priceNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.snap_token) {
        setErrorMsg(data.error || "Gagal membuat transaksi");
        setLoading(false);
        return;
      }

      // Open Midtrans Snap popup
      window.snap.pay(data.snap_token, {
        onSuccess: () => {
          setPaymentStatus("success");
          setCurrentStep(3);
          setLoading(false);
        },
        onPending: () => {
          setPaymentStatus("pending");
          setCurrentStep(3);
          setLoading(false);
        },
        onError: () => {
          setPaymentStatus("error");
          setCurrentStep(3);
          setLoading(false);
        },
        onClose: () => {
          setLoading(false);
        },
      });
    } catch (err) {
      setErrorMsg("Terjadi kesalahan. Coba lagi.");
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
            <label className="flex items-center gap-3 mt-5 cursor-pointer text-sm text-gray-400">
              <input
                type="checkbox"
                className="accent-purple-500 w-4 h-4"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              Saya menyetujui syarat dan ketentuan pembelian tiket.
            </label>
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
                <div className="pop-in text-6xl mb-4">⏳</div>
                <h3 className="text-xl font-bold mb-2">Menunggu Pembayaran</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Selesaikan pembayaran kamu. Tiket QR akan dikirim via email
                  setelah pembayaran dikonfirmasi.
                </p>
              </>
            )}
            {paymentStatus === "error" && (
              <>
                <div className="pop-in text-6xl mb-4">❌</div>
                <h3 className="text-xl font-bold mb-2">Pembayaran Gagal</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Terjadi kesalahan saat memproses pembayaran. Silakan coba
                  lagi.
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
      </div>
    </div>
  );
}
