// components/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection({
  t,
  lang = "en",
}: {
  t: any;
  lang?: string;
}) {
  const address =
    t?.contact_address ??
    (lang === "ms"
      ? "SK Bebuloh, WP Labuan, Malaysia"
      : "SK Bebuloh, WP Labuan, Malaysia");

  const phone = t?.contact_phone ?? "+60 87-465220";
  const email = t?.contact_email ?? "skbebuloh@moe.edu.my";

  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-slate-900 mb-10"
        >
          {lang === "ms" ? "Hubungi Kami" : "Contact Us"}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center bg-white/80 backdrop-blur-sm shadow rounded-2xl p-6"
          >
            <MapPin className="w-8 h-8 text-orange-600 mb-3" />
            <p className="text-slate-700">{address}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center bg-white/80 backdrop-blur-sm shadow rounded-2xl p-6"
          >
            <Phone className="w-8 h-8 text-orange-600 mb-3" />
            <p className="text-slate-700">{phone}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center bg-white/80 backdrop-blur-sm shadow rounded-2xl p-6"
          >
            <Mail className="w-8 h-8 text-orange-600 mb-3" />
            <p className="text-slate-700">{email}</p>
          </motion.div>
        </div>

        <p className="text-xs text-slate-500 mt-8">
          {lang === "ms"
            ? "Kami mengalu-alukan sebarang pertanyaan atau maklum balas daripada anda."
            : "We welcome your inquiries or feedback at any time."}
        </p>
      </div>
    </section>
  );
}
