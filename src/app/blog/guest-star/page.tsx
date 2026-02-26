import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function GuestStarPage() {
  const guestStars = [
    { id: 1, name: "Guest Star 1", image: "/images/gs1.png" },
    { id: 2, name: "Guest Star 2", image: "/images/gs2.png" },
    { id: 3, name: "Guest Star 3", image: "/images/gs3.png" },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
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
          Guest{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Stars
          </span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {guestStars.map((gs) => (
            <div
              key={gs.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#271043]/50 backdrop-blur-sm shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="aspect-[3/4] relative w-full">
                <Image
                  src={gs.image}
                  alt={gs.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{gs.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}