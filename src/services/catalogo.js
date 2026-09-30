const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getCatalogo() {
  const res = await fetch(`${API_URL}/productos/catalogo`);
  if (!res.ok) {
    throw new Error("No se pudo cargar el catálogo");
  }
  return res.json();
}

export async function registrarVenta(producto_id, cantidad) {
  const res = await fetch(`${API_URL}/inventario/venta-publica`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ producto_id, cantidad }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "No se pudo registrar la venta");
  }
  return res.json();
}