const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Crea un cliente nuevo, o si el correo ya existe (409), reutiliza el existente.
// Devuelve el id del cliente en ambos casos.
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
    const buscarRes = await fetch(`${API_URL}/clientes?buscar=${encodeURIComponent(correo)}`);
    if (!buscarRes.ok) throw new Error("No se pudo verificar el cliente existente");

    const resultados = await buscarRes.json();
    const encontrado = resultados.find(
      (c) => c.correo.toLowerCase() === correo.toLowerCase()
    );

    if (!encontrado) throw new Error("No se encontró el cliente existente");
    return encontrado.id;
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