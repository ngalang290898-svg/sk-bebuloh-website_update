// components/PrincipalMessage.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PrincipalMessage({
  t,
  lang = "en",
  imageSrc = "/images/staff/headmaster.jpg",
}: {
  t: any;
  lang?: string;
  imageSrc?: string;
}) {
  return (
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6"
      >
        <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
            <Image
              src={imageSrc}
              alt="Headmaster"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            {lang === "ms" ? "Ucapan Guru Besar" : "Principal’s Message"}
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {t.principal_message ??
              (lang === "ms"
                ? "Kami berusaha membentuk murid yang cemerlang dari segi akademik, sahsiah dan kemahiran insaniah."
                : "We strive to nurture students who excel academically and embody noble character.")}
          </p>
          <p className="mt-4 font-semibold text-orange-600">
            {t.headmaster_name ?? "Guru Besar"}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
