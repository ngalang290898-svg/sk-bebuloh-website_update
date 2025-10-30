// components/JumpNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function JumpNav({ lang = "en" }: { lang?: string }) {
  const pathname = usePathname() ?? "/";
  // Only show on staff pages ideally; parent can include it conditionally.
  const base = `/${lang}/staff`;

  const items = [
    { id: "headmaster", label: lang === "ms" ? "Guru Besar" : "Headmaster" },
    { id: "admins", label: lang === "ms" ? "Pembantu Tadbir" : "Administrative Assistants" },
    { id: "departments", label: lang === "ms" ? "Panitia" : "Departments" },
    { id: "support", label: lang === "ms" ? "Kakitangan Sokongan" : "Support Staff" },
  ];

  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="sticky top-16 z-40 bg-white/60 backdrop-blur-md border-b border-orange-50">
      <div className="container mx-auto px-4 py-2 flex items-center gap-3 overflow-x-auto">
        {items.map((it) => (
          <a key={it.id} href={`#${it.id}`} className="text-sm whitespace-nowrap px-3 py-1 rounded-md hover:bg-orange-50">{it.label}</a>
        ))}
      </div>
    </motion.nav>
  );
}
