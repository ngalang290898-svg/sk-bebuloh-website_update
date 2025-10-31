import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ✅ Fetch all staff data (used in /staff page)
 */
export async function getStaffData() {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .order("role_level", { ascending: true });

  if (error) {
    console.error("❌ Error fetching staff data:", error.message);
    return [];
  }

  // Normalize records for consistent shape
  return data.map((s: any) => ({
    teacher_id: s.teacher_id ?? "",
    id: s.id ?? "",
    name_en: s.name_en ?? s.name ?? "",
    name_ms: s.name_ms ?? s.name ?? "",
    role_en: s.role_en ?? s.role ?? "",
    role_ms: s.role_ms ?? s.role ?? "",
    role_level: s.role_level ?? 4,
    departments: normalizeDepartments(s.departments ?? s.deparments ?? null),
    photo_url: s.photo_supabase ?? s.photo_url ?? "",
    bio_en: s.bio_en ?? "",
    bio_ms: s.bio_ms ?? "",
    traits: s.traits ?? "",
  }));
}

/**
 * ✅ Fetch individual staff by ID (used in /staff/[id] page)
 */
export async function getStaffById(id: string) {
  if (!id) return null;

  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .or(`teacher_id.eq.${id},id.eq.${id}`)
    .maybeSingle();

  if (error) {
    console.error("❌ Error fetching staff by ID:", error.message);
    return null;
  }
  if (!data) return null;

  // Normalize single record
  return {
    teacher_id: data.teacher_id ?? "",
    id: data.id ?? "",
    name_en: data.name_en ?? data.name ?? "",
    name_ms: data.name_ms ?? data.name ?? "",
    role_en: data.role_en ?? data.role ?? "",
    role_ms: data.role_ms ?? data.role ?? "",
    role_level: data.role_level ?? 4,
    departments: normalizeDepartments(data.departments ?? data.deparments ?? null),
    photo_url: data.photo_supabase ?? data.photo_url ?? "/images/staff/placeholder.jpg",
    bio_en: data.bio_en ?? "",
    bio_ms: data.bio_ms ?? "",
    traits: data.traits ?? "",
  };
}

/**
 * ✅ Fetch bilingual school metadata (used in homepage/about)
 */
export async function getSchoolMetadata(lang: string) {
  const normalizedLang = lang === "bm" ? "ms" : lang;
  const { data, error } = await supabase
    .from("school_metadata")
    .select("*")
    .eq("lang", normalizedLang)
    .maybeSingle();

  if (error) {
    console.error("❌ Error fetching school metadata:", error.message);
    return null;
  }
  return data;
}

/**
 * 🧩 Helper — Normalize department format
 */
function normalizeDepartments(value: any): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value.filter((v) => typeof v === "string");
  if (typeof value === "string") {
    return value
      .split("|")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
  }
  return [];
}
