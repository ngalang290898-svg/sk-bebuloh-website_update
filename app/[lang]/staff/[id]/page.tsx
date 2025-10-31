// app/[lang]/staff/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getStaffById, getSchoolMetadata } from "@/lib/fetchSupabaseData";
import Footer from "@/components/Footer";

export default async function StaffProfile({ params }: { params: { lang: string; id: string } }) {
  const { lang, id } = params;
  const staff = await getStaffById(id);
  const t = await getSchoolMetadata(lang);

  if (!staff) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{lang === "ms" ? "Kakitangan tidak ditemui" : "Staff not found"}</h1>
          <p className="mt-2 text-slate-600">{lang === "ms" ? "Profil kakitangan tidak wujud." : "This staff profile does not exist."}</p>
          <div className="mt-4">
            <Link href={`/${lang}/staff`} className="text-orange-600 underline">{lang === "ms" ? "Kembali ke Kakitangan" : "Back to Staff"}</Link>
          </div>
        </div>
      </main>
    );
  }

  const name = lang === "ms" ? (staff.name_ms ?? staff.name_en) : (staff.name_en ?? staff.name_ms ?? staff.name);

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div className="col-span-1">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-6">
              <div className="w-full h-60 relative rounded-lg overflow-hidden bg-orange-50">
                <Image
                  src={staff.photo_url ?? staff.photo ?? "/images/headmaster.jpg"}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-sm text-slate-600 mt-1">{lang === "ms" ? (staff.role_ms ?? staff.role_en ?? staff.role) : (staff.role_en ?? staff.role_ms ?? staff.role)}</p>
                {staff.departments && <p className="text-xs text-slate-500 mt-2">{Array.isArray(staff.departments) ? staff.departments.join(" | ") : String(staff.departments)}</p>}
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-3">{lang === "ms" ? "Biografi" : "Biography"}</h3>
              <p className="text-slate-700 leading-relaxed">{lang === "ms" ? (staff.bio_ms ?? staff.bio_en ?? "") : (staff.bio_en ?? staff.bio_ms ?? "")}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
