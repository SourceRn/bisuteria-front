import "./SortDropdown.css";

const OPCIONES = [
  { valor: "novedad", label: "Novedades" },
  { valor: "precio-asc", label: "Precio: menor a mayor" },
  { valor: "precio-desc", label: "Precio: mayor a menor" },
];

export default function SortDropdown({ orden, setOrden }) {
  return (
    <select
      className="sort-dropdown"
      value={orden}
      onChange={(e) => setOrden(e.target.value)}
      aria-label="Ordenar productos"
    >
      {OPCIONES.map((op) => (
        <option key={op.valor} value={op.valor}>
          {op.label}
        </option>
      ))}
    </select>
  );
}