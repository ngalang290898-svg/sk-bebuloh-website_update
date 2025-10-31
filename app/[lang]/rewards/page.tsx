// app/[lang]/rewards/page.tsx
import Footer from "@/components/Footer";

export default function RewardsPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-4xl font-bold text-orange-700 mb-4">
          {lang === "ms" ? "Ganjaran" : "Rewards"}
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl">
          {lang === "ms"
            ? "Sistem ganjaran pelajar akan dilancarkan tidak lama lagi. Nantikan kemas kini dari SK Bebuloh!"
            : "The student reward system will be launched soon. Stay tuned for updates from SK Bebuloh!"}
        </p>
      </div>
      <Footer lang={lang} />
    </main>
  );
}
