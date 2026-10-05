import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IconFlower, IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { getCatalogo } from "../services/catalogo";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import Button from "../components/ui/Button";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { agregarProducto } = useCart();
  const { esFavorito, toggleFavorito } = useFavorites();
  const [product, setProduct] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setCargando(true);
    setImgError(false);
    getCatalogo()
      .then((data) => {
        const encontrado = data.find((p) => p.id === id);
        if (encontrado) {
          setProduct({
            ...encontrado,
            precio: encontrado.precio_venta,
            imagen: encontrado.imagen_url,
            piedra: encontrado.categoria,
          });
        } else {
          setProduct(null);
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <section className="container" style={{ padding: "60px 24px" }}>
        <p>Cargando...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="container" style={{ padding: "60px 24px" }}>
        <p>No encontramos esa pieza.</p>
        <Link to="/tienda">Volver a la tienda</Link>
      </section>
    );
  }

  // Aquí product ya existe, es seguro leer sus campos
  const mostrarFoto = product.imagen_url && !imgError;

  return (
    <section className="product-detail container">
      <div
        className={`product-detail__image ${
          mostrarFoto ? "" : "product-detail__image--lavender"
        }`}
      >
        {mostrarFoto ? (
          <img
            src={product.imagen_url}
            alt={product.nombre}
            className="product-detail__photo"
            onError={() => setImgError(true)}
          />
        ) : (
          <IconFlower size={64} stroke={1.2} />
        )}
      </div>

      <div className="product-detail__info">
        <p className="product-detail__stone">{product.categoria || "Pieza artesanal"}</p>
        <h1 className="product-detail__name">{product.nombre}</h1>
        <p className="product-detail__price">${product.precio}</p>
        <p className="product-detail__desc">{product.descripcion || "Pieza hecha a mano."}</p>

        <div className="product-detail__actions">
          <Button variant="lavender" onClick={() => agregarProducto(product, 1)}>
            Agregar al carrito
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
          {product.stock_actual > 0 ? `${product.stock_actual} disponibles` : "Agotado"}
        </p>
      </div>
    </section>
  );
}