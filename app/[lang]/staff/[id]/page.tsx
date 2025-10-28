'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlassCard from '@/components/GlassCard';
import type { StaffMember } from '@/lib/types';
import Image from 'next/image';
import staffData from '@/data/staff.json';

export default function StaffProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [staff, setStaff] = useState<StaffMember | null>(null);
  const [language, setLanguage] = useState<'en' | 'ms'>('en');

  useEffect(() => {
    // Find staff member by ID
    const foundStaff = staffData.find(s => s.id === id) || null;
    setStaff(foundStaff);
    
    // Get language from localStorage or default to 'en'
    const savedLang = localStorage.getItem('skb-language') as 'en' | 'ms' | null;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, [id]);

  if (!staff) {
    return (
      <main className="min-h-screen bg-pastel-bg">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <GlassCard>
            <h2 className="font-montserrat font-bold text-2xl">Staff not found</h2>
            <p className="text-text-secondary mt-2">The staff profile you are looking for could not be found.</p>
          </GlassCard>
        </div>
        <Footer />
      </main>
    );
  }

  const isMalay = language === 'ms';

  return (
    <main className="min-h-screen bg-pastel-bg">
      <Navbar />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <GlassCard className="p-8">
            <div className="flex flex-col items-center text-center gap-6">
              {/* Profile Photo */}
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-glass-border shadow-lg">
                {staff.photo_url ? (
                  <Image 
                    src={staff.photo_url} 
                    alt={isMalay ? staff.name_ms : staff.name_en} 
                    width={160} 
                    height={160} 
                    className="object-cover w-full h-full" 
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-accent-red flex items-center justify-center text-white text-3xl">
                    {staff.name_en.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <div>
                <h1 className="font-montserrat font-bold text-3xl text-text-primary">
                  {isMalay ? staff.name_ms : staff.name_en}
                </h1>
                <p className="text-primary font-semibold mt-2">
                  {isMalay ? (staff.role_ms || staff.role_en) : staff.role_en}
                </p>
                <p className="text-text-secondary mt-1">
                  {isMalay ? staff.department_ms : staff.department_en}
                </p>
              </div>

              {/* Traits */}
              <div className="flex flex-wrap justify-center gap-2">
                {staff.traits.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t}</span>
                ))}
              </div>

              {/* Full Bios */}
              <div className="w-full text-left mt-4">
                <h3 className="font-montserrat font-semibold text-lg mb-2">Bio</h3>
                <p className="text-text-secondary leading-relaxed">
                  {isMalay ? (staff.bio_ms || staff.bio_en) : staff.bio_en}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <Footer />
    </main>
  );
}
