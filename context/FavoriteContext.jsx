"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET - mengambil semua favorite dari API
  useEffect(() => {
    async function loadFavorites() {
      try {
        const response = await fetch("/api/favorites");

        if (!response.ok) {
          throw new Error("Gagal mengambil favorites");
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("GET favorites error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  // POST - menambahkan favorite
  async function addFavorite(user) {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          company: user.company?.name || "",
          note: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
  if (response.status === 409) {
    await fetchFavorites();
    return;
  }

  console.log(
    "POST gagal:",
    data?.error || `HTTP ${response.status}`
  );
  return;
}

      setFavorites((currentFavorites) => [
        ...currentFavorites,
        data,
      ]);
    } catch (error) {
      console.error("Add favorite error:", error);
    }
  }

  // PATCH - mengubah data favorite
  async function updateFavorite(id, updates) {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("PATCH error:", data.error);
        return;
      }

      setFavorites((currentFavorites) =>
        currentFavorites.map((favorite) =>
          favorite.id === id ? data : favorite
        )
      );
    } catch (error) {
      console.error("Update favorite error:", error);
    }
  }

  // DELETE - menghapus favorite
  
async function removeFavorite(id) {
  try {
    const response = await fetch(`/api/favorites/${id}`, {
      method: "DELETE",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
  console.log(
    "DELETE gagal:",
    data?.error || `HTTP ${response.status}`
  );
  return;
}

    setFavorites((currentFavorites) =>
      currentFavorites.filter(
        (favorite) => favorite.id !== id
      )
    );

    console.log("Favorite berhasil dihapus:", data);
  } catch (error) {
    console.error("Remove favorite error:", error);
  }
}

  // Mengecek apakah user sudah menjadi favorite
  function isFavorite(id) {
    return favorites.some(
      (favorite) => favorite.id === id
    );
  }

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        loading,
        addFavorite,
        updateFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (context === null) {
    throw new Error(
      "useFavorites harus digunakan di dalam FavoriteProvider"
    );
  }

  return context;
}