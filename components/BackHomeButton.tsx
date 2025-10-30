// components/BackHomeButton.tsx
"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function BackHomeButton({ lang = "en" }: { lang?: string }) {
  return (
    <Link
      href={`/${lang}`}
      className="fixed bottom-5 left-5 w-11 h-11 flex items-center justify-center rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition-all duration-200 z-40"
      aria-label="Back Home"
    >
      <Home className="w-5 h-5" />
    </Link>
  );
}
