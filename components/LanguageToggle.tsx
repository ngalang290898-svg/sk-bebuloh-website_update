// components/LanguageToggle.tsx
"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { Languages } from "lucide-react";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-orange-200 shadow-sm text-orange-600 font-semibold text-sm hover:bg-orange-50 transition-all"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4" />
      {language === "ms" ? "English" : "Bahasa Melayu"}
    </motion.button>
  );
}
