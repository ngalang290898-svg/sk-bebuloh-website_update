// components/StaffSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Users, Book } from "lucide-react";

export interface StaffMember {
  teacher_id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  departments?: string[];
  role_level?: number;
}

export default function StaffSection({
  title,
  staffList,
  layout = "grid",
  lang = "en",
  icon = "users"
}: {
  title: string;
  staffList: StaffMember[];
  layout?: "grid" | "hero";
  lang?: string;
  icon?: string;
}) {
  if (!staffList || staffList.length === 0) return null;

  const IconComp =
    icon === "shield" ? Shield : icon === "book" ? Book : Users;

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shadow-sm">
          <IconComp className="w-5 h-5 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>

      {/* Hero layout (for Headmaster) */}
      {layout === "hero" && staffList[0] && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b from-orange-50 to-white shadow-lg max-w-2xl mx-auto"
        >
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg">
            <Image
              src={
                staffList[0].photo ||
                "/images/headmaster.jpg"
              }
              alt={staffList[0].name}
              fill
              sizes="(max-width: 768px) 100vw, 160px"
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-slate-900">
            {staffList[0].name}
          </h3>
          <p className="text-orange-700 font-medium mt-1">
            {staffList[0].role}
          </p>
          {staffList[0].bio && (
            <p className="text-slate-600 mt-3 max-w-md">
              {staffList[0].bio}
            </p>
          )}
        </motion.div>
      )}

      {/* Grid layout for departments, teachers, support staff */}
      {layout === "grid" && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {staffList.map((staff, index) => (
            <motion.div
              key={staff.teacher_id ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="group relative rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm border border-orange-100 hover:shadow-lg transition-all"
            >
              <Link
                href={`/${lang}/staff/${encodeURIComponent(staff.teacher_id)}`}
                className="block p-5 h-full"
              >
                <div className="relative w-full h-52 rounded-xl overflow-hidden mb-4 bg-orange-50">
                  <Image
                    src={
                      staff.photo && staff.photo !== ""
                        ? staff.photo
                        : "/images/staff/placeholder.jpg"
                    }
                    alt={staff.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 250px"
                    style={{ objectFit: "cover" }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-lg font-semibold text-slate-900 truncate">
                  {staff.name}
                </h3>
                <p className="text-sm text-orange-700 font-medium mt-1">
                  {staff.role}
                </p>

                {staff.bio && (
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                    {staff.bio}
                  </p>
                )}

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-orange-200 transition duration-300 pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
