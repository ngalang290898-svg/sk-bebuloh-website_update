// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Globe } from "lucide-react";

const navItems = [
  { key: "home", en: "Home", ms: "Laman Utama", href: "/" },
  { key: "staff", en: "Staff", ms: "Kakitangan", href: "/staff" },
  { key: "about", en: "About", ms: "Tentang Sekolah", href: "/about" },
  { key: "contact", en: "Contact", ms: "Hubungi", href: "/contact" },
  { key: "rewards", en: "Rewards", ms: "Ganjaran", href: "/rewards" },
];

export default function Navbar({ lang = "en" }: { lang?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const switchLanguage = () => {
    const newLang = lang === "en" ? "ms" : "en";
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/") || "/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md border-b border-orange-100 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <Link href={`/${lang}`} className="text-orange-600 font-bold text-lg">
          SK BEBULOH
        </Link>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex gap-5">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${lang}${item.href === "/" ? "" : item.href}`}
                className={`text-sm font-medium hover:text-orange-600 ${
                  pathname.includes(item.href) && item.href !== "/"
                    ? "text-orange-600"
                    : "text-slate-700"
                }`}
              >
                {lang === "ms" ? item.ms : item.en}
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <button
            onClick={switchLanguage}
            className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-orange-600 transition"
          >
            <Globe className="w-4 h-4" />
            {lang.toUpperCase()}
          </button>
        </div>
      </div>
    </nav>
  );
}
