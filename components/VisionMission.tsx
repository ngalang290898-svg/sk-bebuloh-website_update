// components/VisionMission.tsx
"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function VisionMission({
  t,
  lang = "en",
}: {
  t: any;
  lang?: string;
}) {
  const vision =
    t?.vision ??
    (lang === "ms"
      ? "Menjana kecemerlangan pendidikan melalui perpaduan dan nilai-nilai murni."
      : "To cultivate excellence in education through unity and values.");

  const mission =
    t?.mission ??
    (lang === "ms"
      ? "Melahirkan pelajar berilmu dan berakhlak melalui pengajaran berkualiti."
      : "To nurture knowledgeable and ethical students through quality teaching.");

  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shadow-sm">
              <Eye className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">
              {lang === "ms" ? "Visi Sekolah" : "School Vision"}
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed">{vision}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow p-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center shadow-sm">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">
              {lang === "ms" ? "Misi Sekolah" : "School Mission"}
            </h2>
          </div>
          <p className="text-slate-700 leading-relaxed">{mission}</p>
        </motion.div>
      </div>
    </section>
  );
}
