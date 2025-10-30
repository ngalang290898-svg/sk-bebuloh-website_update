// components/VisionMission.tsx
"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function VisionMission({ t }: { t: any }) {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow">
          <div className="flex items-center gap-2 mb-3 text-orange-600">
            <Eye className="w-6 h-6" />
            <h3 className="text-xl font-bold">
              {t.lang === "ms" ? "Visi" : "Vision"}
            </h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {t.vision ??
              (t.lang === "ms"
                ? "Menjadi sekolah unggul dalam semua aspek pendidikan."
                : "To be an excellent school in all aspects of education.")}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-md shadow">
          <div className="flex items-center gap-2 mb-3 text-orange-600">
            <Target className="w-6 h-6" />
            <h3 className="text-xl font-bold">
              {t.lang === "ms" ? "Misi" : "Mission"}
            </h3>
          </div>
          <p className="text-slate-700 leading-relaxed">
            {t.mission ??
              (t.lang === "ms"
                ? "Melahirkan murid berilmu, berakhlak mulia dan berdaya saing."
                : "To nurture knowledgeable, virtuous and competitive students.")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
