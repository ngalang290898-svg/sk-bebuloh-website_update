'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { StaffMember } from '@/lib/types';
import { User, Award } from 'lucide-react';
import Image from 'next/image';

interface StaffCardProps {
  staff: StaffMember;
}

export default function StaffCard({ staff }: StaffCardProps) {
  const { language, t } = useLanguage();

  return (
    <motion.div
      className="glass-card-hover group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Staff Photo */}
      <div className="relative mb-4">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-glass-border group-hover:border-primary transition-colors">
          {staff.photo_url ? (
            <Image
              src={staff.photo_url}
              alt={language === 'ms' ? staff.name_ms : staff.name_en}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-accent-red flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
        
        {/* HOD Badge */}
        {staff.role_en?.includes('Head of Department') && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-accent-yellow text-white rounded-full p-1"
          >
            <Award className="w-4 h-4" />
          </motion.div>
        )}
      </div>

      {/* Staff Info */}
      <div className="text-center space-y-3">
        <h3 className="font-montserrat font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
          {language === 'ms' ? staff.name_ms : staff.name_en}
        </h3>
        
        <p className="text-primary font-semibold text-sm">
          {language === 'ms' ? staff.role_ms : staff.role_en}
        </p>

        {/* Primary Department */}
        <p className="text-text-secondary text-sm">
          {language === 'ms' ? staff.department_ms : staff.department_en}
        </p>

        {/* Additional Departments */}
        {staff.departments.length > 1 && (
          <div className="text-xs text-text-secondary">
            <span className="font-medium">
              {language === 'ms' ? 'Juga dalam: ' : 'Also serves in: '}
            </span>
            {staff.departments.slice(1).map(dept => 
              language === 'ms' 
                ? staff.department_ms 
                : staff.department_en
            ).join(', ')}
          </div>
        )}

        {/* Traits */}
        <div className="flex flex-wrap justify-center gap-1">
          {staff.traits.map((trait, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Bio Preview */}
        <p className="text-text-secondary text-sm line-clamp-2">
          {language === 'ms' ? staff.bio_ms : staff.bio_en}
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-2 pt-2">
          <motion.a
            href={`/staff/${staff.id}`}
            className="flex items-center space-x-1 text-primary text-sm font-semibold hover:underline"
            whileHover={{ scale: 1.05 }}
          >
            <span>{t('staff.view_profile')}</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
