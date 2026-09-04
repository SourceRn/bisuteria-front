import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { obtenerOCrearCliente, crearInteraccion } from "../services/api";
import Button from "../components/ui/Button";
import "./Checkout.css";

export default function Checkout() {
  const { items, subtotal, vaciarCarrito } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "" });
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [completado, setCompletado] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const clienteId = await obtenerOCrearCliente(form);

      const descripcionPedido = items
        .map((i) => `${i.cantidad}x ${i.product.nombre}`)
        .join(", ");

      await crearInteraccion({
        cliente_id: clienteId,
        tipo: "Pedido",
        descripcion: `${descripcionPedido} — Total: $${subtotal}`,
      });

      vaciarCarrito();
      setCompletado(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  if (completado) {
    return (
      <section className="container checkout checkout--success">
        <h1>¡Gracias por tu pedido!</h1>
        <p>
          Registramos tu pedido y en breve empezamos a elaborarlo. Te contactaremos
          a tu correo con los siguientes pasos.
        </p>
        <Button as={Link} to="/tienda" variant="lavender">
          Seguir explorando
        </Button>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container checkout checkout--empty">
        <h1>Tu carrito está vacío</h1>
        <p>Agrega alguna pieza antes de continuar al pago.</p>
        <Button as={Link} to="/tienda" variant="lavender">
          Ir a la tienda
        </Button>
      </section>
    );
  }

  return (
    <section className="container checkout">
      <h1 className="checkout__title">Finalizar pedido</h1>

      <div className="checkout__layout">
        <form className="checkout__form" onSubmit={handleSubmit}>
          <label>
            Nombre completo
            <input
              type="text"
              name="nombre"
              required
              minLength={2}
              value={form.nombre}
              onChange={handleChange}
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="correo"
              required
              value={form.correo}
              onChange={handleChange}
            />
          </label>

          <label>
            Teléfono
            <input
              type="tel"
              name="telefono"
              required
              minLength={7}
              value={form.telefono}
              onChange={handleChange}
            />
          </label>

          {error && <p className="checkout__error">{error}</p>}

          <Button type="submit" variant="lavender" disabled={enviando}>
            {enviando ? "Enviando..." : "Confirmar pedido"}
          </Button>
        </form>

        <aside className="checkout__summary">
          <h2>Tu pedido</h2>
          <ul className="checkout__items">
            {items.map(({ product, cantidad }) => (
              <li key={product.id}>
                <span>
                  {cantidad}x {product.nombre}
                </span>
                <span>${product.precio * cantidad}</span>
              </li>
            ))}
          </ul>
          <div className="checkout__total">
            <span>Total</span>
            <span>${subtotal}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}