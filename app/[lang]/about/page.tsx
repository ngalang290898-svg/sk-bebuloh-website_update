// app/[lang]/about/page.tsx
import Footer from "@/components/Footer";
import AboutSchool from "@/components/AboutSchool";
import { getSchoolMetadata } from "@/lib/fetchSupabaseData";

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const t = await getSchoolMetadata(lang);

  if (!t) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">{lang === "ms" ? "Data sekolah tidak dijumpai." : "School data not found."}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">{t.about?.title ?? (lang === "ms" ? "Tentang Sekolah" : "About the School")}</h1>
        <p className="text-slate-700 max-w-3xl">{t.about?.description ?? t.about_description}</p>
      </div>

      <AboutSchool t={t} />

      <Footer lang={lang} />
    </main>
  );
}
