'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { School, Mail, Phone, MapPin } from 'lucide-react';
import homepageContentEN from '@/data/homepage-content-en.json';
import homepageContentMS from '@/data/homepage-content-ms.json';

export default function Footer() {
  const { language } = useLanguage();
  const content = language === 'ms' ? homepageContentMS : homepageContentEN;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect border-t border-glass-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* School Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent-red rounded-full flex items-center justify-center">
                <School className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-xl text-text-primary">
                  {content.school_name}
                </h3>
                <p className="text-text-secondary text-sm">{content.motto}</p>
              </div>
            </div>
            <p className="text-text-primary leading-relaxed mb-4">
              {content.overview.substring(0, 150)}...
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-montserrat font-semibold text-lg text-text-primary mb-4">
              {language === 'ms' ? 'Pautan Pantas' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-text-secondary hover:text-primary transition-colors">{language === 'ms' ? 'Laman Utama' : 'Home'}</a></li>
              <li><a href="/about" className="text-text-secondary hover:text-primary transition-colors">{language === 'ms' ? 'Tentang Kami' : 'About Us'}</a></li>
              <li><a href="/staff" className="text-text-secondary hover:text-primary transition-colors">{language === 'ms' ? 'Staf' : 'Staff'}</a></li>
              <li><a href="/news" className="text-text-secondary hover:text-primary transition-colors">{language === 'ms' ? 'Berita' : 'News'}</a></li>
              <li><a href="/contact" className="text-text-secondary hover:text-primary transition-colors">{language === 'ms' ? 'Hubungi' : 'Contact'}</a></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-montserrat font-semibold text-lg text-text-primary mb-4">
              {language === 'ms' ? 'Hubungi Kami' : 'Contact Us'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-text-secondary text-sm">{content.contact.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-text-secondary text-sm">{content.contact.phone}</span>
              </div>
              <div className="flex itemsCenter space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-text-secondary text-sm">{content.contact.email}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-glass-border mt-8 pt-8 text-center"
        >
          <p className="text-text-secondary">
            © {currentYear} {content.school_name}. {language === 'ms' ? 'Hak Cipta Terpelihara' : 'All Rights Reserved'}.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
