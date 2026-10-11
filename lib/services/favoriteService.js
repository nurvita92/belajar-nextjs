import {
  findAllFavorites,
  findFavoriteById,
  insertFavorite,
  deleteFavoriteById,
} from "@/lib/repositories/favoriteRepository";
import { validateFavoriteInput } from "@/lib/validations/favoriteValidation";

export async function getAllFavorites() {
  return await findAllFavorites();
}

export async function addFavorite(body) {
  const validation = validateFavoriteInput(body);
  if (!validation.valid) {
    return { success: false, status: 400, error: validation.error };
  }

  // Kalau sudah pernah difavoritkan, kembalikan data lama sebagai sukses
  const alreadyExists = await findFavoriteById(body.user_id);
  if (alreadyExists) {
    return { success: true, status: 200, data: alreadyExists };
  }

  const saved = await insertFavorite(body);
  return { success: true, status: 201, data: saved };
}

export async function removeFavorite(id) {
  const deleted = await deleteFavoriteById(id);
  if (!deleted) {
    return { success: false, status: 404, error: "Data tidak ditemukan" };
  }

  return { success: true, status: 200, message: "Berhasil dihapus" };
}