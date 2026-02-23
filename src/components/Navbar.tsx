"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#271043] font-[family-name:var(--font-poppins)] text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/images/logo-pradipta.png"
                alt="PRADIPTA"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 text-sm">
          <Link href="/" className="nav-link hover:text-purple-400">
            Home
          </Link>
          <Link href="/#contact" className="nav-link hover:text-purple-400">
            Contact
          </Link>
          <Link href="/blog" className="nav-link hover:text-purple-400">
            Blog
          </Link>
          <Link href="/ticket" className="nav-link hover:text-purple-400">
            Ticket
          </Link>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`${
          menuOpen ? "" : "hidden"
        } md:hidden flex flex-col bg-[#271043]/50 backdrop-blur-md px-6 text-sm divide-y divide-white/10 mb-4`}
      >
        <Link
          href="/"
          className="nav-link hover:text-purple-300 py-4 block w-full"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/#contact"
          className="nav-link hover:text-purple-300 py-4 block w-full"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/blog"
          className="nav-link hover:text-purple-300 py-4 block w-full"
          onClick={() => setMenuOpen(false)}
        >
          Blog
        </Link>
        <Link
          href="/ticket"
          className="nav-link hover:text-purple-300 py-4 block w-full"
          onClick={() => setMenuOpen(false)}
        >
          Ticket
        </Link>
      </div>
    </nav>
  );
}
