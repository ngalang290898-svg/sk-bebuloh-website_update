export interface StaffRaw {
  teacher_id: string;
  name: string;
  gender?: string;
  role?: string;
  departments?: string | string[];
  bio_en?: string;
  bio_ms?: string;
  traits?: string | string[];
  photo_url?: string;
  hod_photo_url?: string;
  [key: string]: any;
}

export interface StaffMember {
  id: string;
  teacher_id?: string;
  name_en: string;
  name_ms: string;
  gender?: string;
  role_en?: string;
  role_ms?: string;
  departments: string[];
  department_en?: string;
  department_ms?: string;
  subjects?: string[];
  email?: string;
  phone?: string;
  bio_en?: string;
  bio_ms?: string;
  traits: string[];
  photo_url?: string;
  hod_photo_url?: string;
  ext_fields?: Record<string, any>;
}

export interface NewsItem {
  title_en: string;
  title_ms: string;
  date: string;
  summary_en: string;
  summary_ms: string;
}

export interface GalleryItem {
  src: string;
  caption_en: string;
  caption_ms: string;
}

export interface HomepageContent {
  school_name: string;
  motto: string;
  overview: string;
  vision: string;
  mission: string[];
  history: string[];
  philosophy: string;
  contact: {
    address: string;
    phone: string;
    fax: string;
    email: string;
    hours: string;
  };
}

export interface SchoolMetadata {
  name: string;
  code: string;
  motto: string;
  logo_url: string;
  established: number;
  type: string;
  location: string;
}
