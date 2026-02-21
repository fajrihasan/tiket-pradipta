"use client";

import { useEffect } from "react";

export default function StarBackground() {
  useEffect(() => {
    const container = document.getElementById("star-container");
    if (!container) return;

    // Don't re-create if already populated
    if (container.children.length > 0) return;

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
      star.style.setProperty("--opacity", String(opacity));

      container.appendChild(star);
    }
  }, []);

  return (
    <div id="star-container" className="fixed inset-0 pointer-events-none z-0" />
  );
}
