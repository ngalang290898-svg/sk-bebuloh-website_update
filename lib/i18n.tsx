'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ms'

interface I18nContextType {
  language: Language
  changeLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Mock translations - replace with actual JSON files
const translations = {
  en: {
    'hero.title': 'Welcome to SK Bebuloh WP Labuan',
    'hero.subtitle': 'Nurturing Future Leaders Through Excellence in Education',
    'hero.cta.primary': 'Explore Our School',
    'hero.cta.secondary': 'Contact Us',
    'welcome.title': "Headmaster's Welcome",
    'welcome.headmaster': 'Headmaster of SK Bebuloh',
    'welcome.message': 'At SK Bebuloh WP Labuan, we are committed to providing a holistic education that nurtures students academically, morally, and spiritually. Our dedicated team of educators works tirelessly to create a conducive learning environment.',
    'welcome.quote': 'Education is the most powerful weapon which you can use to change the world',
    'visionMission.vision.title': 'Our Vision',
    'visionMission.vision.description': 'To be a premier educational institution that produces globally competitive students with strong moral values and leadership qualities.',
    'visionMission.mission.title': 'Our Mission',
    'visionMission.mission.description': 'To provide quality education through innovative teaching methods, state-of-the-art facilities, and a nurturing environment that fosters academic excellence and character development.',
    'staff.title': 'Featured Staff',
    'staff.subtitle': 'Meet our dedicated team of educators',
    'staff.cta': 'View All Staff',
    // Add more translations...
  },
  ms: {
    'hero.title': 'Selamat Datang ke SK Bebuloh WP Labuan',
    'hero.subtitle': 'Memupuk Pemimpin Masa Depan Melalui Kecemerlangan Pendidikan',
    'hero.cta.primary': 'Terokai Sekolah Kami',
    'hero.cta.secondary': 'Hubungi Kami',
    'welcome.title': 'Sambutan Guru Besar',
    'welcome.headmaster': 'Guru Besar SK Bebuloh',
    'welcome.message': 'Di SK Bebuloh WP Labuan, kami komited untuk memberikan pendidikan holistik yang memupuk pelajar secara akademik, moral dan spiritual. Pasukan pendidik kami yang berdedikasi bekerja tanpa henti untuk mewujudkan persekitaran pembelajaran yang kondusif.',
    'welcome.quote': 'Pendidikan adalah senjata paling berkuasa yang boleh anda gunakan untuk mengubah dunia',
    'visionMission.vision.title': 'Visi Kami',
    'visionMission.vision.description': 'Menjadi institusi pendidikan unggul yang melahirkan pelajar yang berdaya saing global dengan nilai-nilai murni dan sifat kepimpinan yang kukuh.',
    'visionMission.mission.title': 'Misi Kami',
    'visionMission.mission.description': 'Memberi pendidikan berkualiti melalui kaedah pengajaran inovatif, kemudahan terkini, dan persekitaran yang memupuk kecemerlangan akademik dan pembangunan sahsiah.',
    'staff.title': 'Staf Terpilih',
    'staff.subtitle': 'Bertemu dengan pasukan pendidik kami yang berdedikasi',
    'staff.cta': 'Lihat Semua Staf',
    // Add more translations...
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferred-language') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'ms')) {
      setLanguage(savedLang)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('preferred-language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
  }

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
