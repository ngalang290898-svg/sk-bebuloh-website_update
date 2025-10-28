"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { language, t, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "", label: t("nav.home") },
    { href: "about", label: t("nav.about") },
    { href: "staff", label: t("nav.staff") },
    { href: "rewards", label: t("nav.rewards") },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "ms" ? "en" : "ms");
  };

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

        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-90"
        >
          {language === "ms" ? "EN" : "BM"}
        </button>

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
        </div>
      )}
    </nav>
  );
}
