import Image from "next/image";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-[#271043] font-[family-name:var(--font-poppins)] text-white py-14 px-6 md:py-20 md:px-10 overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Title */}
        <div className="md:col-start-1 md:row-start-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">
            Contact Us
          </h2>
        </div>

        {/* Buttons (Admin Contacts) */}
        <div className="flex flex-col gap-4 md:gap-8 justify-center md:col-start-2 md:row-start-1 md:row-span-2">
          <a
            href="https://wa.me/6287701685791"
            className="flex items-center gap-4 border border-white/40 rounded-xl px-8 py-2 hover:bg-white hover:text-purple-900 transition duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 21l1.65-5.95A8 8 0 1112 20a7.96 7.96 0 01-4.35-1.28L3 21z"
              />
            </svg>
            <span className="font-semibold tracking-wide">CONTACT ADMIN 1</span>
          </a>

          <a
            href="https://wa.me/62895366895178"
            className="flex items-center gap-4 border border-white/40 rounded-xl px-8 py-2 hover:bg-white hover:text-purple-900 transition duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 21l1.65-5.95A8 8 0 1112 20a7.96 7.96 0 01-4.35-1.28L3 21z"
              />
            </svg>
            <span className="font-semibold tracking-wide">CONTACT ADMIN 2</span>
          </a>
        </div>

        {/* Details */}
        <div className="space-y-6 text-gray-300 md:col-start-1 md:row-start-2">
          <div>
            <p className="text-sm opacity-70">Email :</p>
            <p className="font-semibold">pradiptaduaenam26@gmail.com</p>
          </div>
          <div>
            <p className="text-sm opacity-70">Alamat :</p>
            <p className="font-semibold">SMK Negeri 5 Malang</p>
            <p className="text-sm">
              Jl. Terusan Ikan Piranha Atas No.50, Tunjungsekar, Lowokwaru, Kota
              Malang, Jawa Timur 65142
            </p>
          </div>
          <div>
            <p className="text-sm opacity-70">Whatsapp Channel :</p>
            <p className="font-semibold">PRADIPTA26</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative max-w-7xl mx-auto mt-20 border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Social Media */}
        <div className="flex items-center gap-6">
          <span className="opacity-70">Follow Us :</span>
          <a
            href="https://www.instagram.com/pradipta26._/"
            className="hover:scale-110 transition hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
              width={24}
              height={24}
              alt="Instagram"
            />
          </a>
          <a
            href="#"
            className="hover:scale-110 transition hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png"
              width={24}
              height={24}
              alt="YouTube"
            />
          </a>
          <a
            href="#"
            className="hover:scale-110 transition hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
              width={24}
              height={24}
              alt="YouTube"
            />
          </a>
        </div>
        {/* Copyright */}
        <div className="text-sm opacity-70 text-center">
          Copyright © PRADIPTA 2026. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
