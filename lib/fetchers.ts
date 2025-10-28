import type { StaffRaw, StaffMember } from './types';

const DEPARTMENT_TRANSLATIONS: Record<string, string> = {
  English: 'Bahasa Inggeris',
  'English Department': 'Bahagian Bahasa Inggeris',
  Malay: 'Bahasa Melayu',
  'Mathematics': 'Matematik',
  'Science': 'Sains',
  ICT: 'Teknologi Maklumat',
  'Physical Education': 'Pendidikan Jasmani',
  'Co-curriculum': 'Kokurikulum',
  Administration: 'Pentadbiran',
  Discipline: 'Disiplin',
  Library: 'Pusat Sumber',
  Counselling: 'Bimbingan & Kaunseling',
  'Support Staff': 'Kakitangan Sokongan',
  'Headmaster Office': 'Pejabat Guru Besar',
};

export function extractDriveId(url?: string): string | null {
  if (!url) return null;
  try {
    const idMatch = url.match(/(?:id=|\/d\/)([A-Za-z0-9_-]{10,})/);
    if (idMatch && idMatch[1]) return idMatch[1];
    const parts = url.split('/');
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      if (/^[A-Za-z0-9_-]{10,}$/.test(p)) return p;
    }
    return null;
  } catch (e) {
    return null;
  }
}

function normalizeDepartments(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);
  return String(value)
    .split(/[,\/&;]| and | \+ /i)
    .map(s => s.trim())
    .filter(Boolean);
}

function mapPrimaryDepartment(departments: string[]): { department_en?: string; department_ms?: string } {
  if (!departments || departments.length === 0) return {};
  const primary = departments[0];
  const translated = DEPARTMENT_TRANSLATIONS[primary] || DEPARTMENT_TRANSLATIONS[primary.replace(/ Department$/i, '')] || primary;
  return { department_en: primary, department_ms: translated };
}

export function normalizeStaff(raw: StaffRaw): StaffMember {
  const departments = normalizeDepartments(raw.departments as any);
  const { department_en, department_ms } = mapPrimaryDepartment(departments);

  const traitsArr: string[] = raw.traits
    ? Array.isArray(raw.traits)
      ? raw.traits.map(String)
      : String(raw.traits).split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const driveId = extractDriveId(raw.photo_url || raw.hod_photo_url || '');

  const photo_url = raw.photo_url || (driveId ? `https://drive.google.com/uc?export=view&id=${driveId}` : undefined);

  const staff: StaffMember = {
    id: raw.teacher_id || raw.teacher_id || (raw.teacher_id ?? String(Math.random()).slice(2, 8)),
    teacher_id: raw.teacher_id,
    name_en: raw.name || raw.name_en || '',
    name_ms: raw.name || raw.name_ms || '',
    gender: raw.gender,
    role_en: raw.role || raw.role_en || '',
    role_ms: raw.role || raw.role_ms || '',
    departments,
    department_en,
    department_ms,
    bio_en: raw.bio_en || '',
    bio_ms: raw.bio_ms || '',
    traits: traitsArr,
    photo_url,
    hod_photo_url: raw.hod_photo_url,
    ext_fields: Object.keys(raw).reduce((acc: Record<string, any>, k) => {
      if (![
        'teacher_id','name','name_en','name_ms','gender','role','role_en','role_ms',
        'departments','bio_en','bio_ms','traits','photo_url','hod_photo_url'
      ].includes(k)) {
        acc[k] = (raw as any)[k];
      }
      return acc;
    }, {}),
  };

  return staff;
}

export async function loadStaffFromLocal(): Promise<StaffMember[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data: StaffRaw[] = require('../data/staff.json');
    return data.map(normalizeStaff);
  } catch (e) {
    return [];
  }
}

export async function fetchStaffFromEndpoint(endpoint: string): Promise<StaffMember[]> {
  if (!endpoint) return [];
  try {
    const res = await fetch(endpoint);
    if (!res.ok) return [];
    const json: StaffRaw[] = await res.json();
    return json.map(normalizeStaff);
  } catch (e) {
    return [];
  }
}
