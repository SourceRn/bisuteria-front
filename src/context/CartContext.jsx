import { createContext, useContext, useState, useMemo, useEffect, useRef } from "react";
import { useClienteAuth } from "./ClienteAuthContext";
import { products as catalogo } from "../data/products";
import { loadGuest, saveGuest, clearGuest, loadAccount, saveAccount } from "../utils/scopedStorage";

const CART_NAME = "cart";
const CartContext = createContext(null);

// Solo guardamos id + cantidad; el objeto "product" completo se re-arma
// consultando el catalogo, para no duplicar datos que ya viven en otro lado.
function serializeItems(items) {
  return items.map((i) => ({ productId: i.product.id, cantidad: i.cantidad }));
}

function deserializeItems(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((r) => {
      const product = catalogo.find((p) => p.id === r.productId);
      return product ? { product, cantidad: r.cantidad } : null;
    })
    .filter(Boolean);
}

// Union de dos carritos: si el mismo producto esta en ambos, se suman cantidades.
function mergeItems(a, b) {
  const map = new Map();
  [...a, ...b].forEach(({ product, cantidad }) => {
    const previo = map.get(product.id);
    map.set(product.id, { product, cantidad: (previo?.cantidad || 0) + cantidad });
  });
  return Array.from(map.values());
}

export function CartProvider({ children }) {
  const { session, perfil, cargando: cargandoAuth } = useClienteAuth();
  const [items, setItems] = useState([]);
  const scopeRef = useRef({ tipo: "guest" });
  const listoRef = useRef(false); // evita persistir antes de haber cargado el estado inicial

  // Carga inicial y fusion al iniciar/cerrar sesion
  useEffect(() => {
    if (cargandoAuth) return;
    if (session && !perfil) return; // sesion detectada pero el perfil aun no resuelve, esperamos

    if (session && perfil) {
      const cuentaGuardada = deserializeItems(loadAccount(CART_NAME, perfil.id, []));
      const invitadoGuardado = deserializeItems(loadGuest(CART_NAME, []));

      let fusionado = cuentaGuardada;
      if (invitadoGuardado.length > 0) {
        fusionado = mergeItems(cuentaGuardada, invitadoGuardado);
        saveAccount(CART_NAME, perfil.id, serializeItems(fusionado));
        clearGuest(CART_NAME);
      }

      scopeRef.current = { tipo: "cuenta", clienteId: perfil.id };
      setItems(fusionado);
    } else {
      scopeRef.current = { tipo: "guest" };
      setItems(deserializeItems(loadGuest(CART_NAME, [])));
    }
    listoRef.current = true;
  }, [session, perfil, cargandoAuth]);

  // Persiste cada cambio en la clave activa (invitado o cuenta)
  useEffect(() => {
    if (!listoRef.current) return;
    const scope = scopeRef.current;
    if (scope.tipo === "cuenta") {
      saveAccount(CART_NAME, scope.clienteId, serializeItems(items));
    } else {
      saveGuest(CART_NAME, serializeItems(items));
    }
  }, [items]);

  function agregarProducto(product, cantidad = 1) {
    setItems((prev) => {
      const existe = prev.find((i) => i.product.id === product.id);
      if (existe) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i
        );
      }
      return [...prev, { product, cantidad }];
    });
  }

  function quitarProducto(productId) {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function actualizarCantidad(productId, cantidad) {
    if (cantidad <= 0) {
      quitarProducto(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId ? { ...i, cantidad } : i
      )
    );
  }

  function vaciarCarrito() {
    setItems([]);
  }

  const totalItems = useMemo(
    () => items.reduce((acc, i) => acc + i.cantidad, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.product.precio * i.cantidad, 0),
    [items]
  );

  const value = {
    items,
    agregarProducto,
    quitarProducto,
    actualizarCantidad,
    vaciarCarrito,
    totalItems,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}