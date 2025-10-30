// components/AboutSchool.tsx
"use client";

import { motion } from "framer-motion";
import { School } from "lucide-react";

export default function AboutSchool({ t }: { t: any }) {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 mb-4 shadow">
          <School className="w-7 h-7 text-orange-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          {t.lang === "ms" ? "Tentang Sekolah" : "About the School"}
        </h2>
        <p className="text-slate-700 leading-relaxed">
          {t.school_description ??
            (t.lang === "ms"
              ? "Sekolah Kebangsaan Bebuloh Labuan komited terhadap kecemerlangan akademik dan sahsiah."
              : "Sekolah Kebangsaan Bebuloh Labuan is committed to academic excellence and character development.")}
        </p>
        <div className="mt-6 text-orange-600 font-semibold">
          {t.motto && <p>“{t.motto}”</p>}
        </div>
      </motion.div>
    </section>
  );
}
