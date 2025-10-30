// components/Footer.tsx
"use client";

export default function Footer({ lang = "en" }: { lang?: string }) {
  return (
    <footer className="bg-orange-50 text-slate-700 text-center py-6 border-t border-orange-100 mt-10">
      <p className="text-sm">
        {lang === "ms"
          ? "© 2025 Sekolah Kebangsaan Bebuloh Labuan. Hak cipta terpelihara."
          : "© 2025 Sekolah Kebangsaan Bebuloh Labuan. All rights reserved."}
      </p>
    </footer>
  );
}
