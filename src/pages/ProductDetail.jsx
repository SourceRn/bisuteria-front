import { useParams, Link } from "react-router-dom";
import { IconFlower, IconCheck, IconLeaf, IconSparkles, IconHeart, IconHeartFilled  } from "@tabler/icons-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import Button from "../components/ui/Button";
import "./ProductDetail.css";

const ICONOS = {
  lavender: IconFlower,
  sage: IconLeaf,
  violet: IconSparkles,
  gold: IconSparkles,
};

export default function ProductDetail() {
  const { id } = useParams();
  const { agregarProducto } = useCart();
  const { esFavorito, toggleFavorito } = useFavorites();
  const product = products.find((p) => p.id === id);
  const [agregado, setAgregado] = useState(false);

  function handleAgregar() {
    agregarProducto(product, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 900);
  }

  if (!product) {
    return (
      <section className="container" style={{ padding: "60px 24px" }}>
        <p>No encontramos esa pieza.</p>
        <Link to="/tienda">Volver a la tienda</Link>
      </section>
    );
  }

  const Icono = ICONOS[product.colorTema] || IconSparkles;

  return (
    <section className="product-detail container">
      <div className={`product-detail__image product-detail__image--${product.colorTema}`}>
        {product.imagen ? (
          <img src={product.imagen} alt={product.nombre} className="product-detail__photo" />
        ) : (
          <Icono
            size={64}
            stroke={1.2}
            style={product.colorTema === "gold" ? { opacity: 0.6 } : undefined}
          />
        )}
      </div>

      <div className="product-detail__info">
        <p className="product-detail__stone">{product.piedra}</p>
        <h1 className="product-detail__name">{product.nombre}</h1>
        <p className="product-detail__price">${product.precio}</p>
        <p className="product-detail__intention">Intención: {product.intencion}</p>
        <p className="product-detail__desc">{product.descripcion}</p>

        <div className="product-detail__actions">
          <Button variant="lavender" onClick={handleAgregar} className={agregado ? "is-added" : ""}>
            {agregado ? (
              <>
                <IconCheck size={16} stroke={2.5} /> Agregado
              </>
            ) : (
              "Agregar al carrito"
            )}
          </Button>
          <button
            className="product-detail__fav"
            onClick={() => toggleFavorito(product.id)}
            aria-label={
              esFavorito(product.id)
                ? `Quitar ${product.nombre} de favoritos`
                : `Agregar ${product.nombre} a favoritos`
            }
          >
            {esFavorito(product.id) ? (
              <IconHeartFilled size={19} />
            ) : (
              <IconHeart size={19} stroke={1.6} />
            )}
          </button>
        </div>

        <p className="product-detail__stock">
          {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
        </p>
      </div>
    </section>
  );
}
