import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useClienteAuth } from "./ClienteAuthContext";
import { loadGuest, saveGuest, clearGuest, loadAccount, saveAccount } from "../utils/scopedStorage";

const FAV_NAME = "favorites";
const FavoritesContext = createContext(null);

function mergeFavoritos(a, b) {
  return Array.from(new Set([...a, ...b]));
}

export function FavoritesProvider({ children }) {
  const { session, perfil, cargando: cargandoAuth } = useClienteAuth();
  const [favoritos, setFavoritos] = useState([]);
  const scopeRef = useRef({ tipo: "guest" });
  const listoRef = useRef(false);

  useEffect(() => {
    if (cargandoAuth) return;
    if (session && !perfil) return;

    if (session && perfil) {
      const cuentaGuardada = loadAccount(FAV_NAME, perfil.id, []);
      const invitadoGuardado = loadGuest(FAV_NAME, []);

      let fusionado = cuentaGuardada;
      if (invitadoGuardado.length > 0) {
        fusionado = mergeFavoritos(cuentaGuardada, invitadoGuardado);
        saveAccount(FAV_NAME, perfil.id, fusionado);
        clearGuest(FAV_NAME);
      }

      scopeRef.current = { tipo: "cuenta", clienteId: perfil.id };
      setFavoritos(fusionado);
    } else {
      scopeRef.current = { tipo: "guest" };
      setFavoritos(loadGuest(FAV_NAME, []));
    }
    listoRef.current = true;
  }, [session, perfil, cargandoAuth]);

  useEffect(() => {
    if (!listoRef.current) return;
    const scope = scopeRef.current;
    if (scope.tipo === "cuenta") {
      saveAccount(FAV_NAME, scope.clienteId, favoritos);
    } else {
      saveGuest(FAV_NAME, favoritos);
    }
  }, [favoritos]);

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