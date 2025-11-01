'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../../../lib/i18n'
import Image from 'next/image'

// Mock data - replace with actual Supabase fetch
const featuredStaff = [
  {
    id: 1,
    name_en: "Dr. Ahmad bin Ismail",
    name_ms: "Dr. Ahmad bin Ismail",
    role_en: "Senior Teacher - Mathematics",
    role_ms: "Guru Kanan - Matematik",
    photo_url: "/images/staff/teacher1.jpg",
    departments: ["Mathematics", "STEM"]
  },
  {
    id: 2,
    name_en: "Pn. Siti Nurhaliza binti Yusof",
    name_ms: "Pn. Siti Nurhaliza binti Yusof",
    role_en: "Head of Language Department",
    role_ms: "Ketua Panitia Bahasa",
    photo_url: "/images/staff/teacher2.jpg",
    departments: ["Languages", "Arts"]
  },
  // Add 4 more staff members...
]

export default function StaffHighlight() {
  const { t, language } = useI18n()

  return (
    <section className="section bg-gradient-deep">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {t('staff.title')}
          </h2>
          <p className="text-white/70 text-lg">
            {t('staff.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStaff.map((staff, index) => (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-dark rounded-2xl p-6 group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-rising p-1 group-hover:shadow-glow transition-all duration-300">
                  <Image
                    src={staff.photo_url}
                    alt={language === 'en' ? staff.name_en : staff.name_ms}
                    width={96}
                    height={96}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              </div>
              
              <h3 className="text-white font-heading font-semibold text-center mb-2">
                {language === 'en' ? staff.name_en : staff.name_ms}
              </h3>
              
              <p className="text-primary text-sm text-center mb-3">
                {language === 'en' ? staff.role_en : staff.role_ms}
              </p>
              
              <div className="flex flex-wrap gap-1 justify-center">
                {staff.departments.map((dept, i) => (
                  <span
                    key={i}
                    className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button className="bg-primary hover:bg-primary/90 text-dark px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-glow">
            {t('staff.cta')}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
