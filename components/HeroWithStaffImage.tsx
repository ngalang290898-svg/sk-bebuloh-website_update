// components/HeroWithStaffImage.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { School } from "lucide-react";
import useLocaleContent from "@/lib/i18n";

export default function HeroWithStaffImage({
  imageSrc = "/images/staff-group.jpg",
  alt = "SK Bebuloh staff group",
}: { imageSrc?: string; alt?: string }) {
  const t = useLocaleContent?.() ?? {
    lang: "en",
    school_name: "Sekolah Kebangsaan Bebuloh Labuan",
    motto: "Superbia, Unitas, Triumphus",
    meet_staff_cta: "Meet Our Team",
    learn_more: "About",
    scroll_cta: "Meet the team",
    school_code: "WBA1001",
  };
  const lang = t?.lang ?? "en";

  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial={{ scale: 1.06, opacity: 0.98 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 1600px"
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
            className="filter brightness-75"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f0]/30 via-transparent to-[#fff7f0]/80" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-white/90 flex items-center justify-center shadow">
              <School className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-sm font-medium text-orange-600">{t?.school_code ?? "WBA1001"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            {t?.school_name ?? "Sekolah Kebangsaan Bebuloh Labuan"}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-slate-700 max-w-2xl">
            {t?.motto ?? "Superbia, Unitas, Triumphus"}
          </p>

          <div className="mt-6 flex gap-3">
            <Link href={`/${lang}/staff`} className="inline-flex items-center rounded-xl px-5 py-3 bg-orange-500 text-white font-semibold shadow hover:brightness-95">
              {t?.meet_staff_cta ?? "Meet Our Team"}
            </Link>

            <Link href={`/${lang}/about`} className="inline-flex items-center rounded-xl px-5 py-3 bg-white/90 text-slate-900 font-semibold shadow">
              {t?.learn_more ?? "About"}
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.7 }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <Link href={`/${t?.lang ?? "en"}/staff`} className="flex flex-col items-center text-white/90">
          <span className="text-xs mb-1">{t?.scroll_cta ?? "Meet the team"}</span>
          <svg className="w-6 h-6 animate-bounce" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
