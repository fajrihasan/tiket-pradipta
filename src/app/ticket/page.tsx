"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Image from "next/image";
import OrderModal from "@/components/OrderModal";
import { createClient } from "@/lib/supabase/client";

export default function TicketPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPkg, setModalPkg] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalPriceNum, setModalPriceNum] = useState(0);
  const [eventId, setEventId] = useState("");

  // Fetch first event ID on mount
  useEffect(() => {
    async function fetchEvent() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("events")
        .select("id")
        .limit(1);

      console.log("Events fetch:", { data, error });

      if (data && data.length > 0) {
        setEventId(data[0].id);
      }
    }
    fetchEvent();
  }, []);

  function openModal(pkg: string, price: string, priceNum: number) {
    setModalPkg(pkg);
    setModalPrice(price);
    setModalPriceNum(priceNum);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModalOpen(false);
    document.body.style.overflow = "";
  }

  return (
    <>
      {/* Midtrans Snap JS */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden pt-24 pb-10">
        {/* background watermark text */}
        {/* hero content */}
        <div className="relative z-10 text-center px-4">
          <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">
            Pradipta 2026 · Spark of Radiance
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
              Ticket
            </span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base">
            Secure your spot for the most epic graduation event of 2026. Limited
            seats available.
          </p>

          {/* Event info pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="px-4 py-2 bg-purple-950 border border-purple-800 rounded-full text-xs tracking-wide">
              📅 9 Mei 2026
            </span>
            <span className="px-4 py-2 bg-purple-950 border border-purple-800 rounded-full text-xs tracking-wide">
              📍 SMK Negeri 5 Malang
            </span>
            <span className="px-4 py-2 bg-purple-950 border border-purple-800 rounded-full text-xs tracking-wide">
              🎫 Terbatas
            </span>
          </div>
        </div>
      </section>

      {/* TICKET CARDS */}
      <section className="relative pt-10 pb-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-6xl font-extrabold text-center mb-10 tracking-wide">
            PRESALE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">1</span>
          </h2>

          {/* cards grid */}
          <div className="flex justify-center">
            {/* Ticket Card */}
            <div className="group flex flex-col md:flex-row w-full max-w-4xl drop-shadow-[0_10px_10px_rgba(234,179,8,0.1)] hover:drop-shadow-[0_20px_30px_rgba(234,179,8,0.2)] transition-all duration-500">
              <div className="flex-1 bg-[#0d0d0d] border border-yellow-500/50 border-b-0 md:border-b md:border-r-0 rounded-t-[32px] md:rounded-l-[32px] md:rounded-tr-none flex flex-col relative z-10">
                <div className="p-8 pb-4 flex-1">
                  <div className="mb-6">
                    <p className="text-4xl font-extrabold text-yellow-300">
                      Rp 80.000
                    </p>
                    <p className="text-xs text-gray-500 mt-1">per tiket</p>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2">
                      <span className="text-yellow-400">✓</span> Akses seluruh
                      acara
                    </li>
                    <li className="flex gap-2">
                      <span className="text-yellow-400">✓</span> Konsumsi
                    </li>
                    <li className="flex gap-2"></li>
                  </ul>
                </div>
                <div className="p-6 pt-4">
                  <button
                    onClick={() => openModal("Tiket Masuk", "Rp 80.000", 80000)}
                    className="w-full py-3 rounded-full border border-yellow-500 text-yellow-400 font-semibold text-sm hover:bg-yellow-500 hover:text-black transition"
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>
              {/* Tear Line */}
              <div className="relative z-20 flex items-center justify-center md:flex-col -my-0.5 md:-my-0 md:-mx-0.5">
                <div className="w-[90%] h-[2px] md:w-[2px] md:h-[90%] border-t-2 md:border-t-0 md:border-l-2 border-dashed border-yellow-500/30"></div>
              </div>
              {/* Stub */}
              <div className="bg-[#1a1a1a] border border-yellow-500/50 border-t-0 md:border-t md:border-l-0 rounded-b-[32px] md:rounded-r-[32px] md:rounded-bl-none py-6 md:py-0 md:w-40 flex flex-col items-center justify-center relative z-10 transition-transform duration-500 origin-top md:origin-left group-hover:translate-y-2 md:group-hover:translate-y-0 md:group-hover:translate-x-2 group-hover:rotate-[0.5deg]">
                <div className="flex flex-col items-center md:-rotate-90">
                  <div className="flex gap-2 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-yellow-900/30"
                      ></span>
                    ))}
                  </div>
                  <span className="text-lg font-extrabold text-yellow-900 tracking-[0.2em]">
                    PRADIPTA
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* info strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <span className="flex items-center gap-3">
              <Image
                src="/images/qris.png"
                alt="QRIS"
                width={60}
                height={30}
                className="h-6 md:h-8 w-auto object-contain"
              />
              <span className="text-gray-400"></span>
            </span>
            <span className="flex items-center gap-3">
              <Image
                src="/images/gopay.png"
                alt="GOPAY"
                width={60}
                height={30}
                className="h-5 md:h-7 w-auto object-contain"
              />
              <span className="text-gray-400"></span>
            </span>
            <span className="flex items-center gap-3">
              <Image
                src="/images/dana.png"
                alt="DANA"
                width={60}
                height={30}
                className="h-5 md:h-7 w-auto object-contain"
              />
              </span>
            <span className="flex items-center gap-3">
              <Image
                src="/images/bca.png"
                alt="BCA"
                width={60}
                height={30}
                className="h-5 md:h-7 w-auto object-contain"
              />
              <span className="text-gray-400"></span>
            </span>
            <span className="flex items-center gap-2">
              🔒 Pembayaran aman & terverifikasi
            </span>
          </div>
        </div>
      </section>

      {/* ORDER MODAL */}
      <OrderModal
        isOpen={modalOpen}
        onClose={closeModal}
        packageName={modalPkg}
        price={modalPrice}
        priceNumber={modalPriceNum}
        eventId={eventId}
      />
    </>
  );
}
