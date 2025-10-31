// lib/fetchSupabaseData.ts
import { supabase } from "./supabaseClient";

/**
 * Get all staff rows from Supabase 'staff' table.
 * Returns an array of staff objects.
 */
export async function getStaffData() {
  try {
    console.log("[fetchSupabaseData] getStaffData - fetching staff rows");
    const { data, error } = await supabase
      .from("staff")
      .select("*")
      .order("role_level", { ascending: true });

    if (error) {
      console.error("[fetchSupabaseData] staff fetch error:", error);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error("[fetchSupabaseData] unexpected error", err);
    return [];
  }
}

/**
 * Get single staff by id (teacher_id or id).
 * Accepts the identifier and returns the row or null.
 */
export async function getStaffById(id: string) {
  try {
    // try teacher_id first
    let { data, error } = await supabase
      .from("staff")
      .select("*")
      .or(`teacher_id.eq.${id},id.eq.${id}`)
      .limit(1)
      .single();

    if (error) {
      // if single() returns an error we handle gracefully
      console.warn("[fetchSupabaseData] getStaffById warning:", error.message || error);
      // try a fallback select without single
      const res = await supabase
        .from("staff")
        .select("*")
        .or(`teacher_id.eq.${id},id.eq.${id}`)
        .limit(1);
      if (res.error) {
        console.error("[fetchSupabaseData] fallback getStaffById error:", res.error);
        return null;
      }
      return (res.data && res.data[0]) || null;
    }

    return data ?? null;
  } catch (err) {
    console.error("[fetchSupabaseData] getStaffById unexpected error", err);
    return null;
  }
}

/**
 * Get school metadata row for a given language ('en' or 'ms').
 * Expects a single row per language in 'school_metadata' table.
 */
export async function getSchoolMetadata(lang: string) {
  try {
    console.log("[fetchSupabaseData] getSchoolMetadata ->", lang);
    const { data, error } = await supabase
      .from("school_metadata")
      .select("*")
      .eq("lang", lang)
      .limit(1)
      .single();

    if (error) {
      console.error("[fetchSupabaseData] metadata fetch error:", error);
      return null;
    }
    return data ?? null;
  } catch (err) {
    console.error("[fetchSupabaseData] unexpected error", err);
    return null;
  }
}
