import { IconX } from "@tabler/icons-react";
import "./FilterSidebar.css";

export default function FilterSidebar({ filtros, setFiltros, opciones, isOpen, onClose }) {
  function toggleFiltro(tipo, valor) {
    setFiltros((prev) => {
      const actual = prev[tipo];
      const yaEsta = actual.includes(valor);
      return {
        ...prev,
        [tipo]: yaEsta ? actual.filter((v) => v !== valor) : [...actual, valor],
      };
    });
  }

  function limpiarFiltros() {
    setFiltros({ categoria: [], piedra: [], intencion: [] });
  }

  const hayFiltrosActivos =
    filtros.categoria.length || filtros.piedra.length || filtros.intencion.length;

  return (
    <>
      {/* Fondo oscuro solo visible en móvil cuando el drawer está abierto */}
      {isOpen && <div className="filter-overlay" onClick={onClose} />}

      <aside className={`filter-sidebar ${isOpen ? "filter-sidebar--open" : ""}`}>
        <div className="filter-sidebar__header">
          <h2>Filtrar</h2>
          <div className="filter-sidebar__header-actions">
            {hayFiltrosActivos > 0 && (
              <button onClick={limpiarFiltros} className="filter-sidebar__clear">
                Limpiar
              </button>
            )}
            {/* Botón cerrar, solo se ve en móvil */}
            <button className="filter-sidebar__close" onClick={onClose} aria-label="Cerrar filtros">
              <IconX size={18} />
            </button>
          </div>
        </div>

        <FilterGroup
          titulo="Categoría"
          opciones={opciones.categorias}
          seleccionados={filtros.categoria}
          onToggle={(v) => toggleFiltro("categoria", v)}
        />

        <FilterGroup
          titulo="Piedra"
          opciones={opciones.piedras}
          seleccionados={filtros.piedra}
          onToggle={(v) => toggleFiltro("piedra", v)}
        />

        <FilterGroup
          titulo="Intención"
          opciones={opciones.intenciones}
          seleccionados={filtros.intencion}
          onToggle={(v) => toggleFiltro("intencion", v)}
        />

        {/* Botón para aplicar y cerrar, solo visible en móvil */}
        <button className="filter-sidebar__apply" onClick={onClose}>
          Ver resultados
        </button>
      </aside>
    </>
  );
}

function FilterGroup({ titulo, opciones, seleccionados, onToggle }) {
  return (
    <div className="filter-group">
      <p className="filter-group__title">{titulo}</p>
      <div className="filter-group__options">
        {opciones.map((op) => (
          <label key={op} className="filter-group__option">
            <input
              type="checkbox"
              checked={seleccionados.includes(op)}
              onChange={() => onToggle(op)}
            />
            <span>{op}</span>
          </label>
        ))}
      </div>
    </div>
  );
}