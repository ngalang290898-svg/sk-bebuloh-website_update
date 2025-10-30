// components/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection({ t }: { t: any }) {
  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          {t.lang === "ms" ? "Hubungi Kami" : "Contact Us"}
        </h2>
        <div className="flex flex-col items-center gap-2 text-slate-700 mb-8">
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-600" />
            SK Bebuloh, W.P. Labuan
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-orange-600" /> +6087-123456
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-orange-600" />
            skbebuloh@moe.edu.my
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg max-w-2xl mx-auto">
          <iframe
            title="SK Bebuloh Labuan Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.683857857263!2d115.222!3d5.2706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x324bc87bb3d6e501%3A0x6df5f6cbb6a55c13!2sSekolah%20Kebangsaan%20Bebuloh!5e0!3m2!1sen!2smy!4v1687600400000!5m2!1sen!2smy"
            width="100%"
            height="300"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}
