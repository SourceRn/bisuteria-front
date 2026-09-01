import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]); // array de product.id

  function toggleFavorito(productId) {
    setFavoritos((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }

  function esFavorito(productId) {
    return favoritos.includes(productId);
  }

  return (
    <FavoritesContext.Provider value={{ favoritos, toggleFavorito, esFavorito }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}