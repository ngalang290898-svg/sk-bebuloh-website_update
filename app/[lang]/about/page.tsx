// app/[lang]/about/page.tsx
import Footer from "@/components/Footer";
import AboutSchool from "@/components/AboutSchool";

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const t = (await import(`@/data/homepage-content-${lang}.json`)).default;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">
          {t.about.title}
        </h1>
        <p className="text-slate-700 max-w-3xl">{t.about.description}</p>
      </div>

      {/* Reuse AboutSchool component (visual consistency) */}
      <AboutSchool t={t} />

      <Footer lang={lang} />
    </main>
  );
}
