// components/StaffSection.tsx
"use client";

import { motion } from "framer-motion";
import StaffCard from "./StaffCard";
import { BookOpen, Users, ShieldCheck } from "lucide-react";

type Staff = {
  teacher_id?: string;
  id?: string;
  name?: string;
  role?: string;
  role_level?: number;
  departments?: string;
  photo?: string;
};

export default function StaffSection({ title, staffList, layout = "grid", lang = "en", icon = "users" }: { title: string; staffList: Staff[]; layout?: "hero" | "grid"; lang?: string; icon?: string; }) {
  const Icon = icon === "book" ? BookOpen : icon === "shield" ? ShieldCheck : Users;

  return (
    <section className="my-10">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.48 }} className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-md" style={{ background: "linear-gradient(135deg,#fff7f0, #fff3ea)" }}>
          <Icon className="w-5 h-5 text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </motion.div>

      <div className={layout === "hero" ? "flex justify-center" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"}>
        {staffList.map((s) => (
          <StaffCard key={s.teacher_id ?? s.id ?? s.name} staff={s} lang={lang} variant={layout === "hero" ? "hero" : "normal"} />
        ))}
      </div>
    </section>
  );
}
