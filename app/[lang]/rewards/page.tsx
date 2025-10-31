// app/[lang]/rewards/page.tsx
import Footer from "@/components/Footer";

export default async function RewardsPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">{lang === "ms" ? "Ganjaran" : "Rewards"}</h1>
        <p className="text-slate-600">{lang === "ms" ? "Sistem ganjaran sedang dibina." : "The reward system is under construction."}</p>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
