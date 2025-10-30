// app/[lang]/staff/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { getStaffById } from "@/lib/fetchers";

export default async function StaffProfilePage({
  params,
}: {
  params: { lang: string; id: string };
}) {
  const { id, lang } = params;
  const raw = await getStaffById(id);
  if (!raw) notFound();

  const t = (await import(`@/data/homepage-content-${lang}.json`)).default;

  const toStringSafe = (value?: string | string[]) => {
    if (!value) return "";
    return Array.isArray(value) ? value.join(" | ") : value;
  };

  const staff = {
    id: raw.teacher_id ?? raw.id ?? id,
    name: raw.name ?? raw.name_en ?? "Unknown",
    role: raw.role ?? raw.role_en ?? "",
    departments: toStringSafe(raw.departments),
    photo: raw.photo ?? raw.photo_url ?? "",
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

  const deptColor = (d?: string) => {
    if (!d) return "bg-orange-50";
    const key = d.toLowerCase();
    if (key.includes("bahasa")) return "bg-amber-50";
    if (key.includes("math") || key.includes("matem")) return "bg-indigo-50";
    if (key.includes("science") || key.includes("sains")) return "bg-green-50";
    if (key.includes("islam") || key.includes("pendidikan")) return "bg-lime-50";
    return "bg-orange-50";
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="w-44 h-44 rounded-full overflow-hidden bg-slate-100 mb-4 shadow-md">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={staff.name}
                width={176}
                height={176}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-2xl text-slate-600">
                {staff.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold text-slate-900">{staff.name}</h2>
          <p className="text-sm text-slate-600 mt-1">{staff.role}</p>

          {/* ✅ Force cast to string before replace */}
          {staff.departments && (
            <p className="text-xs text-slate-500 mt-2">
              {`${staff.departments}`.replace(/\|/g, ", ")}
            </p>
          )}
        </div>

        {/* Biography */}
        <div className="md:col-span-2">
          <div
            className={`${deptColor(
              staff.departments
            )} rounded-xl p-5 mb-6 border border-orange-100 shadow-sm`}
          >
            <h3 className="text-lg font-semibold mb-1 text-slate-800">
              {staff.departments ||
                (lang === "ms"
                  ? "Tiada Panitia"
                  : "No Department Assigned")}
            </h3>
            <p className="text-sm text-slate-700">
              {lang === "ms"
                ? "Profil kakitangan"
                : "Staff profile information"}
            </p>
          </div>

          <h3 className="text-lg font-semibold mb-3 text-orange-700">
            {lang === "ms" ? "Biografi" : "Biography"}
          </h3>
          <div className="prose max-w-none text-slate-700 leading-relaxed">
            <p>
              {lang === "ms"
                ? staff.bio_ms || staff.bio_en || "Tiada biografi tersedia."
                : staff.bio_en || staff.bio_ms || "No biography available."}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
