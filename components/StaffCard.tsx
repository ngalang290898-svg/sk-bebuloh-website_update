// components/StaffCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Staff = {
  teacher_id?: string;
  id?: string;
  name?: string;
  role?: string;
  role_level?: number;
  departments?: string;
  photo?: string;
};

function slugify(s?: string) {
  if (!s) return "";
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function StaffCard({ staff, lang = "en", variant = "normal" }: { staff: Staff; lang?: string; variant?: "hero" | "normal" }) {
  const imgSize = variant === "hero" ? 120 : 72;
  const id = staff.teacher_id ?? staff.id ?? slugify(staff.name);
  const photoSrc = staff.photo
    ? staff.photo.startsWith("http")
      ? staff.photo
      : staff.photo.startsWith("/images")
      ? staff.photo
      : `/images/staff/${staff.photo}`
    : undefined;

  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ duration: 0.25 }} className={`bg-white/85 backdrop-blur-sm ${variant === "hero" ? "p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.10)]" : "p-4 rounded-xl shadow-md"} text-center`}>
      <Link href={`/${lang}/staff/${id}`}>
        <div className="block">
          <div className="flex flex-col items-center">
            {photoSrc ? (
              <div className={`relative overflow-hidden rounded-full mb-3`} style={{ width: imgSize, height: imgSize }}>
                <Image src={photoSrc} alt={staff.name ?? "Staff photo"} width={imgSize} height={imgSize} style={{ objectFit: "cover" }} />
              </div>
            ) : (
              <div className="flex items-center justify-center bg-orange-100 text-orange-700 rounded-full mb-3" style={{ width: imgSize, height: imgSize }}>
                <span className="font-semibold">
                  {staff.name?.split(" ").slice(0, 2).map((x) => x?.[0]).join("")}
                </span>
              </div>
            )}

            <h3 className="font-semibold text-slate-900 text-sm">{staff.name}</h3>
            <p className="text-xs text-slate-600">{staff.role}</p>
            {staff.departments && <p className="text-[11px] text-slate-500 mt-1">{staff.departments.replace(/\|/g, ", ")}</p>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
