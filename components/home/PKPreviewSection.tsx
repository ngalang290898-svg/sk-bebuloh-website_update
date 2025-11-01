'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../../../lib/i18n'
import Link from 'next/link'

const pkSections = [
  {
    slug: 'kurikulum',
    icon: '📚',
    title_en: 'Curriculum',
    title_ms: 'Kurikulum',
    description_en: 'Academic excellence and learning development',
    description_ms: 'Kecemerlangan akademik dan pembangunan pembelajaran',
    color: 'from-blue-500 to-purple-600'
  },
  {
    slug: 'hem',
    icon: '👥',
    title_en: 'Student Affairs',
    title_ms: 'Hal Ehwal Murid',
    description_en: 'Student welfare and personal development',
    description_ms: 'Kebajikan murid dan pembangunan peribadi',
    color: 'from-green-500 to-teal-600'
  },
  {
    slug: 'kokurikulum',
    icon: '⚽',
    title_en: 'Co-curriculum',
    title_ms: 'Kokurikulum',
    description_en: 'Sports, clubs, and talent development',
    description_ms: 'Sukan, kelab dan pembangunan bakat',
    color: 'from-orange-500 to-red-600'
  }
]

export default function PKPreviewSection() {
  const { t, language } = useI18n()

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
            {t('pk.title')}
          </h2>
          <p className="text-dark/70 text-lg">
            {t('pk.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pkSections.map((section, index) => (
            <motion.div
              key={section.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Link href={`/pk/${section.slug}`}>
                <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 text-center group-hover:shadow-xl transition-all duration-300">
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {section.icon}
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-dark mb-2">
                    {language === 'en' ? section.title_en : section.title_ms}
                  </h3>
                  
                  <p className="text-dark/60 mb-4">
                    {language === 'en' ? section.description_en : section.description_ms}
                  </p>
                  
                  <div className="inline-flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    Explore
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
