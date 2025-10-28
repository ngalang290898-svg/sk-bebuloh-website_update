import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, language: 'en' | 'ms'): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  if (language === 'ms') {
    return date.toLocaleDateString('ms-MY', options);
  }
  
  return date.toLocaleDateString('en-US', options);
}

export const departmentTranslations = {
  en: {
    'English Department': 'English Department',
    'Administrative & Support Staff': 'Administrative & Support Staff',
    'Islamic Education Department': 'Islamic Education Department',
    'Bahasa Arab Department': 'Bahasa Arab Department',
    'Bahasa Melayu Department': 'Bahasa Melayu Department',
    'Arts Department': 'Arts Department',
    'ICT & Innovation Unit': 'ICT & Innovation Unit',
    'Mathematics Department': 'Mathematics Department',
    'Music Department': 'Music Department',
    'Pendidikan Moral Department': 'Moral Education Department',
    'Physical Education & Health (PJPK) Department': 'Physical Education & Health Department',
    'Preschool Education': 'Preschool Education',
    'RBT (Design & Technology) Department': 'Design & Technology Department',
    'Science Department': 'Science Department',
    'History (Sejarah) Department': 'History Department',
  },
  ms: {
    'English Department': 'Bahasa Inggeris',
    'Administrative & Support Staff': 'Pentadbiran & Staff Sokongan',
    'Islamic Education Department': 'Pendidikan Islam',
    'Bahasa Arab Department': 'Bahasa Arab',
    'Bahasa Melayu Department': 'Bahasa Melayu',
    'Arts Department': 'Seni Dan Visual',
    'ICT & Innovation Unit': 'Unit ICT & Inovasi',
    'Mathematics Department': 'Matematik',
    'Music Department': 'Pendidikan Muzik',
    'Pendidikan Moral Department': 'Pendidikan Moral',
    'Physical Education & Health (PJPK) Department': 'Pendidikan Jasmani & Kesihatan',
    'Preschool Education': 'Prasekolah',
    'RBT (Design & Technology) Department': 'Reka Bentuk & Teknologi',
    'Science Department': 'Sains',
    'History (Sejarah) Department': 'Sejarah',
  }
};
