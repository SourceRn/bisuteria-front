import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { getMiPerfilCliente } from "../services/api";

const ClienteAuthContext = createContext(null);

export function ClienteAuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);

  async function cargarPerfil() {
    const datos = await getMiPerfilCliente();
    setPerfil(datos);
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);
      if (data.session) await cargarPerfil();
      setCargando(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nuevaSesion) => {
      setSession(nuevaSesion);
      if (nuevaSesion) {
        await cargarPerfil();
      } else {
        setPerfil(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setPerfil(null);
  }

  const value = {
    session,
    perfil,
    cargando,
    logout,
    recargarPerfil: cargarPerfil,
    establecerPerfil: setPerfil, // <- nuevo: permite fijar el perfil sin pedirlo de nuevo al backend
  };

  return <ClienteAuthContext.Provider value={value}>{children}</ClienteAuthContext.Provider>;
}

export function useClienteAuth() {
  const ctx = useContext(ClienteAuthContext);
  if (!ctx) throw new Error("useClienteAuth debe usarse dentro de ClienteAuthProvider");
  return ctx;
}