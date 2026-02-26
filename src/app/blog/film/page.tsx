import React from "react";
import Link from "next/link";

export default function FilmPage() {
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
                    Film{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        Kita
                    </span>
                </h1>

                <div className="bg-[#271043]/30 backdrop-blur-sm border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="text-6xl">🎬</div>
                    <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Karya film pendek yang mendokumentasikan perjalanan berkesan angkatan 2026 sedang dalam tahap akhir produksi. Nantikan penayangannya segera di halaman ini!
                    </p>
                </div>
            </div>
        </section>
    );
}
