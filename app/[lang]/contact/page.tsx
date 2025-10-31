// app/[lang]/contact/page.tsx
import Footer from "@/components/Footer";
import { getSchoolMetadata } from "@/lib/fetchSupabaseData";

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const meta = await getSchoolMetadata(lang);

  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">{meta?.contact?.title ?? (lang === "ms" ? "Hubungi Kami" : "Contact Us")}</h1>
        <div className="text-slate-700">
          <p><strong>{lang === "ms" ? "Alamat:" : "Address:"}</strong> {meta?.contact?.address ?? meta?.contact_address}</p>
          <p className="mt-2"><strong>{lang === "ms" ? "Telefon:" : "Phone:"}</strong> {meta?.contact?.phone ?? meta?.contact_phone}</p>
          <p className="mt-2"><strong>Email:</strong> {meta?.contact?.email ?? meta?.contact_email}</p>
        </div>
      </div>

      <Footer lang={lang} />
    </main>
  );
}
