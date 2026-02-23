"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { validateTicket, type ScanResult } from "./actions";

export default function PanitiaPage() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [processing, setProcessing] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const processingRef = useRef(false);

  const startScanner = useCallback(async () => {
    setResult(null);
    setScanning(true);
    processingRef.current = false;

    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          // Prevent multiple calls while processing
          if (processingRef.current) return;
          processingRef.current = true;
          setProcessing(true);

          try {
            // Stop scanning while validating
            await scanner.stop();
            setScanning(false);
          } catch {
            // Scanner may already be stopped
          }

          // Validate ticket via server action
          const res = await validateTicket(decodedText);
          setResult(res);
          setProcessing(false);
          if (res.status === "valid") {
            setScanCount((c) => c + 1);
          }
        },
        () => {
          // QR not detected — ignore
        },
      );
    } catch (err) {
      console.error("Camera error:", err);
      setScanning(false);
      setResult({
        status: "error",
        message:
          "Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.",
      });
    }
  }, []);

  const stopScanner = useCallback(async () => {
    try {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        scannerRef.current = null;
      }
    } catch {
      // Already stopped
    }
    setScanning(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const statusConfig = {
    valid: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    used: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
    },
    not_found: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: (
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Scan Tiket
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Arahkan kamera ke QR code tiket
        </p>
        {scanCount > 0 && (
          <p className="text-emerald-400 text-xs mt-2">
            ✓ {scanCount} tiket sudah divalidasi
          </p>
        )}
      </div>

      {/* Scanner Area */}
      <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl overflow-hidden">
        {/* Camera View */}
        <div className="relative">
          <div
            id="qr-reader"
            className={`w-full ${scanning ? "" : "hidden"}`}
            style={{ minHeight: scanning ? 300 : 0 }}
          />

          {!scanning && !result && !processing && (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 text-sm mb-6 text-center">
                Tekan tombol di bawah untuk mulai scan
              </p>
              <button
                onClick={startScanner}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm font-semibold transition flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Mulai Scan
              </button>
            </div>
          )}

          {/* Processing */}
          {processing && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-10 h-10 border-3 border-white/20 border-t-emerald-500 rounded-full animate-spin mb-4" />
              <p className="text-gray-400 text-sm">Memvalidasi tiket...</p>
            </div>
          )}
        </div>

        {/* Scan Controls */}
        {scanning && (
          <div className="p-4 border-t border-white/5 text-center">
            <button
              onClick={stopScanner}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition"
            >
              Berhenti Scan
            </button>
          </div>
        )}
      </div>

      {/* Result */}
      {result && !processing && (
        <div
          className={`mt-6 rounded-2xl border p-8 text-center ${statusConfig[result.status].bg} ${statusConfig[result.status].border}`}
        >
          <div
            className={`flex justify-center mb-4 ${statusConfig[result.status].text}`}
          >
            {statusConfig[result.status].icon}
          </div>
          <p
            className={`text-xl font-bold mb-2 ${statusConfig[result.status].text}`}
          >
            {result.status === "valid"
              ? "✓ VALID"
              : result.status === "used"
                ? "⚠ SUDAH DIGUNAKAN"
                : "✕ TIDAK VALID"}
          </p>
          <p className="text-gray-400 text-sm">{result.message}</p>

          <button
            onClick={startScanner}
            className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/15 rounded-xl text-sm font-semibold transition"
          >
            Scan Tiket Lain
          </button>
        </div>
      )}
    </div>
  );
}
