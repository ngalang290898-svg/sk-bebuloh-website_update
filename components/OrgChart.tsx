'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { StaffMember } from '@/lib/types';
import Image from 'next/image';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface OrgChartProps {
  staff: StaffMember[];
}

export default function OrgChart({ staff }: OrgChartProps) {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const groups = useMemo(() => {
    const map = new Map<string, StaffMember[]>();
    staff.forEach(s => {
      const key = s.department_en || 'Others';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(s);
    });
    return Array.from(map.entries()).map(([dept, members]) => ({ dept, members }));
  }, [staff]);

  const toggle = (dept: string) => {
    setExpanded(prev => ({ ...prev, [dept]: !prev[dept] }));
  };

  return (
    <section aria-label={language === 'ms' ? 'Carta Organisasi' : 'Organisation Chart'} className="py-12">
      <div className="overflow-x-auto no-scrollbar">
        <div className="min-w-[1200px] flex items-start space-x-8 px-4">
          {groups.map((g) => (
            <div key={g.dept} className="flex-shrink-0 w-[320px]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-montserrat font-semibold text-lg text-text-primary">
                  {language === 'ms' ? g.dept : g.dept}
                </h3>
                <button
                  aria-expanded={!!expanded[g.dept]}
                  onClick={() => toggle(g.dept)}
                  className="p-1 rounded-md hover:bg-primary/10"
                >
                  {expanded[g.dept] ? <ChevronDown /> : <ChevronRight />}
                </button>
              </div>

              <motion.div
                initial={{ height: expanded[g.dept] ? 'auto' : 0, opacity: expanded[g.dept] ? 1 : 0.85 }}
                animate={{ height: expanded[g.dept] ? 'auto' : 140, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="glass-effect rounded-xl p-4"
              >
                <div className="flex flex-col gap-3">
                  {g.members.slice(0, expanded[g.dept] ? g.members.length : 4).map(member => (
                    <button
                      key={member.id}
                      onClick={() => window.location.href = `/staff/${member.id}`}
                      className="flex items-center gap-3 w-full text-left rounded-lg p-2 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-glass-border">
                        {member.photo_url ? (
                          <Image src={member.photo_url} alt={language === 'ms' ? member.name_ms : member.name_en} width={48} height={48} className="object-cover w-full h-full" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-accent-red flex items-center justify-center text-white">
                            {member.name_en.split(' ').map(n => n[0]).slice(0,2).join('')}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="font-medium text-text-primary">
                          {language === 'ms' ? member.name_ms : member.name_en}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {language === 'ms' ? member.role_ms || member.role_en : member.role_en}
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* show "more" if collapsed and more members exist */}
                  {!expanded[g.dept] && g.members.length > 4 && (
                    <div className="text-center mt-2">
                      <button onClick={() => toggle(g.dept)} className="text-sm text-primary font-semibold">
                        {language === 'ms' ? 'Lihat lagi...' : 'View more...'}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
