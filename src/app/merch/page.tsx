import React from "react";

export default function MerchPage() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-purple-400 mb-4">
            Pradipta 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Official <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Merchandise</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Dapatkan koleksi eksklusif Pradipta 2026. Tampil keren dan simpan kenangan ini selamanya.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 justify-center">
            {/* Card 1 */}
            <div className="group bg-[#271043]/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-purple-500/50 transition duration-300">
                <div className="h-64 bg-purple-900/30 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-purple-900/40 transition relative overflow-hidden">
                    <span className="text-6xl">👕</span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">T-Shirt Special Edition</h3>
                        <span className="bg-purple-600 text-xs font-bold px-2 py-1 rounded">Rp 85K</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Kaos katun combed 30s dengan desain tipografi Pradipta 2026 yang elegan. Nyaman dipakai sehari-hari.
                    </p>
                    <button className="w-full mt-4 py-2 rounded-full border border-purple-500 text-purple-300 text-sm hover:bg-purple-500 hover:text-white transition">
                        Pre-order Now
                    </button>
                </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-[#271043]/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-purple-500/50 transition duration-300">
                <div className="h-64 bg-purple-900/30 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-purple-900/40 transition relative overflow-hidden">
                    <span className="text-6xl">🧥</span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">Hoodie Pradipta</h3>
                        <span className="bg-purple-600 text-xs font-bold px-2 py-1 rounded">Rp 150K</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Hoodie oversize dengan bahan fleece premium. Hangat, stylish, dan cocok untuk outfit nongkrong.
                    </p>
                    <button className="w-full mt-4 py-2 rounded-full border border-purple-500 text-purple-300 text-sm hover:bg-purple-500 hover:text-white transition">
                        Pre-order Now
                    </button>
                </div>
            </div>

             {/* Card 3 */}
             <div className="group bg-[#271043]/50 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:border-purple-500/50 transition duration-300">
                <div className="h-64 bg-purple-900/30 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-purple-900/40 transition relative overflow-hidden">
                    <span className="text-6xl">👜</span>
                </div>
                <div className="space-y-3">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">Tote Bag Canvas</h3>
                        <span className="bg-purple-600 text-xs font-bold px-2 py-1 rounded">Rp 45K</span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Tote bag kanvas tebal dengan sablon awet. Muat banyak barang, praktis untuk sekolah atau kuliah.
                    </p>
                    <button className="w-full mt-4 py-2 rounded-full border border-purple-500 text-purple-300 text-sm hover:bg-purple-500 hover:text-white transition">
                        Pre-order Now
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
