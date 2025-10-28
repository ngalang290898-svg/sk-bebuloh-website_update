'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StaffCard from '@/components/StaffCard';
import GlassCard from '@/components/GlassCard';
import { Search, Filter } from 'lucide-react';
import staffData from '@/data/staff.json';
import { departmentTranslations } from '@/lib/utils';

export default function StaffPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = useMemo(() => {
    const allDepts = staffData.flatMap(staff => staff.departments);
    const uniqueDepts = [...new Set(allDepts)].sort();
    return ['all', ...uniqueDepts];
  }, []);

  const filteredStaff = useMemo(() => {
    return staffData.filter(staff => {
      const matchesSearch = staff.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.name_ms.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.role_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.role_ms.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDept = selectedDepartment === 'all' || 
                         staff.departments.includes(selectedDepartment);
      
      return matchesSearch && matchesDept;
    });
  }, [searchTerm, selectedDepartment]);

  return (
    <main className="min-h-screen bg-pastel-bg">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 to-accent-red/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-montserrat font-bold text-4xl md:text-6xl text-text-primary mb-4">
              {t('staff.directory')}
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              {language === 'ms' 
                ? 'Bertemu dengan guru dan kakitangan berdedikasi kami' 
                : 'Meet our dedicated teachers and staff members'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <GlassCard>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type="text"
                  placeholder={language === 'ms' ? 'Cari staf...' : 'Search staff...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-glass-border bg-glass-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Department Filter */}
              <div className="flex items-center space-x-3 w-full md:w-auto">
                <Filter className="text-text-secondary w-5 h-5" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-glass-border bg-glass-white focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-auto"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' 
                        ? t('staff.all')
                        : departmentTranslations[language as 'en' | 'ms'][dept as keyof typeof departmentTranslations.en] || dept
                      }
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-8 pb-20">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${searchTerm}-${selectedDepartment}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredStaff.map((staff, index) => (
                <motion.div
                  key={staff.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <StaffCard staff={staff} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredStaff.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <GlassCard>
                <p className="text-text-secondary text-lg">
                  {language === 'ms' 
                    ? 'Tiada staf ditemui. Cuba ubah carian atau penapis anda.' 
                    : 'No staff members found. Try adjusting your search or filters.'}
                </p>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
