// lib/fetchSupabaseData.ts
import { supabase } from "./supabaseClient";

export async function getStaffData() {
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .order("role_level", { ascending: true });

  if (error) {
    console.error("Supabase staff fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getSchoolMetadata(lang: string) {
  const { data, error } = await supabase
    .from("school_metadata")
    .select("*")
    .eq("lang", lang)
    .single();

  if (error) {
    console.error("Supabase metadata fetch error:", error.message);
    return null;
  }
  return data;
}
