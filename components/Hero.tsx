// components/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { School } from "lucide-react";

export default function Hero({ lang = "en" }: { lang?: string }) {
  const t =
    lang === "ms"
      ? require("@/data/homepage-content-ms.json")
      : require("@/data/homepage-content-en.json");

  return (
    <section className="relative w-full bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 py-20 lg:py-28 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 mb-4 shadow">
            <School className="w-7 h-7 text-orange-500" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
            {t.school_name}
          </h1>
          <p className="text-lg text-slate-700 mb-6 max-w-2xl mx-auto">
            {t.motto}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/${lang}/staff`}
              className="inline-flex items-center rounded-xl px-5 py-3 bg-orange-500 text-white font-semibold shadow hover:brightness-95"
            >
              {t.meet_staff_cta}
            </Link>

            <Link
              href={`/${lang}/about`}
              className="inline-flex items-center rounded-xl px-5 py-3 bg-white/90 text-slate-900 font-semibold shadow"
            >
              {t.learn_more}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
