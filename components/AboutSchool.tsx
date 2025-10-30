// components/AboutSchool.tsx
"use client";

import { motion } from "framer-motion";

export default function AboutSchool({ t }: { t: any }) {
  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-orange-700 mb-4"
        >
          {t?.about_title ?? (t.lang === "ms" ? "Tentang Sekolah" : "About the School")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl mx-auto text-slate-700 leading-relaxed"
        >
          {t?.about_description ??
            (t.lang === "ms"
              ? "Sekolah Kebangsaan Bebuloh merupakan institusi pendidikan rendah di WP Labuan yang berkomitmen melahirkan generasi cemerlang melalui pembelajaran holistik dan berteraskan nilai."
              : "Sekolah Kebangsaan Bebuloh is a primary school in Labuan dedicated to nurturing excellence through holistic education and values-driven learning.")}
        </motion.p>
      </div>
    </section>
  );
}
