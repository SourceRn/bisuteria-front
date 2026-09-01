import { Link } from "react-router-dom";
import { IconPlus, IconCheck, IconFlower, IconLeaf, IconSparkles, IconHeartFilled, IconHeart } from "@tabler/icons-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useState } from "react";
import "./ProductCard.css";

// Cada "colorTema" mapea a un icono y clase de color — asocia visualmente
// tipo de piedra con color, igual que en el catálogo real.
const ICONOS = {
  lavender: IconFlower,
  sage: IconLeaf,
  violet: IconSparkles,
  gold: IconSparkles,
};

export default function ProductCard({ product }) {
  const { agregarProducto } = useCart();
  const Icono = ICONOS[product.colorTema] || IconSparkles;
  const { esFavorito, toggleFavorito } = useFavorites();
  const favorito = esFavorito(product.id);
  const [agregado, setAgregado] = useState(false);

  function handleAgregar(e) {
    e.preventDefault();
    agregarProducto(product, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 900);
  }

  function handleFavorito(e) {
    e.preventDefault(); // evita navegar al detalle al hacer click
    toggleFavorito(product.id);
  }

  return (
    <Link to={`/producto/${product.id}`} className="product-card">
      <button
        className="product-card__fav"
        onClick={handleFavorito}
        aria-label={favorito ? `Quitar ${product.nombre} de favoritos` : `Agregar ${product.nombre} a favoritos`}
      >
        {favorito ? <IconHeartFilled size={16} /> : <IconHeart size={16} stroke={1.6} />}
      </button>
      {product.nuevo && <span className="product-card__badge">Nuevo</span>}

      <div className={`product-card__image product-card__image--${product.colorTema}`}>
        {product.imagen ? (
          <img src={product.imagen} alt={product.nombre} className="product-card__photo" />
        ) : (
          <Icono size={30} stroke={1.4} style={product.colorTema === "gold" ? { opacity: 0.6 } : undefined} />
        )}
      </div>

      <div className="product-card__info">
        <p className="product-card__name">{product.nombre}</p>
        <p className="product-card__stone">{product.piedra}</p>

        <div className="product-card__footer">
          <p className="product-card__price">${product.precio}</p>
          <button
            className={`product-card__add product-card__add--${product.colorTema} ${agregado ? "is-added" : ""}`}
            onClick={handleAgregar}
            aria-label={`Agregar ${product.nombre} al carrito`}
          >
            {agregado ? <IconCheck size={14} stroke={2.5} /> : <IconPlus size={14} stroke={2} />}
          </button>
        </div>
      </div>
    </Link>
  );
}
