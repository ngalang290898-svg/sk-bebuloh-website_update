// app/[lang]/page.tsx
import HeroWithStaffImage from "@/components/HeroWithStaffImage";

export default function LangHomePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <main>
      <HeroWithStaffImage lang={lang} />
    </main>
  );
}
