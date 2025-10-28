'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, title, children, className = '' }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-text-primary mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent-red mx-auto rounded-full" />
        </motion.div>
        
        {children}
      </div>
    </section>
  );
}
