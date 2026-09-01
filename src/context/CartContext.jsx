import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { product, cantidad }

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
