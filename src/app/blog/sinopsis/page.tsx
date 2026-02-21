import React from "react";
import Link from "next/link";

export default function SinopsisPage() {
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
					Sinopsis:{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
						Spark of Radiance
					</span>
				</h1>

				<div className="space-y-6 text-gray-300 leading-relaxed text-lg text-justify">
					<p>
						PRADIPTA 2026 merupakan acara kelulusan sekolah yang
						dirancang sebagai perayaan puncak perjalanan peserta
						didik angkatan 2026. Acara ini menjadi simbol
						perpisahan, apresiasi, dan awal langkah menuju masa
						depan yang lebih luas. Mengusung konsep elegan dan
						modern, PRADIPTA 2026 tidak hanya menjadi seremoni
						kelulusan, tetapi sebuah pengalaman emosional yang
						berkesan bagi seluruh peserta dan tamu undangan.
					</p>
					<p>
						Rangkaian acara akan diawali dengan sesi perpisahan,
						sebagai bentuk penghormatan atas kebersamaan,
						perjuangan, dan proses yang telah dilalui selama masa
						pendidikan. Momen ini menjadi ruang refleksi, ungkapan
						terima kasih, serta pelepasan dengan penuh makna antara
						siswa, guru, dan seluruh pihak yang terlibat. acara
						berlanjut dengan penayangan video perjalanan angkatan
						PRADIPTA 2026, yang merangkum kisah, kenangan, dan
						dinamika selama menempuh pendidikan. Tayangan ini
						menjadi pengikat emosi sekaligus refleksi kolektif atas
						perjalanan yang telah dilewati bersama.
					</p>
					<p>
						Sebagai penutup, private party dengan nuansa Spark of
						radiance akan menjadi puncak perayaan. Dikemas secara
						eksklusif dan berkelas, sesi ini menghadirkan hiburan,
						interaksi, serta suasana hangat yang menegaskan bahwa
						setiap akhir adalah awal yang baru. Malam ini menjadi
						simbol kenangan emas yang akan terus abadi, sekaligus
						penanda kesiapan angkatan 2026 untuk melangkah menuju
						masa depan.
					</p>
					<p>
						Melalui PRADIPTA 2026, diharapkan tercipta sebuah acara
						kelulusan yang tidak hanya meriah, tetapi juga bermakna,
						profesional, dan berkesan. Dukungan dari pihak sponsor
						akan menjadi bagian penting dalam mewujudkan acara ini,
						sekaligus memperkuat citra brand sebagai mitra yang
						berperan dalam mendukung generasi muda dan momen-momen
						bersejarah dalam dunia pendidikan.
					</p>
				</div>
			</div>
		</section>
	);
}
