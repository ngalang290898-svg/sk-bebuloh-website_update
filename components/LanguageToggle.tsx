'use client'

import { useI18n } from '../../lib/i18n'

export default function LanguageToggle() {
  const { language, changeLanguage } = useI18n()

  return (
    <button
      onClick={() => changeLanguage(language === 'en' ? 'ms' : 'en')}
      className="glass-effect rounded-full px-4 py-2 text-sm font-medium text-dark hover:shadow-glow transition-all duration-300"
    >
      {language === 'en' ? 'BM' : 'EN'}
    </button>
  )
}
