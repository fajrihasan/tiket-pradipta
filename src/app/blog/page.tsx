import React from "react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">
            Pradipta 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Updates</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ikuti perkembangan terbaru seputar acara, cerita di balik layar, dan informasi menarik lainnya.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 justify-center">
          <Link href="/blog/sinopsis" className="group bg-[#271043] border border-white/10 rounded-3xl p-6 hover:border-yellow-500/50 drop-shadow-[0_10px_10px_rgba(234,179,8,0.1)] hover:drop-shadow-[0_20px_30px_rgba(234,179,8,0.2)] transition duration-300 cursor-pointer">
            {/* Image Placeholder */}
            <div className="h-48 bg-[#300b4e] rounded-2xl mb-6 flex items-center justify-center">
              <span className="text-4xl">📜</span>
            </div>
            
            {/* Text Content */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-purple-500/20 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">Sinopsis</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Gambaran umum mengenai alur cerita, tema besar, dan makna di balik acara Pradipta 2026.
              </p>
            </div>
          </Link>

          {/* Guest Star */}
          <Link href="/blog/guest-star" className="group bg-[#271043] border border-white/10 rounded-3xl p-6 hover:border-yellow-500/50 drop-shadow-[0_10px_10px_rgba(234,179,8,0.1)] hover:drop-shadow-[0_20px_30px_rgba(234,179,8,0.2)] transition duration-300 cursor-pointer">
            {/* Image Placeholder */}
            <div className="h-48 bg-[#300b4e] rounded-2xl mb-6 flex items-center justify-center">
              <span className="text-4xl">🎤</span>
            </div>
            
            {/* Text Content */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-purple-500/20 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">Guest Star</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Siapa saja bintang tamu yang akan memeriahkan panggung Pradipta 2026? Cek di sini!
              </p>
            </div>
          </Link>

          {/* Rundown Acara */}
          <Link href="/blog/rundown" className="group bg-[#271043] border border-white/10 rounded-3xl p-6 hover:border-yellow-500/50 drop-shadow-[0_10px_10px_rgba(234,179,8,0.1)] hover:drop-shadow-[0_20px_30px_rgba(234,179,8,0.2)] transition duration-300 cursor-pointer">
            {/* Image Placeholder */}
            <div className="h-48 bg-[#300b4e] rounded-2xl mb-6 flex items-center justify-center">
              <span className="text-4xl">🕒</span>
            </div>
            
            {/* Text Content */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-purple-500/20 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">Rundown Acara</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Jadwal lengkap rangkaian acara dari awal hingga akhir. Jangan sampai terlewat momen serunya.
              </p>
            </div>
          </Link>

          {/* Lokasi */}
          <Link href="/blog/lokasi" className="group bg-[#271043] border border-white/10 rounded-3xl p-6 hover:border-yellow-500/50 drop-shadow-[0_10px_10px_rgba(234,179,8,0.1)] hover:drop-shadow-[0_20px_30px_rgba(234,179,8,0.2)] transition duration-300 cursor-pointer">
            {/* Image Placeholder */}
            <div className="h-48 bg-[#300b4e] rounded-2xl mb-6 flex items-center justify-center">
              <span className="text-4xl">📍</span>
            </div>
            
            {/* Text Content */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-purple-500/20 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">Lokasi & Venue</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Peta lokasi, denah venue, dan panduan akses menuju tempat acara berlangsung.
              </p>
            </div>
          </Link>

          {/* Sponsor */}
          <Link href="/blog/sponsor" className="group bg-[#271043] border border-white/10 rounded-3xl p-6 hover:border-yellow-500/50 drop-shadow-[0_10px_10px_rgba(234,179,8,0.1)] hover:drop-shadow-[0_20px_30px_rgba(234,179,8,0.2)] transition duration-300 cursor-pointer">
            {/* Image Placeholder */}
            <div className="h-48 bg-[#300b4e] rounded-2xl mb-6 flex items-center justify-center">
              <span className="text-4xl">🤝</span>
            </div>
            
            {/* Text Content */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-purple-500/20 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">Sponsor & Partner</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Terima kasih kepada para sponsor dan media partner yang telah mendukung acara ini.
              </p>
            </div>
          </Link>

          {/* Film Kita */}
          <Link href="/blog/film" className="group bg-[#271043] border border-white/10 rounded-3xl p-6 hover:border-yellow-500/50 drop-shadow-[0_10px_10px_rgba(234,179,8,0.1)] hover:drop-shadow-[0_20px_30px_rgba(234,179,8,0.2)] transition duration-300 cursor-pointer">
            {/* Image Placeholder */}
            <div className="h-48 bg-[#300b4e] rounded-2xl mb-6 flex items-center justify-center">
              <span className="text-4xl">🎬</span>
            </div>
            
            {/* Text Content */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-purple-500/20 rounded-full"></div>
              <h3 className="text-xl font-bold text-white">Film Kita</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Dokumentasi perjalanan angkatan 2026 dalam sebuah karya film pendek yang menyentuh hati.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
