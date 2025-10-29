// Purpose: Fetch and normalize staff data from Google Apps Script with automatic fallback
// BM: Tujuan: Ambil dan normalisasikan data staf dari Google Apps Script dengan fallback automatik

import type { StaffRaw, StaffMember } from './types';

/* -------------------------------------------------------------------------- */
/*                                TRANSLATIONS                                */
/* -------------------------------------------------------------------------- */

const DEPARTMENT_TRANSLATIONS: Record<string, string> = {
  // English → Malay
  'English Department': 'Jabatan Bahasa Inggeris',
  'Administrative & Support Staff': 'Kakitangan Pentadbiran & Sokongan',
  'Islamic Education Department': 'Jabatan Pendidikan Islam',
  'Bahasa Arab Department': 'Jabatan Bahasa Arab',
  'Bahasa Melayu Department': 'Jabatan Bahasa Melayu',
  'Arts Department': 'Jabatan Seni',
  'ICT & Innovation Unit': 'Unit ICT & Inovasi',
  'Mathematics Department': 'Jabatan Matematik',
  'Music Department': 'Jabatan Muzik',
  'Pendidikan Moral Department': 'Jabatan Pendidikan Moral',
  'Physical Education & Health (PJPK) Department': 'Jabatan Pendidikan Jasmani & Kesihatan',
  'Preschool Education': 'Pendidikan Prasekolah',
  'RBT (Design & Technology) Department': 'Jabatan Reka Bentuk & Teknologi',
  'Science Department': 'Jabatan Sains',
  'History (Sejarah) Department': 'Jabatan Sejarah',

  // Roles
  'Head of Department': 'Ketua Panitia',
  'Teacher': 'Guru',
  'Headmaster': 'Guru Besar',
  'Senior Assistant (Curriculum)': 'Penolong Kanan Kurikulum',
  'Senior Assistant (Student Affairs)': 'Penolong Kanan Hal Ehwal Murid',
  'Senior Assistant (Co-curricular)': 'Penolong Kanan Kokurikulum',
  'Chief Clerk': 'Ketua Kerani',
  'General Office Assistant': 'Pembantu Am Pejabat',
  'Administrative Assistant (P/O)': 'Pembantu Tadbir (P/O)',
  'Preschool Teacher': 'Guru Prasekolah',
  'Preschool Assistant': 'Pembantu Prasekolah'
};

/* -------------------------------------------------------------------------- */
/*                              HELPER FUNCTIONS                              */
/* -------------------------------------------------------------------------- */

export function extractDriveId(url?: string): string | null {
  if (!url) return null;
  try {
    const idMatch = url.match(/(?:id=|\/d\/)([A-Za-z0-9_-]{10,})/);
    return idMatch ? idMatch[1] : null;
  } catch {
    return null;
  }
}

function normalizeDepartments(value?: string | string[]): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);

  return String(value)
    .split(/[,\/&;]| and | \+ | \| /i)
    .map(s => s.trim())
    .filter(Boolean)
    .filter(dept => !dept.match(/^(http|https):\/\//));
}

function mapPrimaryDepartment(departments: string[]): { department_en?: string; department_ms?: string } {
  if (!departments || departments.length === 0) return {};
  const primary = departments[0];
  const translated = DEPARTMENT_TRANSLATIONS[primary] || primary;
  return { department_en: primary, department_ms: translated };
}

function translateRole(roleEn?: string): string {
  if (!roleEn) return 'Guru';
  return DEPARTMENT_TRANSLATIONS[roleEn] || roleEn;
}

/* -------------------------------------------------------------------------- */
/*                             NORMALIZATION CORE                             */
/* -------------------------------------------------------------------------- */

export function normalizeStaff(raw: StaffRaw): StaffMember {
  const departments = normalizeDepartments(raw.departments as any);
  const { department_en, department_ms } = mapPrimaryDepartment(departments);

  const traitsArr: string[] = raw.traits
    ? Array.isArray(raw.traits)
      ? raw.traits.map(String)
      : String(raw.traits).split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const driveId = extractDriveId(raw.photo_url);
  const photo_url =
    raw.photo_url || (driveId ? `https://drive.google.com/uc?export=view&id=${driveId}` : undefined);

  const name_en = raw.name_en || raw.name || '';
  const name_ms = raw.name_ms || raw.name || '';

  const role_en = raw.role_en || raw.role || '';
  const role_ms = raw.role_ms || translateRole(role_en);

  const staff: StaffMember = {
    id: raw.teacher_id || `temp_${Math.random().toString(36).substr(2, 9)}`,
    teacher_id: raw.teacher_id,
    name_en: name_en.trim(),
    name_ms: name_ms.trim(),
    gender: raw.gender,
    role_en,
    role_ms,
    departments,
    department_en,
    department_ms,
    bio_en: raw.bio_en || '',
    bio_ms: raw.bio_ms || '',
    traits: traitsArr,
    photo_url,
    hod_photo_url: raw.hod_photo_url,
    ext_fields: Object.keys(raw).reduce((acc: Record<string, any>, k) => {
      if (
        ![
          'teacher_id', 'name', 'name_en', 'name_ms', 'gender', 'role', 'role_en', 'role_ms',
          'departments', 'bio_en', 'bio_ms', 'traits', 'photo_url', 'hod_photo_url'
        ].includes(k)
      ) {
        acc[k] = (raw as any)[k];
      }
      return acc;
    }, {}),
  };

  return staff;
}

/* -------------------------------------------------------------------------- */
/*                          MAIN FETCH + FALLBACK LOGIC                       */
/* -------------------------------------------------------------------------- */

export async function fetchStaffFromEndpoint(endpoint: string): Promise<StaffMember[]> {
  if (!endpoint) {
    console.warn('⚠️ No staff endpoint configured');
    return [];
  }

  try {
    console.log('🔄 Fetching staff data from:', endpoint);

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store'
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const json: StaffRaw[] = await res.json();
    console.log(`✅ Fetched ${json.length} staff records`);

    const normalized = json.map(normalizeStaff);
    const unique = normalized.filter(
      (staff, i, arr) => i === arr.findIndex(s => s.id === staff.id)
    );

    console.log(`✨ Normalized to ${unique.length} unique staff records`);
    return unique;
  } catch (e) {
    console.error('❌ Failed to fetch from Google Apps Script:', e);
    console.warn('⚠️ Falling back to local staff-data.json...');
    return loadStaffFromLocal(); // automatic fallback
  }
}

/* -------------------------------------------------------------------------- */
/*                                 LOCAL DATA                                 */
/* -------------------------------------------------------------------------- */

export async function loadStaffFromLocal(): Promise<StaffMember[]> {
  try {
    const staffData = require('../data/staff-data.json'); // local fallback file
    const normalized = staffData.map(normalizeStaff);
    console.log(`📦 Loaded ${normalized.length} staff records from local file`);
    return normalized;
  } catch (e) {
    console.error('❌ Failed to load local staff-data.json', e);
    return [];
  }
}
