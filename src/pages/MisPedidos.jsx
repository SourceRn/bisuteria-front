import { useEffect, useState } from "react";
import { useClienteAuth } from "../context/ClienteAuthContext";
import { getMisPedidos } from "../services/api";
import Button from "../components/ui/Button";
import "./MisPedidos.css";

export default function MisPedidos() {
  const { perfil, logout } = useClienteAuth();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMisPedidos()
      .then(setPedidos)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (!perfil) {
    return (
      <section className="container mis-pedidos" style={{ textAlign: "center" }}>
        <p>Cargando tu cuenta...</p>
      </section>
    );
  }

  return (
    <section className="container mis-pedidos">
      <div className="mis-pedidos__header">
        <div>
          <h1>Hola, {perfil.nombre}</h1>
          <p className="mis-pedidos__correo">{perfil.correo}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>

      <h2 className="mis-pedidos__subtitle">Tus pedidos</h2>

      {error && <p className="mis-pedidos__error">Error: {error}</p>}

      {cargando ? (
        <p>Cargando...</p>
      ) : pedidos.length === 0 ? (
        <p className="mis-pedidos__empty">Todavía no has hecho ningún pedido.</p>
      ) : (
        <ul className="mis-pedidos__list">
          {pedidos.map((p) => (
            <li key={p.id}>
              <p className="mis-pedidos__desc">{p.descripcion}</p>
              <time>{new Date(p.fecha).toLocaleDateString()}</time>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}