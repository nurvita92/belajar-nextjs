"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { useAuth } from "@/context/AuthContext";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const { isLoggedIn } = useAuth();

  // Favorite yang tampil di sesi ini (selalu mulai dari kosong)
  const [favorites, setFavorites] = useState([]);

  // Penghitung hanya untuk sesi saat ini
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [sessionAddedIds, setSessionAddedIds] = useState([]);

  const [loadingFavorites, setLoadingFavorites] = useState(false);
  // Reset ke 0 kalau status login berubah (login/logout).
// Saat refresh, state otomatis mulai dari kosong.
const [prevLoggedIn, setPrevLoggedIn] = useState(isLoggedIn);

if (prevLoggedIn !== isLoggedIn) {
  setPrevLoggedIn(isLoggedIn);
  setFavorites([]);
  setFavoriteCount(0);
  setSessionAddedIds([]);
}

  const addFavorite = useCallback(
    async (user) => {
      if (!isLoggedIn) {
        alert("Silakan login terlebih dahulu.");
        return;
      }

      const userId = Number(user.id);

      // Jika sudah tampil di sesi ini, jangan kirim duplikat.
      if (favorites.some((item) => Number(item.user_id) === userId)) {
        return;
      }

      // Tampilkan perubahan secara langsung
      setFavorites((prev) => {
        if (prev.some((item) => Number(item.user_id) === userId)) {
          return prev;
        }

        return [...prev, { user_id: userId, user }];
      });

      setSessionAddedIds((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
      setFavoriteCount((prev) => prev + 1);

      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!res.ok) {
          const result = await res.json().catch(() => ({}));

          // Sudah ada di Supabase, anggap berhasil.
          // Biarkan tetap tampil di sesi ini tanpa memuat ulang dari database.
          if (
            res.status === 400 &&
            result.error?.includes("sudah difavoritkan")
          ) {
            return;
          }

          throw new Error(result.error || "Gagal menyimpan favorite");
        }
      } catch (error) {
        console.error("Add favorite error:", error);

        setFavorites((prev) =>
          prev.filter((item) => Number(item.user_id) !== userId)
        );

        setSessionAddedIds((prev) => prev.filter((id) => id !== userId));

        setFavoriteCount((prev) => Math.max(0, prev - 1));

        alert("Favorite gagal disimpan. Silakan coba lagi.");
      }
    },
    [isLoggedIn, favorites]
  );

  const removeFavorite = useCallback(
    async (userId) => {
      if (!isLoggedIn) {
        alert("Silakan login terlebih dahulu.");
        return;
      }

      userId = Number(userId);

      const existing = favorites.find(
        (item) => Number(item.user_id) === userId
      );

      if (!existing) return;

      const wasAddedThisSession = sessionAddedIds.includes(userId);

      // Hilangkan dari tampilan langsung
      setFavorites((prev) =>
        prev.filter((item) => Number(item.user_id) !== userId)
      );

      if (wasAddedThisSession) {
        setSessionAddedIds((prev) => prev.filter((id) => id !== userId));
        setFavoriteCount((prev) => Math.max(0, prev - 1));
      }

      try {
        const res = await fetch(`/api/favorites/${userId}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const result = await res.json().catch(() => ({}));
          throw new Error(result.error || "Gagal menghapus favorite");
        }
      } catch (error) {
        console.error("Remove favorite error:", error);

        setFavorites((prev) => {
          if (prev.some((item) => Number(item.user_id) === userId)) {
            return prev;
          }

          return [...prev, existing];
        });

        if (wasAddedThisSession) {
          setSessionAddedIds((prev) =>
            prev.includes(userId) ? prev : [...prev, userId]
          );
          setFavoriteCount((prev) => prev + 1);
        }

        alert("Favorite gagal dihapus. Silakan coba lagi.");
      }
    },
    [isLoggedIn, favorites, sessionAddedIds]
  );

  const isFavorite = useCallback(
    (userId) =>
      isLoggedIn &&
      favorites.some((item) => Number(item.user_id) === Number(userId)),
    [favorites, isLoggedIn]
  );

  const value = {
    favorites: isLoggedIn ? favorites : [],
    favoriteCount: isLoggedIn ? favoriteCount : 0,
    loadingFavorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);

  if (context === undefined) {
    throw new Error("useFavorite harus dipakai di dalam <FavoriteProvider>");
  }

  return context;
}