// app/[lang]/contact/page.tsx
import Footer from "@/components/Footer";

export default function ContactPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-4xl font-bold text-orange-700 mb-4">
          {lang === "ms" ? "Hubungi Kami" : "Contact Us"}
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl">
          {lang === "ms"
            ? "Halaman ini sedang dalam pembinaan. Sila hubungi kami melalui maklumat rasmi sekolah di bawah."
            : "This page is currently under development. Please reach us through the official school contact information below."}
        </p>
      </div>
      <Footer lang={lang} />
    </main>
  );
}
