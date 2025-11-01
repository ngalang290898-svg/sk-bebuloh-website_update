// app/[lang]/about/page.tsx
import { getSchoolMetadata } from "@/lib/fetchSupabaseData";
import HeroWithStaffImage from "@/components/HeroWithStaffImage";
import AboutSchool from "@/components/AboutSchool";
import VisionMission from "@/components/VisionMission";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default async function AboutPage({
  params,
}: {
  params: { lang: string };
}) {
  let { lang } = params;
  if (lang === "bm") lang = "ms";

  const t = await getSchoolMetadata(lang);

  if (!t) {
    return (
      <main className="min-h-screen flex items-center justify-center text-slate-500">
        {lang === "ms"
          ? "Maklumat sekolah tidak dijumpai."
          : "School information not found."}
      </main>
    );
  }

  return (
    <main>
      {/* Hero banner */}
      <HeroWithStaffImage
        lang={lang}
        t={t}
        imageSrc="/images/staff-group.jpg"
        alt="SK Bebuloh Labuan Staff Group"
      />

      {/* About the School */}
      <AboutSchool t={t} />

      {/* Vision & Mission */}
      <VisionMission t={t} lang={lang} />

      {/* Contact Section */}
      <ContactSection t={t} lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />
    </main>
  );
}
