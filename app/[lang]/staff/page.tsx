'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StaffCard from '@/components/StaffCard';
import GlassCard from '@/components/GlassCard';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { fetchStaffFromEndpoint } from '@/lib/fetchers';
import { departmentTranslations } from '@/lib/utils';
import type { StaffMember } from '@/lib/types';

export default function StaffPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStaffData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = process.env.NEXT_PUBLIC_STAFF_ENDPOINT;
      if (!endpoint) {
        throw new Error('Staff endpoint not configured');
      }
      
      const staffData = await fetchStaffFromEndpoint(endpoint);
      setStaff(staffData);
      
      if (staffData.length === 0) {
        setError('No staff data found. Please check the data source.');
      }
    } catch (err) {
      console.error('Failed to load staff data:', err);
      setError('Failed to load staff data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaffData();
  }, []);

  // Get unique departments for filter
  const departments = ['all', ...Array.from(new Set(staff.flatMap(s => s.departments)))].sort();

  // Filter staff based on search and department
  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.name_ms.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role_ms.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.traits.some(trait => trait.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = selectedDepartment === 'all' || member.departments.includes(selectedDepartment);

    return matchesSearch && matchesDept;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-pastel-bg">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <GlassCard>
            <div className="flex items-center justify-center space-x-3">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <p className="text-text-primary">Loading staff data from Google Sheets...</p>
            </div>
          </GlassCard>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-pastel-bg">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <GlassCard>
            <div className="space-y-4">
              <h2 className="font-montserrat font-bold text-2xl text-text-primary">Data Loading Error</h2>
              <p className="text-text-secondary">{error}</p>
              <button
                onClick={loadStaffData}
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-red transition-colors"
              >
                Try Again
              </button>
            </div>
          </GlassCard>
        </div>
        <Footer />
      </main>
    );
  }

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
                ? `Bertemu dengan ${staff.length} guru dan kakitangan berdedikasi kami` 
                : `Meet our ${staff.length} dedicated teachers and staff members`}
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={loadStaffData}
                className="flex items-center space-x-2 text-primary hover:text-accent-red transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">Refresh Data</span>
              </button>
            </div>
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

            {/* Results Count */}
            <div className="mt-4 text-sm text-text-secondary">
              {filteredStaff.length === staff.length 
                ? `Showing all ${staff.length} staff members`
                : `Showing ${filteredStaff.length} of ${staff.length} staff members`
              }
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
  );
}
