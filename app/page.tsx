// app/page.tsx
import HeroWithStaffImage from "@/components/HeroWithStaffImage";

export default function HomePage() {
  return (
    <main>
      {/* English default homepage */}
      <HeroWithStaffImage lang="en" />
    </main>
  );
}
