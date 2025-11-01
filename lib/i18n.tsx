// lib/i18n.tsx
"use client";

import { useEffect, useState } from "react";

/**
 * 🔤 getLocaleContent(lang)
 * Server-safe async function to load the correct JSON translation file
 */
export async function getLocaleContent(lang: string = "en") {
  try {
    const locale =
      lang === "bm" ? "ms" : ["en", "ms"].includes(lang) ? lang : "en";
    const content = (await import(`@/data/homepage-content-${locale}.json`))
      .default;
    return content;
  } catch (error) {
    console.error("❌ Failed to load locale JSON:", error);
    return {};
  }
}

/**
 * 🌐 useLocaleContent()
 * Client-side React hook to dynamically fetch locale content.
 */
export function useLocaleContent(lang?: string) {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    async function loadLocale() {
      try {
        const locale =
          lang === "bm" ? "ms" : ["en", "ms"].includes(lang || "")
            ? lang
            : "en";
        const localeModule = await import(
          `@/data/homepage-content-${locale}.json`
        );
        setContent(localeModule.default);
      } catch (error) {
        console.error("❌ Failed to load locale JSON via hook:", error);
      }
    }
    loadLocale();
  }, [lang]);

  return content;
}

/**
 * 🗣️ useLanguage()
 * Lightweight hook to manage language state for UI toggles.
 * Reads from the current URL or localStorage, and lets you switch.
 */
export function useLanguage() {
  const [language, setLanguage] = useState<string>("en");

  // Detect language from URL or saved value
  useEffect(() => {
    const pathLang = window.location.pathname.split("/")[1];
    const saved = localStorage.getItem("lang");
    const detected =
      saved || (pathLang === "ms" || pathLang === "bm" ? "ms" : "en");
    setLanguage(detected);
  }, []);

  // Sync updates to localStorage
  useEffect(() => {
    if (language) {
      localStorage.setItem("lang", language);
    }
  }, [language]);

  // Toggle between EN ↔ BM
  const toggleLanguage = () => {
    const newLang = language === "en" ? "ms" : "en";
    setLanguage(newLang);

    // redirect to the same page with new prefix
    const current = window.location.pathname;
    const newPath = current.replace(`/${language}`, `/${newLang}`);
    window.location.href = newPath;
  };

  return { language, setLanguage, toggleLanguage };
}
