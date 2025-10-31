// app/[lang]/staff/page.tsx
import StaffSection from "@/components/StaffSection";
import JumpNav from "@/components/JumpNav";
import BackHomeButton from "@/components/BackHomeButton";
import { getStaffData } from "@/lib/fetchSupabaseData";

export default async function StaffPage({ params }: { params: { lang: string } }) {
  const lang = params.lang === "bm" ? "ms" : params.lang || "en";

  const raw = await getStaffData();
  if (!raw || raw.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">
          {lang === "ms" ? "Tiada data kakitangan ditemui." : "No staff data found."}
        </p>
      </main>
    );
  }

  // ✅ Normalize departments (string or array)
  const staff = raw.map((s: any) => {
    let depts: string[] = [];
    if (Array.isArray(s.departments)) depts = s.departments;
    else if (typeof s.departments === "string")
      depts = s.departments
        .split("|")
        .map((p: string) => p.trim()) // ✅ typed parameter
        .filter(Boolean);

    return {
      teacher_id: s.teacher_id,
      id: s.id,
      name: lang === "ms" ? s.name_ms ?? s.name_en : s.name_en,
      role: lang === "ms" ? s.role_ms ?? s.role_en : s.role_en,
      role_level: s.role_level ?? 4,
      departments: depts,
      photo: s.photo_url ?? "",
      bio: lang === "ms" ? s.bio_ms ?? "" : s.bio_en ?? ""
    };
  });

  // ✅ Grouping logic (Guru Besar, PK, HOD, Teachers, Support)
  const headmaster = staff.filter((s) => s.role_level === 1);
  const admins = staff.filter((s) => s.role_level === 2);
  const hods = staff.filter((s) => s.role_level === 3);
  const teachers = staff.filter((s) => s.role_level >= 4);
  const support = staff.filter((s) => s.role_level === 5);

  // ✅ Build departments map
  const deptMap = new Map<string, typeof staff>();
  staff.forEach((member) => {
    if (member.departments && member.departments.length > 0) {
      member.departments.forEach((d: string) => {
        if (!deptMap.has(d)) deptMap.set(d, []);
        deptMap.get(d)!.push(member);
      });
    }
  });

  // ✅ Remove duplicates
  deptMap.forEach((list, key) => {
    const unique = list.filter(
      (v, i, arr) => arr.findIndex((x) => x.teacher_id === v.teacher_id) === i
    );
    deptMap.set(key, unique);
  });

  return (
    <main className="min-h-screen bg-[transparent]">
      <JumpNav lang={lang} />

      <div className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {lang === "ms" ? "Senarai Kakitangan" : "Our Staff"}
          </h1>
          <p className="text-slate-600 mt-2">
            {lang === "ms"
              ? "Kenali seluruh warga pendidik dan kakitangan SK Bebuloh Labuan."
              : "Meet the dedicated educators and staff of SK Bebuloh Labuan."}
          </p>
        </header>

        {headmaster.length > 0 && (
          <StaffSection
            title={lang === "ms" ? "Guru Besar" : "Headmaster"}
            staffList={headmaster}
            layout="hero"
            lang={lang}
            icon="shield"
          />
        )}

        {admins.length > 0 && (
          <StaffSection
            title={lang === "ms" ? "Barisan Penolong Kanan" : "Administrative Assistants"}
            staffList={admins}
            layout="grid"
            lang={lang}
            icon="users"
          />
        )}

        {Array.from(deptMap.keys())
          .sort()
          .map((dept) => (
            <StaffSection
              key={dept}
              title={dept}
              staffList={deptMap.get(dept) ?? []}
              layout="grid"
              lang={lang}
              icon="book"
            />
          ))}

        {support.length > 0 && (
          <StaffSection
            title={lang === "ms" ? "Kakitangan Sokongan" : "Support Staff"}
            staffList={support}
            layout="grid"
            lang={lang}
            icon="users"
          />
        )}
      </div>

      <BackHomeButton lang={lang} />
    </main>
  );
}
