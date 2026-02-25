import Link from "next/link";
import Image from "next/image";
import Countdown from "@/components/Countdown";

function HeroScrollText() {
  const lines = Array.from({ length: 5 });
  const sets = Array.from({ length: 4 });

  return (
    <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden">
      <div
        className="flex flex-col hero-scroll-text"
        style={{ animation: "scroll-down 20s linear infinite" }}
      >
        {sets.map((_, setIdx) => (
          <div key={setIdx} className="flex flex-col items-center gap-6 pb-6">
            {lines.map((_, i) => (
              <p
                key={i}
                className={`${
                  i === 4 ? "hidden md:block" : ""
                } text-[11vw] md:text-[6vw] font-extrabold tracking-tight text-white leading-none whitespace-nowrap`}
              >
                SOMETHING BIG IS COMING SOMETHING BIG IS COMING SOMETHING BIG IS COMING
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SponsorMarquee({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const isDark = variant === "dark";
  const textColor = isDark ? "text-white/30" : "text-gray-400";
  const starColor = isDark ? "text-purple-500" : "text-purple-600";
  const bgClass = isDark
    ? "bg-[#271043] backdrop-blur-sm border-y border-white/10"
    : "bg-white border-y border-gray-200";

  const items = (
    <>
      <span
        className={`text-xl md:text-3xl font-bold ${textColor} uppercase tracking-[0.2em] mx-4`}
      >
        OFFICIAL SPONSOR
      </span>
      <span className={`text-xl md:text-3xl font-bold ${starColor} mx-4`}>
        ★
      </span>
      <span
        className={`text-xl md:text-3xl font-bold ${textColor} uppercase tracking-[0.2em] mx-4`}
      >
        MEDIA PARTNER
      </span>
      <span className={`text-xl md:text-3xl font-bold ${starColor} mx-4`}>
        ★
      </span>
      <span
        className={`text-xl md:text-3xl font-bold ${textColor} uppercase tracking-[0.2em] mx-4`}
      >
        SUPPORTED BY
      </span>
      <span className={`text-xl md:text-3xl font-bold ${starColor} mx-4`}>
        ★
      </span>
      <span
        className={`text-xl md:text-3xl font-bold ${textColor} uppercase tracking-[0.2em] mx-4`}
      >
        OFFICIAL SPONSOR
      </span>
      <span className={`text-xl md:text-3xl font-bold ${starColor} mx-4`}>
        ★
      </span>
      <span
        className={`text-xl md:text-3xl font-bold ${textColor} uppercase tracking-[0.2em] mx-4`}
      >
        MEDIA PARTNER
      </span>
      <span className={`text-xl md:text-3xl font-bold ${starColor} mx-4`}>
        ★
      </span>
    </>
  );

  return (
    <section
      className={`${bgClass} py-6 overflow-hidden relative z-20`}
    >
      <div className={`marquee-track ${isDark ? "" : "reverse"}`}>
        <div className="marquee-group">{items}</div>
        <div className="marquee-group">{items}</div>
      </div>
    </section>
  );
}

function GuestStarRow({
  image,
  alt,
  reverse = false,
}: {
  image: string;
  alt: string;
  reverse?: boolean;
}) {
  const boxes = Array.from({ length: 6 });

  return (
    <div className="overflow-hidden">
      <div className={`marquee-track fast ${reverse ? "reverse" : ""}`}>
        <div className="marquee-group">
          {boxes.map((_, i) => (
            <div key={i} className="box">
              <Image
                src={image}
                alt={alt}
                width={320}
                height={240}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
        <div className="marquee-group">
          {boxes.map((_, i) => (
            <div key={`dup-${i}`} className="box">
              <Image
                src={image}
                alt={alt}
                width={320}
                height={240}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-visible pt-28 px-4">
        {/* ORNAMEN: Background Ambient Glow (Aurora Effect) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-600/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse mix-blend-screen" />
          <div className="absolute bottom-[10%] right-[10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-pink-600/20 rounded-full blur-[80px] md:blur-[100px] mix-blend-screen" />
        </div>

        <HeroScrollText />

        <div className="relative z-10 w-full max-w-5xl mx-auto ticket-shell">
          <div className="group relative flex flex-col md:flex-row items-stretch ticket-shape drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] transition-all duration-500 hover:drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)]">
            {/* Main ticket area */}
            <div className="flex-1 bg-black text-white rounded-t-[32px] md:rounded-l-[32px] md:rounded-tr-none md:rounded-bl-[32px] py-8 md:py-10 px-6 md:px-14 border border-[#3b3b3b] ticket-main z-10">
              <Countdown />

                        <div className="flex flex-col items-center justify-center gap-4 mb-8 text-center">
                              <span className="font-semibold text-sm md:text-base text-gray-300">
                                Secure Payment Powered by
                              </span>
                              <div className="flex items-center gap-6">
                                
                                <Image 
                                  src="/images/qr.png"  
                                  alt="QRIS" 
                                  width={60} 
                                  height={30} 
                                  className="h-6 md:h-8 w-auto object-contain"
                                />
                                <Image 
                                  src="/images/ovo.png" 
                                  alt="OVO" 
                                  width={60} 
                                  height={30} 
                                  className="h-5 md:h-7 w-auto object-contain"
                                />
                                <Image 
                                  src="/images/dana.png" 
                                  alt="Dana" 
                                  width={60} 
                                  height={30} 
                                  className="h-5 md:h-7 w-auto object-contain"
                                />
                              </div>
                        </div>

              <div className="text-center text-sm text-gray-300 mb-8">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-300">
                  On the spot
                </p>
                <p className="text-lg font-semibold text-white">
                  SMK Negeri 5 Malang
                </p>
                <p className="text-xs md:text-sm text-gray-400 mt-2 max-w-xl md:max-w-none">
                  Jl. Terusan Ikan Piranha Atas No.50, Tunjungsekar, Kec.
                  Lowokwaru, Kota Malang, Jawa Timur 65142
                </p>
              </div>

              <div className="flex justify-center gap-4 md:gap-6">
                <Link
                  href="/ticket"
                  className="px-6 md:px-8 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition text-sm font-semibold text-center"
                >
                  Grab Yours Now
                </Link>
                <Link
                  href="/merch"
                  className="px-6 md:px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition text-sm font-semibold text-center"
                >
                  See Our Merch
                </Link>
              </div>
            </div>

            {/* TEAR LINE (Perforation) */}
            <div className="relative z-20 flex items-center justify-center md:flex-col -my-0.5 md:-my-0 md:-mx-0.5">
              <div className="w-[94%] h-[2px] md:w-[2px] md:h-[94%] border-t-2 md:border-t-0 md:border-l-2 border-dashed border-gray-600/50" />
            </div>

            {/* Ticket Stub */}
            <div className="relative w-full md:w-56 bg-[#1a1a1a] text-white rounded-b-[32px] md:rounded-r-[32px] md:rounded-bl-none border border-[#3b3b3b] md:border-l-0 flex flex-col items-center md:justify-center px-6 py-4 ticket-stub z-10 transition-transform duration-500 ease-out group-hover:translate-y-1 md:group-hover:translate-x-1 md:group-hover:translate-y-0 group-hover:rotate-[0.5deg] origin-top-left">
              <div className="flex flex-col items-center md:-rotate-90 md:w-[400px]">
                {/* DOTS */}
                <div className="flex gap-5 mb-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full bg-purple-900"
                    />
                  ))}
                </div>
                {/* TEXT INSIDE STUB */}
                <div className="text-center">
                  <span className="text-5xl md:text-6xl font-extrabold leading-none tracking-tight">
                    PRADIPTA
                  </span>
                  <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mt-2">
                    Bright Steps, Radiant Future
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSOR RUNNING TEXT */}
      <SponsorMarquee variant="dark" />

      {/* ABOUT SECTION */}
      <section className="relative bg-transparent py-20 px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />

        <div className="relative max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24 px-4">
          {/* LEFT: ID CARD */}
          <div className="w-full md:w-auto flex justify-center md:justify-start -mt-12 md:-mt-24 relative z-30">
            <Image
              src="/images/idcard.png"
              alt="PRADIPTA ID Card"
              width={384}
              height={540}
              className="w-64 md:w-96 h-auto drop-shadow-2xl hover:scale-105 transition duration-300"
            />
          </div>

          {/* RIGHT: CARDS */}
          <div className="w-full md:flex-1 grid md:grid-cols-3 gap-6 md:gap-10">
            {[
              {
                emoji: "👑",
                title: "About PRADIPTA",
                desc: "PRADIPTA 2026 merupakan perayaan puncak perjalanan angkatan 2026 sebagai simbol perpisahan, apresiasi, dan awal langkah menuju masa depan.",
              },
              {
                emoji: "💡",
                title: "Makna Acara",
                desc: "Rangkaian acara diawali sesi perpisahan dan refleksi perjalanan angkatan sebagai ruang apresiasi dan kebersamaan.",
              },
              {
                emoji: "☁️",
                title: "Closing Moment",
                desc: "Private party bertema Spark of Radiance menjadi simbol bahwa setiap akhir adalah awal yang baru.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="relative bg-[#271043] font-[family-name:var(--font-poppins)] rounded-3xl p-8 shadow-[0_0_50px_rgba(237,209,52,0.15)] text-white transition duration-300 hover:-translate-y-2 hover:shadow-[0_0_80px_rgba(237,209,52,0.3)]"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-yellow-400 text-2xl">
                  {card.emoji}
                </div>
                <h3 className="text-yellow-400 text-center mb-4">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-300 text-center leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUEST STAR SECTION */}
      <section className="relative bg-transparent py-32 overflow-hidden">
        <div className="space-y-16">
          <GuestStarRow image="/images/gs1.png" alt="GS 1" />
          <GuestStarRow image="/images/gs2.png" alt="GS 2" reverse />
          <GuestStarRow image="/images/gs3.png" alt="GS 3" />
        </div>
      </section>

      {/* SPONSOR RUNNING TEXT BOTTOM */}
      <SponsorMarquee variant="light" />
    </>
  );
}
