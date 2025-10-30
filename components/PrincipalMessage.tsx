"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PrincipalMessage({ t, lang }: { t: any; lang: string }) {
  const p = t.principal ?? {};

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Photo Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-shrink-0"
        >
          <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg mx-auto md:mx-0">
            <Image
              src={p.photo ?? "/images/staff/placeholder.jpg"}
              alt={p.name ?? "Principal"}
              width={192}
              height={192}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </motion.div>

        {/* Message Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left"
        >
          <h2 className="text-2xl font-bold text-orange-700 mb-3">
            {lang === "ms" ? "Ucapan Guru Besar" : "Principal’s Message"}
          </h2>

          <p className="text-slate-700 leading-relaxed">{p.message}</p>

          <p className="mt-3 font-semibold text-slate-900">
            {lang === "ms" ? "Guru Besar" : "Headmaster"} — {p.name}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
