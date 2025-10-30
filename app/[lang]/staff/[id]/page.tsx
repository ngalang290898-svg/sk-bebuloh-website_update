// app/[lang]/staff/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getStaffById } from "@/lib/fetchers";

export default async function StaffProfilePage({ params }: { params: { lang: string; id: string } }) {
  const { id, lang } = params;
  const raw = await getStaffById(id);

  if (!raw) {
    notFound();
  }

  const staff = {
    id: raw.teacher_id ?? raw.id ?? id,
    name: raw.name ?? "Unknown",
    role: raw.role ?? "",
    departments: raw.departments ?? "",
    photo: raw.photo ?? "",
    bio_en: raw.bio_en ?? "",
    bio_ms: raw.bio_ms ?? "",
  };

  const photoSrc = staff.photo
    ? staff.photo.startsWith("http")
      ? staff.photo
      : staff.photo.startsWith("/images")
      ? staff.photo
      : `/images/staff/${staff.photo}`
    : null;

  // department banner color by simple mapping (you can expand)
  const deptColor = (d?: string) => {
    if (!d) return "bg-orange-50";
    const key = d.toLowerCase();
    if (key.includes("bahasa")) return "bg-amber-50";
    if (key.includes("math") || key.includes("matem")) return "bg-indigo-50";
    if (key.includes("science") || key.includes("sains")) return "bg-green-50";
    return "bg-slate-50";
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="w-44 h-44 rounded-full overflow-hidden bg-slate-100 mb-4">
            {photoSrc ? <Image src={photoSrc} alt={staff.name} width={176} height={176} style={{ objectFit: "cover" }} /> : <div className="flex items-center justify-center h-full text-2xl text-slate-600">{staff.name?.split(" ").map(n => n[0]).join("")}</div>}
          </div>

          <h2 className="text-xl font-semibold text-slate-900">{staff.name}</h2>
          <p className="text-sm text-slate-600 mt-1">{staff.role}</p>
          {staff.departments && <p className="text-xs text-slate-500 mt-2">{staff.departments.replace(/\|/g, ", ")}</p>}
        </div>

        <div className="md:col-span-2">
          <div className={`${deptColor(staff.departments)} rounded-xl p-4 mb-6`}>
            <h3 className="text-lg font-semibold mb-1">{staff.departments || (lang === "ms" ? "Tiada Panitia" : "No Department")}</h3>
            <p className="text-sm text-slate-700">{lang === "ms" ? "Profil kakitangan" : "Staff profile"}</p>
          </div>

          <h3 className="text-lg font-semibold mb-3">{lang === "ms" ? "Biografi" : "Biography"}</h3>
          <div className="prose max-w-none text-slate-700">
            <p>{lang === "ms" ? (staff.bio_ms || staff.bio_en) : (staff.bio_en || staff.bio_ms)}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
