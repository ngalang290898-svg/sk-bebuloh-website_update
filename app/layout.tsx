// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata = {
  title: "SK Bebuloh Labuan",
  description: "Official website of Sekolah Kebangsaan Bebuloh Labuan",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-[#fffaf8] text-slate-800 antialiased">
        <Navbar />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
