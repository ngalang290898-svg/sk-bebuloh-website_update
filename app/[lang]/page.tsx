// app/[lang]/page.tsx
import HeroWithStaffImage from "@/components/HeroWithStaffImage";
import AboutSchool from "@/components/AboutSchool";
import PrincipalMessage from "@/components/PrincipalMessage";
import VisionMission from "@/components/VisionMission";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default async function LangHomePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const t = (await import(`@/data/homepage-content-${lang}.json`)).default;

  return (
    <main>
      <HeroWithStaffImage lang={lang} />
      <AboutSchool t={t} />
      <PrincipalMessage t={t} lang={lang} />
      <VisionMission t={t} lang={lang} />
      <ContactSection t={t} lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
