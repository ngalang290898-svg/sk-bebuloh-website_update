// app/[lang]/staff/page.tsx
import StaffSection from "@/components/StaffSection";
import JumpNav from "@/components/JumpNav";
import { getStaffData } from "@/lib/fetchers";
import BackHomeButton from "@/components/BackHomeButton";

type DeptMap = { [key: string]: string };

// Final department translation map (EN -> MS: "Panitia ..." or Unit/Jawatan Kuasa)
const DEPARTMENT_TRANSLATIONS_MS: DeptMap = {
  "Bahasa Malaysia Department": "Panitia Bahasa Malaysia",
  "English Language Department": "Panitia Bahasa Inggeris",
  "Mathematics Department": "Panitia Matematik",
  "Science Department": "Panitia Sains",
  "Islamic Education Department": "Panitia Pendidikan Islam",
  "Moral Education Department": "Panitia Pendidikan Moral",
  "Physical Education & Health Department": "Panitia Pendidikan Jasmani dan Kesihatan",
  "Arts Department": "Panitia Pendidikan Seni Visual",
  "Music Department": "Panitia Muzik",
  "History Department": "Panitia Sejarah",
  "Living Skills Department": "Panitia Reka Bentuk dan Teknologi (RBT)",
  "ICT / Computer Department": "Panitia Teknologi Maklumat dan Komunikasi (TMK)",
  "Counseling Unit": "Unit Bimbingan dan Kaunseling",
  "Co-curriculum Unit": "Unit Kokurikulum",
  "Disciplinary Unit": "Unit Disiplin",
  "Prefects & Leadership Unit": "Unit Kepimpinan Murid",
  "Library & Resource Centre": "Pusat Sumber Sekolah (PSS)",
  "Examination & Assessment Unit": "Unit Penilaian dan Peperiksaan",
  "Remedial / LINUS Unit": "Unit Pemulihan Khas / LINUS",
  "SPBT (Textbook Loan) Unit": "Unit SPBT (Skim Pinjaman Buku Teks)",
  "Safety & Cleanliness Committee": "Jawatan Kuasa Keselamatan dan Kebersihan",
  "Student Welfare / Canteen Committee": "Jawatan Kuasa Kebajikan dan Kantin",
  "Innovation / STEM Committee": "Jawatan Kuasa Inovasi dan STEM",
  "Administration": "Pentadbiran",
  "Administrative Assistants": "Barisan Penolong Kanan",
  "Support Staff": "Kakitangan Sokongan",
  // common variations (lowercase / simple names) mapping
  "Bahasa Malaysia": "Panitia Bahasa Malaysia",
  "English": "Panitia Bahasa Inggeris",
  "Mathematics": "Panitia Matematik",
  "Science": "Panitia Sains",
  "Islam": "Panitia Pendidikan Islam",
  "TMK": "Panitia Teknologi Maklumat dan Komunikasi (TMK)",
  "RBT": "Panitia Reka Bentuk dan Teknologi (RBT)",
  "PSS": "Pusat Sumber Sekolah (PSS)"
};

function translateDepartment(dept: string, lang: string) {
  if (!dept) return dept;
  if (lang !== "ms") return dept;
  // try exact mapping first:
  const exact = DEPARTMENT_TRANSLATIONS_MS[dept];
  if (exact) return exact;
  // try case-insensitive find
  const key = Object.keys(DEPARTMENT_TRANSLATIONS_MS).find(
    (k) => k.toLowerCase() === dept.toLowerCase()
  );
  if (key) return DEPARTMENT_TRANSLATIONS_MS[key];
  // if dept contains keywords, attempt intelligent mapping
  const d = dept.toLowerCase();
  if (d.includes("bahasa")) return "Panitia Bahasa Malaysia";
  if (d.includes("english") || d.includes("inggeris")) return "Panitia Bahasa Inggeris";
  if (d.includes("math") || d.includes("matem")) return "Panitia Matematik";
  if (d.includes("science") || d.includes("sains")) return "Panitia Sains";
  if (d.includes("islam")) return "Panitia Pendidikan Islam";
  if (d.includes("tmk") || d.includes("ict") || d.includes("computer")) return "Panitia Teknologi Maklumat dan Komunikasi (TMK)";
  // default: return original if no translation known
  return dept;
}

export default async function StaffPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || "en";
  const t = (await import(`@/data/homepage-content-${lang}.json`)).default;

  const raw = await getStaffData();

  // normalize departments to string
  const normalizeDepartments = (value?: string | string[]) => {
    if (!value) return "";
    return Array.isArray(value) ? value.join(" | ") : value;
  };

  const staff = raw.map((s) => {
    const norm = normalizeDepartments(s.departments);
    // translate departments into array, then translate each into BM if needed
    const deptParts = norm
      ? norm.split("|").map((p) => p.trim()).filter(Boolean)
      : [];
    const translatedParts = deptParts.map((d) => translateDepartment(d, lang));
    const finalDepartments = translatedParts.join(" | ");

    return {
      teacher_id: s.teacher_id ?? s.id ?? undefined,
      id: s.id,
      name: s.name ?? s.name_en ?? "Unknown",
      role: s.role ?? s.role_en ?? "",
      role_level: s.role_level ? Number(s.role_level) : 4,
      departments: finalDepartments,
      photo: s.photo ?? s.photo_url ?? "",
      bio_en: s.bio_en ?? "",
      bio_ms: s.bio_ms ?? ""
    };
  });

  const headmaster = staff.filter((s) => s.role_level === 1);
  const admins = staff.filter((s) => s.role_level === 2);
  const hods = staff.filter((s) => s.role_level === 3);
  const teachers = staff.filter((s) => s.role_level === 4);
  const support = staff.filter((s) => s.role_level === 5);

  // Build dept map (translated already)
  const deptMap = new Map<string, typeof staff>();
  const addToDept = (member: any) => {
    if (!member.departments) return;
    const parts = member.departments.split("|").map((p: string) => p.trim()).filter(Boolean);
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
            {t?.cta?.meet_staff ?? (lang === "ms" ? "Kakitangan" : "Our Staff")}
          </h1>
          <p className="text-slate-600 mt-2">
            {t?.about?.description ?? (lang === "ms" ? "Kenali pasukan di belakang SK Bebuloh." : "Meet the team behind SK Bebuloh.")}
          </p>
        </header>

        {/* Headmaster */}
        <section id="headmaster" className="mb-8">
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
        <section id="admins" className="mb-8">
          {admins.length > 0 && (
            <StaffSection
              title={lang === "ms" ? "Barisan Penolong Kanan" : "Administrative Assistants"}
              staffList={admins}
              layout="grid"
              lang={lang}
              icon="users"
            />
          )}
        </section>

        {/* Departments */}
        <section id="departments" className="mb-8">
          {Array.from(deptMap.keys())
            .sort()
            .map((dept) => (
              <div key={dept} className="mb-6">
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

        {/* Teachers + Support Staff */}
        <section id="support" className="mb-8">
          {teachers.filter((t) => !t.departments).length > 0 && (
            <StaffSection
              title={lang === "ms" ? "Barisan Guru" : "Teachers"}
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

      {/* Floating back home */}
      <BackHomeButton lang={lang} />
    </main>
  );
}
