"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { language, t, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // nav links - keep rewards removed for now (we will add only when you want)
  const navLinks = [
    { href: "", label: t("nav.home") },
    { href: "about", label: t("nav.about") },
    { href: "staff", label: t("nav.staff") }
  ];

  const setToEnglish = () => setLanguage("en");
  const setToMalay = () => setLanguage("ms");

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/40 backdrop-blur-lg border-b border-glass-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href={`/${language}`} className="font-montserrat font-bold text-xl text-primary">
          SK BEBULOH
        </Link>

        <div className="hidden md:flex gap-6">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={`/${language}/${link.href}`}
              className={`text-text-primary hover:text-primary transition ${
                pathname.endsWith(link.href) ? "text-primary font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Language Buttons (side-by-side) */}
        <div className="flex items-center gap-2">
          <button
            onClick={setToEnglish}
            aria-label="Switch to English"
            className={`px-3 py-1 rounded-full font-semibold text-sm ${language === "en" ? "bg-primary text-white" : "bg-white/50 text-primary border border-glass-border"}`}
          >
            EN
          </button>
          <button
            onClick={setToMalay}
            aria-label="Switch to Bahasa Malaysia"
            className={`px-3 py-1 rounded-full font-semibold text-sm ${language === "ms" ? "bg-primary text-white" : "bg-white/50 text-primary border border-glass-border"}`}
          >
            BM
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-lg px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={`/${language}/${link.href}`}
              className="text-text-primary font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => { setLanguage("en"); setMenuOpen(false); }}
              className={`px-3 py-1 rounded-full font-semibold text-sm ${language === "en" ? "bg-primary text-white" : "bg-white/50 text-primary border border-glass-border"}`}
            >
              EN
            </button>
            <button
              onClick={() => { setLanguage("ms"); setMenuOpen(false); }}
              className={`px-3 py-1 rounded-full font-semibold text-sm ${language === "ms" ? "bg-primary text-white" : "bg-white/50 text-primary border border-glass-border"}`}
            >
              BM
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
