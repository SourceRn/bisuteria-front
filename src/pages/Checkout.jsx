import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useClienteAuth } from "../context/ClienteAuthContext";
import { obtenerOCrearCliente, crearInteraccion, registrarCliente, vincularCuenta } from "../services/api";
import Button from "../components/ui/Button";
import "./Checkout.css";
import PasswordInput from "../components/ui/PasswordInput";

export default function Checkout() {
  const { items, subtotal, vaciarCarrito } = useCart();
  const { perfil, establecerPerfil } = useClienteAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "" });
  const [crearCuenta, setCrearCuenta] = useState(false);
  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);
  const [completado, setCompletado] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function descripcionPedido() {
    return items.map((i) => `${i.cantidad}x ${i.product.nombre}`).join(", ");
  }

  async function handleSubmitConSesion(e) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      await crearInteraccion({
        cliente_id: perfil.id,
        tipo: "Pedido",
        descripcion: `${descripcionPedido()} — Total: $${subtotal}`,
      });
      vaciarCarrito();
      setCompletado(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  async function handleSubmitInvitado(e) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      let clienteId;

      if (crearCuenta) {
        await registrarCliente(form.correo, password);
        const cliente = await vincularCuenta({ nombre: form.nombre, telefono: form.telefono });
        clienteId = cliente.id;
        establecerPerfil(cliente);
      } else {
        clienteId = await obtenerOCrearCliente(form);
      }

      await crearInteraccion({
        cliente_id: clienteId,
        tipo: "Pedido",
        descripcion: `${descripcionPedido()} — Total: $${subtotal}`,
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
        {perfil ? (
          <form className="checkout__form" onSubmit={handleSubmitConSesion}>
            <p className="checkout__logged-as">
              Comprando como <strong>{perfil.correo}</strong>
            </p>

            {error && <p className="checkout__error">{error}</p>}

            <Button type="submit" variant="lavender" disabled={enviando}>
              {enviando ? "Enviando..." : "Confirmar pedido"}
            </Button>
          </form>
        ) : (
          <form className="checkout__form" onSubmit={handleSubmitInvitado}>
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

            <label className="checkout__checkbox">
              <input
                type="checkbox"
                checked={crearCuenta}
                onChange={(e) => setCrearCuenta(e.target.checked)}
              />
              Crear una cuenta con estos datos para futuras compras
            </label>

            {crearCuenta && (
              <label>
                Contraseña
                <PasswordInput
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            )}

            {error && <p className="checkout__error">{error}</p>}

            <Button type="submit" variant="lavender" disabled={enviando}>
              {enviando ? "Enviando..." : "Confirmar pedido"}
            </Button>
          </form>
        )}

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