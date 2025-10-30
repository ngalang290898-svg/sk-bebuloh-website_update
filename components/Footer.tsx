// components/Footer.tsx
export default function Footer({ lang = "en" }: { lang?: string }) {
  return (
    <footer className="bg-orange-600 text-white py-6 mt-10">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>
          {lang === "ms"
            ? "© 2025 Sekolah Kebangsaan Bebuloh Labuan. Hak cipta terpelihara."
            : "© 2025 Sekolah Kebangsaan Bebuloh Labuan. All rights reserved."}
        </p>
        <p className="text-orange-100 mt-1">
          Designed & developed with ❤️ by SK Bebuloh Web Team
        </p>
      </div>
    </footer>
  );
}
