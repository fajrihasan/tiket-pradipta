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
          <Link href="/blog/sinopsis" className="group bg-[#271043]/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-purple-500/50 transition duration-300 cursor-pointer">
            {/* Image Placeholder */}
            <div className="h-48 bg-purple-900/30 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-purple-900/40 transition">
              <span className="text-4xl">📜</span>
            </div>
            
            {/* Text Content */}
            <div className="space-y-3">
              <div className="h-4 w-24 bg-purple-500/20 rounded-full"></div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">Sinopsis</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Gambaran umum mengenai alur cerita, tema besar, dan makna di balik acara Pradipta 2026.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
