import React from "react";
import Link from "next/link";

export default function LocationPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="text-purple-400 hover:text-purple-300 mb-8 inline-block transition-colors"
        >
          &larr; Kembali ke Blog
        </Link>

        <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">
          Pradipta 2026
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-10">
          Lokasi &{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Venue
          </span>
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed text-lg">

          {/* Venue Details Card */}
          <div className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold text-white mb-2">SMK Negeri 5 Malang</h3>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Jl. Ikan Piranha Atas, Tunjungsekar, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142
            </p>
            
            {/* Map Embed */}
            <div className="w-full h-64 md:h-96 bg-gray-800 rounded-xl overflow-hidden mb-6 relative border border-white/5">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.625822867738!2d112.6366690740523!3d-7.934069679013892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629de0563196b%3A0x352b223038a5296!2sSMK%20Negeri%205%20Malang!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>

            {/* Action Button with the requested link */}
            <a
              href="https://maps.app.goo.gl/vkqUSLL6Yay38PkMA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition shadow-lg shadow-purple-900/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}