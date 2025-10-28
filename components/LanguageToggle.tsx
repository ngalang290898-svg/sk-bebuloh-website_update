'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.div 
      className="flex items-center space-x-2 bg-glass-white rounded-full p-1 border border-glass-border"
      whileHover={{ scale: 1.05 }}
    >
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-primary text-white shadow-md'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ms')}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
          language === 'ms'
            ? 'bg-primary text-white shadow-md'
            : 'text-text-secondary hover:text-text-primary'
        }`}
      >
        BM
      </button>
    </motion.div>
  );
}
