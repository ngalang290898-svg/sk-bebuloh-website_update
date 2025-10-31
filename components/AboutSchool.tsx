// components/AboutSchool.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSchool({ t }: { t: any }) {
  // t is the school metadata object fetched server-side and passed from page
  // fallback if someone uses this component client-side without props
  const meta = t ?? {
    lang: "en",
    school_name: "Sekolah Kebangsaan Bebuloh Labuan",
    motto: "Superbia, Unitas, Triumphus",
    about_title: "About the School",
    about_description:
      "Sekolah Kebangsaan Bebuloh is a primary school in Labuan dedicated to nurturing excellence through holistic education and values-driven learning.",
    principal_name: "",
    principal_photo: "/images/headmaster.jpg",
  };

  const principal = meta.principal ?? {
    name: meta.principal_name ?? meta.principal_name_en ?? "",
    photo: meta.principal_photo ?? "/images/headmaster.jpg",
    message: meta.principal_message ?? meta.principal_message_en ?? "",
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 md:order-1"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {meta.about_title ?? (meta.lang === "ms" ? "Tentang Sekolah" : "About the School")}
          </h2>

          <p className="text-slate-700 leading-relaxed max-w-2xl">
            {meta.about_description ??
              "Sekolah Kebangsaan Bebuloh is a primary school committed to excellence and values-driven learning."}
          </p>

          <div className="mt-6 flex gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center shadow-sm">
                <span className="text-orange-700 font-semibold">WBA1001</span>
              </div>
              <div>
                <p className="text-sm text-slate-600">{meta.school_code ?? "WBA1001"}</p>
                <p className="text-xs text-slate-500">{meta.vision ?? ""}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="order-1 md:order-2 flex items-center justify-center"
        >
          <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-orange-50 p-4">
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={principal.photo ?? "/images/headmaster.jpg"}
                alt={principal.name ?? "Principal"}
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-slate-900">{principal.name ?? meta.principal_name}</h3>
              <p className="text-sm text-orange-700 mt-1">{meta.lang === "ms" ? "Guru Besar" : "Headmaster"}</p>
              {principal.message && <p className="text-xs text-slate-600 mt-3 line-clamp-3">{principal.message}</p>}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
