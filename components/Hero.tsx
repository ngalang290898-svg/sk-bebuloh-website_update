"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function Hero() {
  const { language } = useLanguage();

  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center bg-gradient-to-br from-primary to-accent-red text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-montserrat font-extrabold text-5xl md:text-6xl drop-shadow-lg">
          {language === "ms" ? "Selamat Datang ke SK Bebuloh" : "Welcome to SK Bebuloh"}
        </h1>
        <p className="mt-4 text-lg md:text-xl font-inter">
          {language === "ms"
            ? "Superbia • Unitas • Triumphus"
            : "Superbia • Unitas • Triumphus"}
        </p>
      </motion.div>
    </section>
  );
}
