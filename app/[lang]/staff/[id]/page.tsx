// app/[lang]/staff/[id]/page.tsx
import { getStaffById } from "@/lib/fetchSupabaseData";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default async function StaffProfile({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const lang = params.lang === "bm" ? "ms" : params.lang || "en";
  const id = params.id;

  const staff = await getStaffById(id);

  if (!staff) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-semibold text-slate-800">
          {lang === "ms"
            ? "Profil kakitangan tidak dijumpai."
            : "Staff profile not found."}
        </h1>
        <Link
          href={`/${lang}/staff`}
          className="mt-6 inline-flex items-center px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:brightness-95 transition"
        >
          {lang === "ms" ? "Kembali ke Senarai Kakitangan" : "Back to Staff List"}
        </Link>
      </main>
    );
  }

  const name =
    lang === "ms" ? staff.name_ms ?? staff.name_en : staff.name_en ?? staff.name_ms;
  const role =
    lang === "ms" ? staff.role_ms ?? staff.role_en : staff.role_en ?? staff.role_ms;
  const bio =
    lang === "ms" ? staff.bio_ms ?? staff.bio_en : staff.bio_en ?? staff.bio_ms;
  const photo =
    staff.photo_url || staff.photo || "/images/staff/placeholder.jpg";
  const departments = Array.isArray(staff.departments)
    ? staff.departments.join(", ")
    : staff.departments;

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <section className="container mx-auto px-4 py-20">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center md:items-start gap-10"
        >
          {/* Staff Image */}
          <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-lg bg-orange-50">
            <Image
              src={photo}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: "cover" }}
              className="rounded-2xl"
            />
          </div>

          {/* Staff Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-slate-900">{name}</h1>
            <p className="text-orange-700 font-medium mt-1">{role}</p>

            {departments && (
              <p className="text-sm text-slate-500 mt-2">{departments}</p>
            )}

            <div className="mt-6">
              <Link
                href={`/${lang}/staff`}
                className="inline-flex items-center rounded-xl px-5 py-3 bg-orange-500 text-white font-semibold shadow hover:brightness-95 transition"
              >
                {lang === "ms" ? "← Kembali ke Senarai Kakitangan" : "← Back to Staff"}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        {bio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-16 bg-white/70 backdrop-blur-md rounded-2xl shadow p-8 md:p-10 max-w-3xl mx-auto"
          >
            <h2 className="text-xl font-semibold text-orange-700 mb-4">
              {lang === "ms" ? "Latar Belakang" : "Biography"}
            </h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {bio}
            </p>
          </motion.div>
        )}
      </section>

      <Footer lang={lang} />
    </main>
  );
}
