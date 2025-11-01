'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../../../lib/i18n'
import Image from 'next/image'

export default function WelcomeSection() {
  const { t } = useI18n()

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Headmaster Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-rising rounded-full transform rotate-6"></div>
              <Image
                src="/images/headmaster-placeholder.jpg"
                alt={t('welcome.headmaster')}
                width={500}
                height={500}
                className="rounded-full object-cover w-full h-full relative z-10 border-8 border-white"
              />
            </div>
          </motion.div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark">
              {t('welcome.title')}
            </h2>
            
            <div className="bg-gradient-to-r from-pastel to-pastel/50 p-6 rounded-2xl">
              <p className="text-lg text-dark/80 leading-relaxed">
                {t('welcome.message')}
              </p>
              
              <div className="mt-6 pt-6 border-t border-dark/20">
                <p className="text-dark font-semibold italic">
                  "{t('welcome.quote')}"
                </p>
                <p className="text-dark/60 mt-2">
                  - {t('welcome.headmaster')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
