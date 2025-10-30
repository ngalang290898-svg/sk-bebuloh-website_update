// lib/fetchers.ts
export type RawStaff = {
  teacher_id?: string;
  id?: string;
  name?: string;
  name_en?: string;
  name_ms?: string;
  gender?: string;
  role?: string;
  role_en?: string;
  role_ms?: string;
  role_level?: string | number;
  departments?: string | string[];
  department_en?: string;
  department_ms?: string;
  bio_en?: string;
  bio_ms?: string;
  traits?: string[];
  photo?: string;
  photo_url?: string;
};

export async function getStaffData(): Promise<RawStaff[]> {
  const SHEET_URL = process.env.OPEN_SHEET_URL || "";
  if (SHEET_URL) {
    try {
      const res = await fetch(SHEET_URL, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error("OpenSheet fetch failed");
      const data = await res.json();
      if (Array.isArray(data)) return data;
    } catch (err) {
      console.warn("OpenSheet fetch failed, falling back to local JSON:", err);
    }
  }

  // ✅ Local JSON fallback with flexible department type
  try {
    const local = (await import("@/data/staff-data.json")).default;
    if (Array.isArray(local)) {
      // Normalize departments array → string joined by "|"
      const normalized = local.map((entry: any) => ({
        ...entry,
        departments: Array.isArray(entry.departments)
          ? entry.departments.join(" | ")
          : entry.departments,
        photo: entry.photo || entry.photo_url || "",
        role: entry.role || entry.role_en || "",
        name: entry.name || entry.name_en || "",
        bio_en: entry.bio_en || "",
        bio_ms: entry.bio_ms || "",
      }));
      return normalized;
    }
  } catch (err) {
    console.error("No staff data found locally", err);
  }

  return [];
}

export async function getStaffById(id: string) {
  const all = await getStaffData();
  if (!all || all.length === 0) return null;

  const slugify = (s?: string) =>
    s ? s.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : "";

  const found = all.find((r) => {
    const rid = (r.teacher_id ?? r.id ?? "").toString();
    if (rid && rid === id) return true;
    if (r.name && slugify(r.name) === id) return true;
    return false;
  });
  return found ?? null;
}
