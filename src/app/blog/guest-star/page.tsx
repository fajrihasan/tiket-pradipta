"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function GuestStarPage() {
  const [selectedGuest, setSelectedGuest] = useState<typeof guestStars[0] | null>(null);

  const guestStars = [
    {
      id: 1,
      name: "",
      image: "/images/af.png",
      description: [
        /* "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." */
      ]
    },
    /* {
      id: 2,
      name: "Guest Star 2",
      image: "/images/gs2.png",
      description: [
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
        "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae."
      ]
    },
    {
      id: 3,
      name: "Guest Star 3",
      image: "/images/gs3.png",
      description: [
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
        "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
      ]
    }, */
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
              /* onClick={() => setSelectedGuest(gs)} */
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#271043]/50 backdrop-blur-sm shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer"
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

        {/* Modal Popup */}
        {/* {selectedGuest && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedGuest(null)}
          >
            <div 
              className="bg-[#1a0b2e] border border-white/10 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedGuest(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                <Image
                  src={selectedGuest.image}
                  alt={selectedGuest.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:w-1/2 overflow-y-auto max-h-[60vh] md:max-h-[80vh]">
                <h2 className="text-3xl font-bold text-white mb-6">{selectedGuest.name}</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  {selectedGuest.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
}