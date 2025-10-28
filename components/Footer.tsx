"use client";

import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-glass-white to-pastel-bg text-text-secondary py-10 mt-20 border-t border-glass-border">
      <div className="container mx-auto px-4 text-center space-y-3">
        <p className="font-montserrat text-base">
          {language === "ms"
            ? "Hak Cipta © 2025 Sekolah Kebangsaan Bebuloh Labuan"
            : "Copyright © 2025 Sekolah Kebangsaan Bebuloh Labuan"}
        </p>
        <p className="text-sm">
          {language === "ms"
            ? "Dibangunkan dengan ❤️ oleh pasukan ICT SK Bebuloh."
            : "Developed with ❤️ by the ICT Team of SK Bebuloh."}
        </p>
      </div>
    </footer>
  );
}
