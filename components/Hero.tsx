// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero({ t, lang }: { t?: any; lang?: string }) {
  const meta = t ?? {};
  const currentLang = lang ?? (meta.lang ?? "en");

  return (
    <section className="relative w-full overflow-hidden">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">{meta.school_name ?? "Sekolah Kebangsaan Bebuloh Labuan"}</h1>
          <p className="mt-4 text-lg text-slate-700">{meta.motto ?? "Superbia, Unitas, Triumphus"}</p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href={`/${currentLang}/staff`} className="rounded-xl px-5 py-3 bg-orange-500 text-white font-semibold">{currentLang === "ms" ? "Kakitangan" : "Meet Our Team"}</Link>
            <Link href={`/${currentLang}/about`} className="rounded-xl px-5 py-3 bg-white text-slate-900 font-semibold">{currentLang === "ms" ? "Tentang" : "About"}</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
