import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { iniciarSesionCliente, registrarCliente, vincularCuenta } from "../services/api";
import { useClienteAuth } from "../context/ClienteAuthContext";
import Button from "../components/ui/Button";
import "./Cuenta.css";

export default function Cuenta() {
  const navigate = useNavigate();
  const { recargarPerfil } = useClienteAuth();
  const [modo, setModo] = useState("login"); // "login" | "registro"
  const [form, setForm] = useState({ nombre: "", correo: "", telefono: "", password: "" });
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      if (modo === "login") {
        await iniciarSesionCliente(form.correo, form.password);
      } else {
        await registrarCliente(form.correo, form.password);
        await vincularCuenta({ nombre: form.nombre, telefono: form.telefono });
      }
      await recargarPerfil();
      navigate("/cuenta/pedidos");
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <section className="container cuenta">
      <div className="cuenta__card">
        <h1 className="cuenta__title">{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h1>

        <form className="cuenta__form" onSubmit={handleSubmit}>
          {modo === "registro" && (
            <>
              <label>
                Nombre completo
                <input type="text" name="nombre" required value={form.nombre} onChange={handleChange} />
              </label>
              <label>
                Teléfono
                <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} />
              </label>
            </>
          )}

          <label>
            Correo electrónico
            <input type="email" name="correo" required value={form.correo} onChange={handleChange} />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange}
            />
          </label>

          {error && <p className="cuenta__error">{error}</p>}

          <Button type="submit" variant="lavender" disabled={cargando}>
            {cargando ? "Espera..." : modo === "login" ? "Entrar" : "Crear cuenta"}
          </Button>
        </form>

        <button className="cuenta__toggle" onClick={() => setModo(modo === "login" ? "registro" : "login")}>
          {modo === "login" ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </section>
  );
}