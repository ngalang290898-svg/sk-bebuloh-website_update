// /types/index.ts
// Type definitions for SK Bebuloh website data structures

export interface StaffMember {
  id: string;
  name_en: string;
  name_ms?: string;
  role_en: string;
  role_ms?: string;
  department_en: string;
  department_ms?: string;
  photo_url?: string;
  traits?: string[];
  bio_en?: string;
  bio_ms?: string;
}
