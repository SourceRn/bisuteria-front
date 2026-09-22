import { supabase } from "./supabase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function obtenerOCrearCliente({ nombre, correo, telefono }) {
  const res = await fetch(`${API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo, telefono }),
  });

  if (res.status === 201) {
    const cliente = await res.json();
    return cliente.id;
  }

  if (res.status === 409) {
    const verificarRes = await fetch(`${API_URL}/clientes/existe?correo=${encodeURIComponent(correo)}`);
    if (!verificarRes.ok) throw new Error("No se pudo verificar el cliente existente");

    const resultado = await verificarRes.json();
    if (!resultado.existe) throw new Error("No se encontró el cliente existente");

    return resultado.id;
  }

  const data = await res.json().catch(() => ({}));
  throw new Error(data.error || "No se pudo crear el cliente");
}

// Registra una interaccion (en este caso, un pedido) para un cliente ya existente.
export async function crearInteraccion({ cliente_id, tipo, descripcion }) {
  const res = await fetch(`${API_URL}/interacciones`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cliente_id, tipo, descripcion }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "No se pudo registrar el pedido");
  }

  return res.json();
}

// ==========================
// Cuentas de cliente
// ==========================

export async function iniciarSesionCliente(correo, password) {
  const { error } = await supabase.auth.signInWithPassword({ email: correo, password });
  if (error) throw new Error(error.message);
}

export async function registrarCliente(correo, password) {
  const { data, error } = await supabase.auth.signUp({ email: correo, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function cerrarSesionCliente() {
  await supabase.auth.signOut();
}

export async function vincularCuenta({ nombre, telefono }) {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const res = await fetch(`${API_URL}/clientes/vincular-cuenta`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ nombre, telefono }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "No se pudo vincular la cuenta");
  }
  return res.json();
}

export async function getMiPerfilCliente() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) return null;

  const res = await fetch(`${API_URL}/clientes/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getMisPedidos() {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  const res = await fetch(`${API_URL}/clientes/me/pedidos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "No se pudieron cargar tus pedidos");
  }
  return res.json();
}