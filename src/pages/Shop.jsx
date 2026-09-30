import { useState, useEffect, useMemo } from "react";
import { IconAdjustmentsHorizontal, IconX } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import FilterSidebar from "../components/shop/FilterSidebar";
import SortDropdown from "../components/shop/SortDropdown";
import PromoBanner from "../components/shop/PromoBanner";
import { getCatalogo } from "../services/catalogo";
import "./Shop.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [filtros, setFiltros] = useState({ categoria: [], piedra: [], intencion: [] });
  const [orden, setOrden] = useState("novedad");
  const [showFilters, setShowFilters] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const busquedaURL = searchParams.get("buscar") || "";

  useEffect(() => {
    getCatalogo()
      .then((data) => {
        const normalizados = data.map((p) => ({ ...p, precio: p.precio_venta }));
        setProducts(normalizados);
      })
      .catch((err) => setErrorCarga(err.message))
      .finally(() => setCargando(false));
  }, []);

  function quitarBusqueda() {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("buscar");
      return next;
    });
  }

  const opciones = useMemo(() => ({
    categorias: [...new Set(products.map((p) => p.categoria).filter(Boolean))],
    piedras: [...new Set(products.map((p) => p.piedra).filter(Boolean))],
    intenciones: [...new Set(products.map((p) => p.intencion).filter(Boolean))],
  }), [products]);

  const productosFiltrados = useMemo(() => {
    const termino = busquedaURL.trim().toLowerCase();

    let resultado = products.filter((p) => {
      const pasaCategoria = filtros.categoria.length === 0 || filtros.categoria.includes(p.categoria);
      const pasaPiedra = filtros.piedra.length === 0 || filtros.piedra.includes(p.piedra);
      const pasaIntencion = filtros.intencion.length === 0 || filtros.intencion.includes(p.intencion);
      const pasaBusqueda =
        !termino ||
        p.nombre.toLowerCase().includes(termino) ||
        (p.piedra || "").toLowerCase().includes(termino) ||
        (p.categoria || "").toLowerCase().includes(termino) ||
        (p.intencion || "").toLowerCase().includes(termino);
      return pasaCategoria && pasaPiedra && pasaIntencion && pasaBusqueda;
    });

    if (orden === "precio-asc") resultado = [...resultado].sort((a, b) => a.precio - b.precio);
    if (orden === "precio-desc") resultado = [...resultado].sort((a, b) => b.precio - a.precio);

    return resultado;
  }, [products, filtros, orden, busquedaURL]);

  return (
    <section className="shop container">
      <h1 className="shop__title">Tienda</h1>
      <p className="shop__subtitle">
        {productosFiltrados.length} de {products.length} piezas
      </p>

      <PromoBanner
        texto="Envío gratis en compras mayores a $500"
        imagen="/images/banners/promo-tienda.jpg"
      />

      {busquedaURL && (
        <div className="shop__search-chip">
          <span>
            Resultados para: <strong>"{busquedaURL}"</strong>
          </span>
          <button onClick={quitarBusqueda} aria-label="Quitar búsqueda">
            <IconX size={14} stroke={2} />
          </button>
        </div>
      )}

      {cargando ? (
        <p style={{ padding: "40px 0", color: "var(--color-text-soft)" }}>Cargando piezas...</p>
      ) : errorCarga ? (
        <p style={{ padding: "40px 0", color: "#B85C5C" }}>No se pudo cargar el catálogo: {errorCarga}</p>
      ) : (
        <div className="shop__layout">
          <FilterSidebar
            filtros={filtros}
            setFiltros={setFiltros}
            opciones={opciones}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />

          <div className="shop__results">
            <div className="shop__toolbar">
              <button className="shop__filter-btn" onClick={() => setShowFilters(true)}>
                <IconAdjustmentsHorizontal size={16} stroke={1.6} />
                Filtrar
              </button>
              <SortDropdown orden={orden} setOrden={setOrden} />
            </div>

            {productosFiltrados.length === 0 ? (
              <p className="shop__empty">No hay piezas con esos filtros. Prueba quitando alguno.</p>
            ) : (
              <div className="shop__grid">
                {productosFiltrados.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}