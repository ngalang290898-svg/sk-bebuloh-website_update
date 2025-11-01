'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../../../lib/i18n'

export default function VisionMissionSection() {
  const { t } = useI18n()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="section bg-gradient-rising relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white rounded-full"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Vision Card */}
          <motion.div
            variants={item}
            className="glass-effect rounded-3xl p-8 text-white"
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4">
              {t('visionMission.vision.title')}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {t('visionMission.vision.description')}
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            variants={item}
            className="glass-effect rounded-3xl p-8 text-white"
          >
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4">
              {t('visionMission.mission.title')}
            </h3>
            <p className="text-white/90 leading-relaxed">
              {t('visionMission.mission.description')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
