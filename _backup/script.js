/* ===================== COUNTDOWN TIMER ===================== */
const targetDate = new Date("May 9, 2026 00:00:00").getTime();

const countdownElements = {
	days: document.querySelector('.countdown[data-unit="days"]'),
	hours: document.querySelector('.countdown[data-unit="hours"]'),
	minutes: document.querySelector('.countdown[data-unit="minutes"]'),
	seconds: document.querySelector('.countdown[data-unit="seconds"]'),
};

function updateCountdown() {
	const now = new Date().getTime();
	const distance = targetDate - now;

	if (distance <= 0) {
		if (countdownElements.days)
			countdownElements.days.textContent = "0";
		if (countdownElements.hours)
			countdownElements.hours.textContent = "0";
		if (countdownElements.minutes)
			countdownElements.minutes.textContent = "0";
		if (countdownElements.seconds)
			countdownElements.seconds.textContent = "0";
		return;
	}

	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	if (countdownElements.days) countdownElements.days.textContent = days;
	if (countdownElements.hours)
		countdownElements.hours.textContent = hours;
	if (countdownElements.minutes)
		countdownElements.minutes.textContent = minutes;
	if (countdownElements.seconds)
		countdownElements.seconds.textContent = seconds;
}

// Only run countdown if elements exist
if (countdownElements.days) {
	updateCountdown();
	setInterval(updateCountdown, 1000);
}

/* ===================== MOBILE MENU ===================== */
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
	menuBtn.addEventListener("click", () => {
		mobileMenu.classList.toggle("hidden");
	});
}

/* ===================== TICKET ORDER MODAL ===================== */
const orderModal = document.getElementById("order-modal");

if (orderModal) {
	let currentStep = 1;
	let selectedPay = "";

	window.openModal = function (pkg, price) {
		document.getElementById("modal-package").textContent = pkg;
		document.getElementById("modal-price").textContent = price;
		currentStep = 1;
		selectedPay = "";
		showStep(1);
		orderModal.classList.add("active");
		document.body.style.overflow = "hidden";
	};

	window.closeModal = function () {
		orderModal.classList.remove("active");
		document.body.style.overflow = "";
	};

	/* close on backdrop click */
	orderModal.addEventListener("click", function (e) {
		if (e.target === this) window.closeModal();
	});

	function showStep(n) {
		[1, 2, 3, "success"].forEach(function (s) {
			const el = document.getElementById("step-" + s);
			if (el) el.classList.add("hidden");
		});
		document.getElementById("step-" + n).classList.remove("hidden");

		[1, 2, 3].forEach(function (i) {
			const dot = document.getElementById(
				"step-" + i + "-dot",
			);
			if (dot) dot.classList.toggle("active", i <= n);
		});
	}

	window.goStep = function (n) {
		if (n === 2) {
			const nama = document
				.getElementById("inp-nama")
				.value.trim();
			const nis = document
				.getElementById("inp-nis")
				.value.trim();
			const kelas = document
				.getElementById("inp-kelas")
				.value.trim();
			const email = document
				.getElementById("inp-email")
				.value.trim();
			const hp = document
				.getElementById("inp-hp")
				.value.trim();
			const agreed =
				document.getElementById("agree-check").checked;
			const err = document.getElementById("step1-error");
			if (!nama || !nis || !kelas || !email || !hp || !agreed) {
				err.classList.remove("hidden");
				return;
			}
			err.classList.add("hidden");
		}

		if (n === 3) {
			const err = document.getElementById("step2-error");
			if (!selectedPay) {
				err.classList.remove("hidden");
				return;
			}
			err.classList.add("hidden");

			document.getElementById("sum-package").textContent =
				document.getElementById(
					"modal-package",
				).textContent;
			document.getElementById("sum-price").textContent =
				document.getElementById(
					"modal-price",
				).textContent;
			document.getElementById("sum-nama").textContent =
				document
					.getElementById("inp-nama")
					.value.trim();
			document.getElementById("sum-nis").textContent =
				document.getElementById("inp-nis").value.trim();
			document.getElementById("sum-kelas").textContent =
				document
					.getElementById("inp-kelas")
					.value.trim();
			document.getElementById("sum-email").textContent =
				document
					.getElementById("inp-email")
					.value.trim();
			document.getElementById("sum-hp").textContent = document
				.getElementById("inp-hp")
				.value.trim();
			document.getElementById("sum-pay").textContent =
				selectedPay;
		}

		currentStep = n;
		showStep(n);
	};

	window.selectPay = function (btn, method) {
		document.querySelectorAll(".pay-btn").forEach(function (b) {
			b.classList.remove("selected");
		});
		btn.classList.add("selected");
		selectedPay = method;
	};

	window.submitOrder = function () {
		const nama = document.getElementById("inp-nama").value.trim();
		document.getElementById("success-name").textContent = nama;
		showStep("success");
	};
}

/* ===================== PARALLAX BACKGROUND ===================== */
const parallaxBg = document.querySelector(".bg-text-loop");

if (parallaxBg) {
	window.addEventListener("scroll", () => {
		const scrolled = window.scrollY;
		parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
	});

/* ===================== STAR BACKGROUND ===================== */
const starContainer = document.getElementById("star-container");

if (starContainer) {
	const starCount = 150;

	for (let i = 0; i < starCount; i++) {
		const star = document.createElement("div");
		star.classList.add("star");

		const x = Math.random() * 100;
		const y = Math.random() * 100;
		const size = Math.random() * 2 + 1;
		const duration = Math.random() * 3 + 2;
		const delay = Math.random() * 5;
		const opacity = Math.random() * 0.8 + 0.2;

		star.style.left = `${x}%`;
		star.style.top = `${y}%`;
		star.style.width = `${size}px`;
		star.style.height = `${size}px`;
		star.style.setProperty("--duration", `${duration}s`);
		star.style.setProperty("--delay", `${delay}s`);
		star.style.setProperty("--opacity", opacity);

		starContainer.appendChild(star);
	}
}
}
