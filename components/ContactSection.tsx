// components/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection({ t, lang }: { t: any; lang: string }) {
  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-orange-700 text-center mb-10"
        >
          {lang === "ms" ? "Hubungi Kami" : "Contact Us"}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-slate-700">
            <p className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              {t?.contact_address}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-orange-500" />
              {t?.contact_phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-500" />
              {t?.contact_email}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              title="SK Bebuloh Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.2936072621966!2d115.239!3d5.3105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x324b97d3b3a9e7ef%3A0x7f73b3b4e9f1f05f!2sSekolah%20Kebangsaan%20Bebuloh!5e0!3m2!1sen!2smy!4v1698765432100!5m2!1sen!2smy"
              width="100%"
              height="300"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
