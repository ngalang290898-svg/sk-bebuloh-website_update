'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../../../lib/i18n'

export default function HeroSection() {
  const { t } = useI18n()

  return (
    <section className="section min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-sunset">
      {/* Animated Wave Background */}
      <div className="absolute bottom-0 left-0 w-full">
        <motion.svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-24 md:h-32"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="white"
            fillOpacity="1"
          ></path>
        </motion.svg>
      </div>

      <div className="container-custom text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-dark mb-6"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-dark/80 mb-8 max-w-3xl mx-auto"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-glow">
            {t('hero.cta.primary')}
          </button>
          <button className="border-2 border-dark text-dark hover:bg-dark hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300">
            {t('hero.cta.secondary')}
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-dark rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-dark rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
