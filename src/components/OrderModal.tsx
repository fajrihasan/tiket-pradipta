"use client";

import { useState } from "react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  price: string;
}

export default function OrderModal({
  isOpen,
  onClose,
  packageName,
  price,
}: OrderModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPay, setSelectedPay] = useState("");

  // form fields
  const [nama, setNama] = useState("");
  const [nis, setNis] = useState("");
  const [kelas, setKelas] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [agreed, setAgreed] = useState(false);

  // errors
  const [step1Error, setStep1Error] = useState(false);
  const [step2Error, setStep2Error] = useState(false);

  function resetAndClose() {
    setCurrentStep(1);
    setSelectedPay("");
    setNama("");
    setNis("");
    setKelas("");
    setEmail("");
    setHp("");
    setAgreed(false);
    setStep1Error(false);
    setStep2Error(false);
    onClose();
  }

  function goStep(n: number | "success") {
    if (n === 2) {
      if (!nama || !nis || !kelas || !email || !hp || !agreed) {
        setStep1Error(true);
        return;
      }
      setStep1Error(false);
    }

    if (n === 3) {
      if (!selectedPay) {
        setStep2Error(true);
        return;
      }
      setStep2Error(false);
    }

    setCurrentStep(n as number);
  }

  function submitOrder() {
    setCurrentStep(4); // success
  }

  if (!isOpen) return null;

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
        {currentStep !== 4 && (
          <div className="flex items-center justify-center gap-3 py-4 border-b border-[#1a1a1a]">
            <div className={`step-dot ${currentStep >= 1 ? "active" : ""}`} />
            <div className="h-px w-10 bg-[#2a2a2a]" />
            <div className={`step-dot ${currentStep >= 2 ? "active" : ""}`} />
            <div className="h-px w-10 bg-[#2a2a2a]" />
            <div className={`step-dot ${currentStep >= 3 ? "active" : ""}`} />
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
                Harap lengkapi semua data dan centang persetujuan.
              </p>
            )}
            <button
              onClick={() => goStep(2)}
              className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 font-semibold text-sm hover:opacity-90 transition"
            >
              Lanjut ke Pembayaran →
            </button>
          </div>
        )}

        {/* STEP 2 – Pembayaran */}
        {currentStep === 2 && (
          <div className="px-8 py-7">
            <h3 className="text-base font-semibold mb-5">
              Pilih Metode Pembayaran
            </h3>
            <div className="space-y-3">
              {[
                {
                  method: "QRIS",
                  color: "bg-[#00AEEF]",
                  label: "Q",
                  desc: "Scan & Pay",
                },
                {
                  method: "OVO",
                  color: "bg-[#5A2DE4]",
                  label: "O",
                  desc: "Transfer wallet",
                },
                {
                  method: "Dana",
                  color: "bg-[#0052CC]",
                  label: "D",
                  desc: "Transfer wallet",
                },
              ].map((pm) => (
                <button
                  key={pm.method}
                  className={`pay-btn ${selectedPay === pm.method ? "selected" : ""}`}
                  onClick={() => setSelectedPay(pm.method)}
                >
                  <span
                    className={`w-8 h-8 rounded-full ${pm.color} flex items-center justify-center text-xs font-bold`}
                  >
                    {pm.label}
                  </span>
                  <span className="font-semibold">{pm.method}</span>
                  <span className="ml-auto text-gray-500 text-xs">
                    {pm.desc}
                  </span>
                </button>
              ))}
            </div>
            {step2Error && (
              <p className="text-red-400 text-xs mt-3">
                Pilih metode pembayaran terlebih dahulu.
              </p>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => goStep(1)}
                className="flex-1 py-3 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"
              >
                ← Kembali
              </button>
              <button
                onClick={() => goStep(3)}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 font-semibold text-sm hover:opacity-90 transition"
              >
                Konfirmasi →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 – Ringkasan */}
        {currentStep === 3 && (
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
              <div className="h-px bg-[#2a2a2a]" />
              <div className="flex justify-between">
                <span className="text-gray-400">Pembayaran</span>
                <span className="font-semibold text-purple-300">
                  {selectedPay}
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => goStep(2)}
                className="flex-1 py-3 rounded-full border border-white/20 text-sm hover:bg-white/10 transition"
              >
                ← Kembali
              </button>
              <button
                onClick={submitOrder}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 font-semibold text-sm hover:opacity-90 transition"
              >
                Konfirmasi Pesanan ✓
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 – Sukses */}
        {currentStep === 4 && (
          <div className="px-8 py-12 text-center">
            <div className="pop-in text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Pesanan Berhasil!</h3>
            <p className="text-gray-400 text-sm mb-2">
              Terima kasih,{" "}
              <strong className="text-white">{nama}</strong>!
              <br />
              Tim kami akan segera menghubungi kamu via WhatsApp untuk konfirmasi
              pembayaran.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              Simpan nomor WA panitia:{" "}
              <span className="text-white">082xxxxxxxxx</span>
            </p>
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
