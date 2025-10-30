// components/VisionMission.tsx
"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function VisionMission({ t, lang }: { t: any; lang: string }) {
  const vision = lang === "ms" ? t?.vision_ms ?? "Menjana kecemerlangan pendidikan melalui perpaduan dan nilai." : t?.vision ?? "To cultivate excellence in education through unity and values.";
  const mission = lang === "ms" ? t?.mission_ms ?? "Melahirkan pelajar berilmu dan berakhlak mulia melalui pengajaran berkualiti." : t?.mission ?? "To nurture knowledgeable and ethical students through quality teaching.";

  return (
    <section className="py-16 bg-orange-50/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-orange-700 text-center mb-10"
        >
          {lang === "ms" ? "Visi & Misi" : "Vision & Mission"}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow"
          >
            <Eye className="w-10 h-10 text-orange-500 mb-3" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {lang === "ms" ? "Visi" : "Vision"}
            </h3>
            <p className="text-slate-700">{vision}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow"
          >
            <Target className="w-10 h-10 text-orange-500 mb-3" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {lang === "ms" ? "Misi" : "Mission"}
            </h3>
            <p className="text-slate-700">{mission}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
