"use client";

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";
import GlassCard from "@/components/GlassCard";
import { useLanguage } from "@/lib/i18n";
import homepageContentEN from "@/data/homepage-content-en.json";
import homepageContentMS from "@/data/homepage-content-ms.json";
import newsData from "@/data/news.json";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const { language, t } = useLanguage();
  const content = language === "ms" ? homepageContentMS : homepageContentEN;

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Overview Section */}
      <SectionWrapper id="overview" title={t("home.overview")}>
        <GlassCard>
          <p className="text-lg leading-relaxed text-text-primary">
            {content.overview}
          </p>
        </GlassCard>
      </SectionWrapper>

      {/* Vision & Mission Section */}
      <div className="bg-gradient-to-br from-pastel-bg to-glass-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <GlassCard>
              <h3 className="font-montserrat font-bold text-2xl text-primary mb-4">
                {t("home.vision")}
              </h3>
              <p className="text-lg leading-relaxed text-text-primary">
                {content.vision}
              </p>
            </GlassCard>

            {/* Mission */}
            <GlassCard>
              <h3 className="font-montserrat font-bold text-2xl text-primary mb-4">
                {t("home.mission")}
              </h3>
              <ul className="space-y-3">
                {content.mission.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-text-primary leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* History Section */}
      <SectionWrapper id="history" title={t("home.history")}>
        <GlassCard>
          <div className="space-y-6">
            {content.history.map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-primary rounded-full mt-2" />
                <p className="text-lg text-text-primary leading-relaxed">
                  {event}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </SectionWrapper>

      {/* Latest News Section */}
      <SectionWrapper
        id="news"
        title={language === "ms" ? "Berita Terkini" : "Latest News"}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.slice(0, 3).map((news, index) => (
            <GlassCard key={index} hover={true}>
              <div className="space-y-4">
                <h4 className="font-montserrat font-bold text-xl text-text-primary">
                  {language === "ms" ? news.title_ms : news.title_en}
                </h4>
                <p className="text-sm text-text-secondary">
                  {formatDate(news.date, language)}
                </p>
                <p className="text-text-primary leading-relaxed">
                  {language === "ms" ? news.summary_ms : news.summary_en}
                </p>
                <a
                  href="/news"
                  className="inline-flex items-center text-primary font-semibold hover:underline"
                >
                  {t("common.read_more")} →
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </SectionWrapper>

      <Footer />
    </main>
  );
}
