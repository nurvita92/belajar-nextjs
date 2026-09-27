
"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

// Membuat context Favourite
const FavoriteContext = createContext(null);

// Provider untuk membagikan state ke seluruh aplikasi
export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Menambahkan user ke Favourite
  const addFavorite = (user) => {
    setFavorites((prevFavorites) => {
      const alreadyExists = prevFavorites.some(
        (item) => item.id === user.id
      );

      if (alreadyExists) {
        return prevFavorites;
      }

      return [...prevFavorites, user];
    });
  };

  // Menghapus user dari Favourite
  const removeFavorite = (userId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter(
        (item) => item.id !== userId
      )
    );
  };

  // Mengecek apakah user sudah di Favourite
  const isFavorite = (userId) => {
    return favorites.some(
      (item) => item.id === userId
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

// Hook untuk menggunakan Favourite di komponen lain
export function useFavorites() {
  const context = useContext(FavoriteContext);

  if (context === null) {
    throw new Error(
      "useFavorites harus digunakan di dalam FavoriteProvider"
    );
  }

  return context;
}