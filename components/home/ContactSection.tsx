'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../../../lib/i18n'

export default function ContactSection() {
  const { t } = useI18n()

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
            {t('contact.title')}
          </h2>
          <p className="text-dark/70 text-lg">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-pastel to-pastel/50 rounded-2xl p-6">
              <h3 className="text-2xl font-heading font-bold text-dark mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Address</h4>
                    <p className="text-dark/70">Jalan Bebuloh, 87000 WP Labuan, Malaysia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Phone</h4>
                    <p className="text-dark/70">+60 87-123 456</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Email</h4>
                    <p className="text-dark/70">info@skbebuloh.edu.my</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              <button className="w-12 h-12 bg-dark hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-glow">
                <span className="text-white">📘</span>
              </button>
              <button className="w-12 h-12 bg-dark hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-glow">
                <span className="text-white">📷</span>
              </button>
              <button className="w-12 h-12 bg-dark hover:bg-primary rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-glow">
                <span className="text-white">🐦</span>
              </button>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-dark/70 font-medium">Interactive Map</p>
                <p className="text-dark/50 text-sm">Google Maps integration</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
