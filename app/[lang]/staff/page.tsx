// app/[lang]/staff/page.tsx
import StaffSection from "@/components/StaffSection";
import JumpNav from "@/components/JumpNav";
import { getStaffData } from "@/lib/fetchers";

export default async function StaffPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || "en";

  // ✅ Load translation JSON safely (no hooks)
  const t = (await import(`@/data/homepage-content-${lang}.json`)).default;

  const raw = await getStaffData();

  const staff = raw.map((s) => ({
    teacher_id: s.teacher_id ?? s.id ?? undefined,
    id: s.id,
    name: s.name ?? "Unknown",
    role: s.role ?? "",
    role_level: s.role_level ? Number(s.role_level) : 4,
    departments: s.departments ?? "",
    photo: s.photo ?? "",
    bio_en: s.bio_en ?? "",
    bio_ms: s.bio_ms ?? "",
  }));

  const headmaster = staff.filter((s) => s.role_level === 1);
  const admins = staff.filter((s) => s.role_level === 2);
  const hods = staff.filter((s) => s.role_level === 3);
  const teachers = staff.filter((s) => s.role_level === 4);
  const support = staff.filter((s) => s.role_level === 5);

  const deptMap = new Map<string, typeof staff>();
  const addToDept = (member: any) => {
    if (!member.departments) return;
    const parts = member.departments
      .split("|")
      .map((p: string) => p.trim())
      .filter(Boolean);
    parts.forEach((d: string) => {
      const cur = deptMap.get(d) ?? [];
      cur.push(member);
      deptMap.set(d, cur);
    });
  };
  [...hods, ...teachers].forEach(addToDept);

  return (
    <main className="min-h-screen bg-[transparent]">
      <JumpNav lang={lang} />

      <div className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {t?.staff_page_title ?? (lang === "ms" ? "Kakitangan Kami" : "Our Staff")}
          </h1>
          <p className="text-slate-600 mt-2">
            {t?.staff_page_description ??
              (lang === "ms"
                ? "Kenali pasukan di belakang SK Bebuloh."
                : "Meet the team behind SK Bebuloh.")}
          </p>
        </header>

        {/* Headmaster */}
        <section id="headmaster">
          {headmaster.length > 0 && (
            <StaffSection
              title={lang === "ms" ? "Guru Besar" : "Headmaster"}
              staffList={headmaster}
              layout="hero"
              lang={lang}
              icon="shield"
            />
          )}
        </section>

        {/* Administrative Assistants */}
        <section id="admins">
          {admins.length > 0 && (
            <StaffSection
              title={lang === "ms" ? "Pembantu Tadbir" : "Administrative Assistants"}
              staffList={admins}
              layout="grid"
              lang={lang}
              icon="users"
            />
          )}
        </section>

        {/* Departments */}
        <section id="departments">
          {Array.from(deptMap.keys())
            .sort()
            .map((dept) => (
              <div key={dept}>
                <StaffSection
                  title={dept}
                  staffList={deptMap.get(dept) ?? []}
                  layout="grid"
                  lang={lang}
                  icon="book"
                />
              </div>
            ))}
        </section>

        {/* General Teachers + Support Staff */}
        <section id="support">
          {teachers.filter((t) => !t.departments).length > 0 && (
            <StaffSection
              title={lang === "ms" ? "Guru" : "Teachers"}
              staffList={teachers.filter((t) => !t.departments)}
              layout="grid"
              lang={lang}
              icon="book"
            />
          )}

          {support.length > 0 && (
            <StaffSection
              title={lang === "ms" ? "Kakitangan Sokongan" : "Support Staff"}
              staffList={support}
              layout="grid"
              lang={lang}
              icon="users"
            />
          )}
        </section>
      </div>
    </main>
  );
}
