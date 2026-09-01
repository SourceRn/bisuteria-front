import { Link } from "react-router-dom";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";
import "./Cart.css";

export default function Cart() {
  const { items, actualizarCantidad, quitarProducto, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="container cart cart--empty">
        <h1>Tu carrito está vacío</h1>
        <p>Explora nuestra tienda y encuentra tu próxima pieza.</p>
        <Button as={Link} to="/tienda" variant="lavender">
          Ir a la tienda
        </Button>
      </section>
    );
  }

  return (
    <section className="container cart">
      <h1 className="cart__title">Tu carrito</h1>

      <div className="cart__layout">
        <ul className="cart__items">
          {items.map(({ product, cantidad }) => (
            <li key={product.id} className="cart-item">
              <div className={`cart-item__thumb cart-item__thumb--${product.colorTema}`}>
                {product.imagen && (
                  <img src={product.imagen} alt={product.nombre} className="cart-item__photo" />
                )}
              </div>

              <div className="cart-item__info">
                <p className="cart-item__name">{product.nombre}</p>
                <p className="cart-item__stone">{product.piedra}</p>
              </div>

              <div className="cart-item__qty">
                <button
                  onClick={() => actualizarCantidad(product.id, cantidad - 1)}
                  aria-label="Disminuir cantidad"
                >
                  <IconMinus size={13} />
                </button>
                <span>{cantidad}</span>
                <button
                  onClick={() => actualizarCantidad(product.id, cantidad + 1)}
                  aria-label="Aumentar cantidad"
                >
                  <IconPlus size={13} />
                </button>
              </div>

              <p className="cart-item__price">${product.precio * cantidad}</p>

              <button
                className="cart-item__remove"
                onClick={() => quitarProducto(product.id)}
                aria-label={`Quitar ${product.nombre} del carrito`}
              >
                <IconX size={16} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart__summary">
          <h2>Resumen</h2>
          <div className="cart__summary-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="cart__summary-row cart__summary-row--muted">
            <span>Envío</span>
            <span>Se calcula en el pago</span>
          </div>
          <Button as={Link} to="/checkout" variant="primary" style={{ width: "100%" }}>
            Continuar al pago
          </Button>
        </aside>
      </div>
    </section>
  );
}
