'use client'

import { motion } from 'framer-motion'
import { useI18n } from '../../../lib/i18n'
import { useState } from 'react'

const newsData = [
  {
    id: 1,
    title_en: 'Annual Sports Day 2024',
    title_ms: 'Hari Sukan Tahunan 2024',
    date: '2024-03-15',
    category: 'events',
    excerpt_en: 'Join us for our annual sports day celebration with various exciting competitions and activities.',
    excerpt_ms: 'Sertai kami untuk sambutan hari sukan tahunan dengan pelbagai pertandingan dan aktiviti menarik.',
    thumbnail_url: '/images/news/sports-day.jpg'
  },
  {
    id: 2,
    title_en: 'New Computer Lab Opening',
    title_ms: 'Pembukaan Makmal Komputer Baru',
    date: '2024-03-10',
    category: 'news',
    excerpt_en: 'Our school proudly announces the opening of the new computer lab with state-of-the-art facilities.',
    excerpt_ms: 'Sekolah kami dengan bangga mengumumkan pembukaan makmal komputer baru dengan kemudahan terkini.',
    thumbnail_url: '/images/news/computer-lab.jpg'
  },
  {
    id: 3,
    title_en: 'Parent-Teacher Meeting',
    title_ms: 'Mesyuarat Ibu Bapa-Guru',
    date: '2024-03-05',
    category: 'events',
    excerpt_en: 'Schedule for the upcoming parent-teacher meeting to discuss student progress.',
    excerpt_ms: 'Jadual untuk mesyuarat ibu bapa-guru akan datang untuk membincangkan kemajuan pelajar.',
    thumbnail_url: '/images/news/ptm.jpg'
  }
]

export default function NewsSection() {
  const { t, language } = useI18n()
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'events'>('all')

  const filteredNews = newsData.filter(item => 
    activeTab === 'all' || item.category === activeTab
  )

  return (
    <section className="section bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-4">
            {t('news.title')}
          </h2>
          <p className="text-dark/70 text-lg">
            {t('news.subtitle')}
          </p>
        </motion.div>

        {/* Tab Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-primary text-white shadow-glow' 
                  : 'text-dark/70 hover:text-dark'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'news' 
                  ? 'bg-primary text-white shadow-glow' 
                  : 'text-dark/70 hover:text-dark'
              }`}
            >
              {t('news.news')}
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'events' 
                  ? 'bg-primary text-white shadow-glow' 
                  : 'text-dark/70 hover:text-dark'
              }`}
            >
              {t('news.events')}
            </button>
          </div>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <motion.article
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-primary to-secondary relative">
                {/* Placeholder for image */}
                <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                  📰
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    news.category === 'news' 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {news.category === 'news' ? t('news.news') : t('news.events')}
                  </span>
                  <span className="text-dark/60 text-sm">
                    {new Date(news.date).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-heading font-bold text-dark mb-3 line-clamp-2">
                  {language === 'en' ? news.title_en : news.title_ms}
                </h3>
                
                <p className="text-dark/60 leading-relaxed mb-4 line-clamp-3">
                  {language === 'en' ? news.excerpt_en : news.excerpt_ms}
                </p>
                
                <button className="text-primary font-semibold hover:text-secondary transition-colors duration-300">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button className="bg-dark hover:bg-dark/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg">
            View All News & Events
          </button>
        </motion.div>
      </div>
    </section>
  )
}
