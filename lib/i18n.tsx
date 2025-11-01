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
        const module = await import(
          `@/data/homepage-content-${locale}.json`
        );
        setContent(module.default);
      } catch (error) {
        console.error("❌ Failed to load locale JSON via hook:", error);
      }
    }
    loadLocale();
  }, [lang]);

  return content;
}
