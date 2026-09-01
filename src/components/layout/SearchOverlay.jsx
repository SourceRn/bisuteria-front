import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconSearch, IconX } from "@tabler/icons-react";
import { products } from "../../data/products";
import "./SearchOverlay.css";

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Enfoca el input automaticamente al abrir
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Cierra con Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const termino = query.trim().toLowerCase();

  const resultados = termino
    ? products
        .filter(
          (p) =>
            p.nombre.toLowerCase().includes(termino) ||
            p.piedra.toLowerCase().includes(termino) ||
            p.categoria.toLowerCase().includes(termino) ||
            p.intencion.toLowerCase().includes(termino)
        )
        .slice(0, 4)
    : [];

  function verTodos() {
    navigate(`/tienda?buscar=${encodeURIComponent(query.trim())}`);
    onClose();
    setQuery("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (termino) verTodos();
  }

  return (
    <>
      <div className="search-overlay__backdrop" onClick={onClose} />
      <div className="search-overlay">
        <form className="search-overlay__form" onSubmit={handleSubmit}>
          <IconSearch size={18} stroke={1.6} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar por nombre, piedra o intención..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" onClick={onClose} aria-label="Cerrar búsqueda">
            <IconX size={18} stroke={1.6} />
          </button>
        </form>

        {termino && (
          <div className="search-overlay__results">
            {resultados.length === 0 ? (
              <p className="search-overlay__empty">
                No encontramos piezas con "{query}".
              </p>
            ) : (
              <>
                <ul className="search-overlay__list">
                  {resultados.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/producto/${p.id}`}
                        onClick={() => {
                          onClose();
                          setQuery("");
                        }}
                        className="search-overlay__item"
                      >
                        <span className={`search-overlay__dot search-overlay__dot--${p.colorTema}`}>
                          {p.imagen && (
                            <img src={p.imagen} alt={p.nombre} className="search-overlay__photo" />
                          )}
                        </span>
                        <div>
                          <p className="search-overlay__item-name">{p.nombre}</p>
                          <p className="search-overlay__item-stone">{p.piedra}</p>
                        </div>
                        <span className="search-overlay__item-price">${p.precio}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button className="search-overlay__all" onClick={verTodos}>
                  Ver todos los resultados →
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}