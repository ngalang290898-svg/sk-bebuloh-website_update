// app/[lang]/page.tsx
import { getSchoolMetadata } from "@/lib/fetchSupabaseData";
import HeroWithStaffImage from "@/components/HeroWithStaffImage";
import AboutSchool from "@/components/AboutSchool";
import PrincipalMessage from "@/components/PrincipalMessage";
import VisionMission from "@/components/VisionMission";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default async function LangHomePage({ params }: { params: { lang: string } }) {
  let { lang } = params;

  // ✅ Normalize 'bm' → 'ms'
  if (lang === "bm") lang = "ms";

  const t = await getSchoolMetadata(lang);

  if (!t) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">
          {lang === "ms" ? "Data sekolah tidak dijumpai." : "School data not found."}
        </p>
      </main>
    );
  }

  return (
    <main>
      <HeroWithStaffImage lang={lang} t={t} />
      <AboutSchool t={t} />
      <PrincipalMessage t={t} lang={lang} />
      <VisionMission t={t} lang={lang} />
      <ContactSection t={t} lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
