import { createClient } from "@/lib/supabase/server";

export async function findAllFavorites() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select(`
      *,
      app_users!favorites_user_id_fkey (
        id,
        name,
        email,
        company_name
      )
    `);
  if (error) throw new Error(error.message);
  return data;
}

export async function findFavoriteById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", id)
    .limit(1)          // aman walau masih ada data dobel
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function insertFavorite(payload) {
  const supabase = await createClient();

  // Kalau sudah pernah ditambahkan, kembalikan data lama (tanpa error)
  const existing = await findFavoriteById(payload.user_id);
  if (existing) return existing;

  const { data, error } = await supabase
    .from("favorites")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    // 23505 = unique violation (kalau ada request ganda bersamaan)
    if (error.code === "23505") {
      const again = await findFavoriteById(payload.user_id);
      if (again) return again;
    }
    console.error("SUPABASE FAVORITE ERROR:", error);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteFavoriteById(id) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", id);
  if (error) throw new Error(error.message);
  return true;
}