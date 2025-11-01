'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../../../lib/i18n'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const achievements = [
  { number: 95, suffix: '%', label_en: 'Academic Excellence', label_ms: 'Kecemerlangan Akademik', icon: '🏆' },
  { number: 1500, suffix: '+', label_en: 'Students Enrolled', label_ms: 'Pelajar Didaftarkan', icon: '👨‍🎓' },
  { number: 50, suffix: '+', label_en: 'Qualified Teachers', label_ms: 'Guru Bertauliah', icon: '👩‍🏫' },
  { number: 25, suffix: '+', label_en: 'Years Established', label_ms: 'Tahun Ditubuhkan', icon: '🏫' }
]

function AnimatedCounter({ number, suffix }: { number: number; suffix: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  return (
    <div ref={ref}>
      {inView && (
        <CountUp
          start={0}
          end={number}
          duration={2.5}
          suffix={suffix}
          className="text-4xl md:text-5xl font-heading font-bold text-white"
        />
      )}
    </div>
  )
}

export default function AchievementsSection() {
  const { t, language } = useI18n()

  return (
    <section className="section bg-gradient-rising relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 left-10 w-8 h-8 bg-white rounded-full"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute top-20 right-20 w-6 h-6 bg-white rounded-full"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-20 w-10 h-10 bg-white rounded-full"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            {t('achievements.title')}
          </h2>
          <p className="text-white/80 text-lg">
            {t('achievements.subtitle')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="glass-effect rounded-2xl p-6">
                <div className="text-3xl mb-4">{achievement.icon}</div>
                <AnimatedCounter number={achievement.number} suffix={achievement.suffix} />
                <p className="text-white/90 font-medium mt-2">
                  {language === 'en' ? achievement.label_en : achievement.label_ms}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
