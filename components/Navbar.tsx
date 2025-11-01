// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Determine language from current path
  const lang = pathname?.includes("/ms") || pathname?.includes("/bm") ? "ms" : "en";

  // Define navigation links
  const links = [
    { href: `/${lang}`, label_en: "Home", label_ms: "Utama" },
    { href: `/${lang}/about`, label_en: "About", label_ms: "Tentang Sekolah" },
    { href: `/${lang}/staff`, label_en: "Staff", label_ms: "Kakitangan" },
    { href: `/${lang}/rewards`, label_en: "Rewards", label_ms: "Ganjaran" },
  ];

  // Handle language toggle
  const toggleLang = () => {
    const newLang = lang === "en" ? "ms" : "en";
    const newPath = pathname
      ? pathname.replace(`/${lang}`, `/${newLang}`)
      : `/${newLang}`;
    window.location.href = newPath;
  };

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-orange-100 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg sm:text-xl font-bold text-orange-600"
          >
            SK Bebuloh Labuan
          </motion.span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all ${
                  isActive
                    ? "text-orange-600 border-b-2 border-orange-500 pb-1"
                    : "text-slate-700 hover:text-orange-600"
                }`}
              >
                {lang === "ms" ? link.label_ms : link.label_en}
              </Link>
            );
          })}

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="ml-4 px-3 py-1.5 rounded-md border border-orange-300 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-all"
          >
            {lang === "ms" ? "EN" : "BM"}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-orange-600 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-t border-orange-100 shadow-inner"
        >
          <nav className="flex flex-col px-6 py-4 space-y-3">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all ${
                    isActive
                      ? "text-orange-600 font-semibold"
                      : "text-slate-700 hover:text-orange-600"
                  }`}
                >
                  {lang === "ms" ? link.label_ms : link.label_en}
                </Link>
              );
            })}

            <button
              onClick={toggleLang}
              className="mt-3 w-full rounded-md border border-orange-300 py-2 font-semibold text-orange-600 hover:bg-orange-50 transition-all"
            >
              {lang === "ms" ? "English" : "Bahasa Melayu"}
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
