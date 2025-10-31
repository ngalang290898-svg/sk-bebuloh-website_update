// app/[lang]/staff/page.tsx
import StaffSection from "@/components/StaffSection";
import JumpNav from "@/components/JumpNav";
import BackHomeButton from "@/components/BackHomeButton";
import { getStaffData } from "@/lib/fetchSupabaseData";

type DeptMap = { [key: string]: string };

// ✅ Finalized BM translations for departments (Panitia)
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
  const exact = DEPARTMENT_TRANSLATIONS_MS[dept];
  if (exact) return exact;
  const key = Object.keys(DEPARTMENT_TRANSLATIONS_MS).find(
    (k) => k.toLowerCase() === dept.toLowerCase()
  );
  if (key) return DEPARTMENT_TRANSLATIONS_MS[key];
  const d = dept.toLowerCase();
  if (d.includes("bahasa")) return "Panitia Bahasa Malaysia";
  if (d.includes("english") || d.includes("inggeris")) return "Panitia Bahasa Inggeris";
  if (d.includes("math") || d.includes("matem")) return "Panitia Matematik";
  if (d.includes("science") || d.includes("sains")) return "Panitia Sains";
  if (d.includes("islam")) return "Panitia Pendidikan Islam";
  if (d.includes("tmk") || d.includes("ict") || d.includes("computer"))
    return "Panitia Teknologi Maklumat dan Komunikasi (TMK)";
  return dept;
}

export default async function StaffPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || "en";
  const raw = await getStaffData();

  const normalizeDepartments = (value?: string | string[]) => {
    if (!value) return "";
    return Array.isArray(value) ? value.join(" | ") : value;
  };

  const staff = raw.map((s: any) => {
    const norm = normalizeDepartments(s.departments);
    const parts = norm ? norm.split("|").map((p) => p.trim()) : [];
    const translated = parts.map((p) => translateDepartment(p, lang)).join(" | ");
    return {
      teacher_id: s.teacher_id,
      id: s.id,
      name: lang === "ms" ? s.name_ms ?? s.name_en : s.name_en,
      role: lang === "ms" ? s.role_ms ?? s.role_en : s.role_en,
      role_level: s.role_level,
      departments: translated,
      photo: s.photo_url ?? "",
      bio: lang === "ms" ? s.bio_ms ?? "" : s.bio_en ?? ""
    };
  });

  const headmaster = staff.filter((s) => s.role_level === 1);
  const admins = staff.filter((s) => s.role_level === 2);
  const hods = staff.filter((s) => s.role_level === 3);
  const teachers = staff.filter((s) => s.role_level === 4);
  const support = staff.filter((s) => s.role_level === 5);

  const deptMap = new Map<string, typeof staff>();
  [...hods, ...teachers].forEach((m) => {
    if (!m.departments) return;
    m.departments.split("|").forEach((d) => {
      const key = d.trim();
      if (!deptMap.has(key)) deptMap.set(key, []);
      deptMap.get(key)?.push(m);
    });
  });

  return (
    <main className="min-h-screen bg-[transparent]">
      <JumpNav lang={lang} />
      <div className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {lang === "ms" ? "Kakitangan Sekolah" : "Our Staff"}
          </h1>
          <p className="text-slate-600 mt-2">
            {lang === "ms"
              ? "Kenali barisan tenaga pengajar dan kakitangan SK Bebuloh Labuan."
              : "Meet the dedicated educators and staff of SK Bebuloh Labuan."}
          </p>
        </header>

        {/* Headmaster */}
        {headmaster.length > 0 && (
          <StaffSection
            title={lang === "ms" ? "Guru Besar" : "Headmaster"}
            staffList={headmaster}
            layout="hero"
            lang={lang}
            icon="shield"
          />
        )}

        {/* Administrative Assistants */}
        {admins.length > 0 && (
          <StaffSection
            title={lang === "ms" ? "Barisan Penolong Kanan" : "Administrative Assistants"}
            staffList={admins}
            layout="grid"
            lang={lang}
            icon="users"
          />
        )}

        {/* Departments */}
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

        {/* Teachers & Support */}
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
      </div>
      <BackHomeButton lang={lang} />
    </main>
  );
}
