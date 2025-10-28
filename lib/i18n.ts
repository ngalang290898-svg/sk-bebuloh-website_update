'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'ms';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.staff': 'Staff',
    'nav.news': 'News',
    'nav.gallery': 'Gallery',
    'nav.contact': 'Contact',
    'home.overview': 'School Overview',
    'home.vision': 'Vision',
    'home.mission': 'Mission',
    'home.history': 'History',
    'home.philosophy': 'Philosophy',
    'home.contact': 'Contact Us',
    'staff.directory': 'Staff Directory',
    'staff.filter': 'Filter by Department',
    'staff.all': 'All Departments',
    'staff.view_profile': 'View Profile',
    'common.read_more': 'Read More',
    'common.learn_more': 'Learn More',
    'common.contact_us': 'Contact Us',
    'common.address': 'Address',
    'common.phone': 'Phone',
    'common.email': 'Email',
    'common.hours': 'Operating Hours',
  },
  ms: {
    'nav.home': 'Laman Utama',
    'nav.about': 'Tentang Kami',
    'nav.staff': 'Staf',
    'nav.news': 'Berita',
    'nav.gallery': 'Galeri',
    'nav.contact': 'Hubungi',
    'home.overview': 'Gambaran Sekolah',
    'home.vision': 'Visi',
    'home.mission': 'Misi',
    'home.history': 'Sejarah',
    'home.philosophy': 'Falsafah',
    'home.contact': 'Hubungi Kami',
    'staff.directory': 'Direktori Staf',
    'staff.filter': 'Saring mengikut Jabatan',
    'staff.all': 'Semua Jabatan',
    'staff.view_profile': 'Lihat Profil',
    'common.read_more': 'Baca Lagi',
    'common.learn_more': 'Ketahui Lagi',
    'common.contact_us': 'Hubungi Kami',
    'common.address': 'Alamat',
    'common.phone': 'Telefon',
    'common.email': 'E-mel',
    'common.hours': 'Waktu Operasi',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('skb-language') as Language;
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('skb-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
