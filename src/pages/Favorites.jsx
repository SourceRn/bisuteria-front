import { Link } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import { products } from "../data/products";
import { useFavorites } from "../context/FavoritesContext";
import Button from "../components/ui/Button";
import "./Shop.css"; // reutilizamos el mismo estilo de grid que la tienda

export default function Favorites() {
  const { favoritos } = useFavorites();
  const productosFavoritos = products.filter((p) => favoritos.includes(p.id));

  if (productosFavoritos.length === 0) {
    return (
      <section className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 26, marginBottom: 10 }}>Aún no tienes favoritos</h1>
        <p style={{ color: "var(--color-text-soft)", marginBottom: 24 }}>
          Toca el corazón en cualquier pieza para guardarla aquí.
        </p>
        <Button as={Link} to="/tienda" variant="lavender">
          Explorar tienda
        </Button>
      </section>
    );
  }

  return (
    <section className="shop container">
      <h1 className="shop__title">Tus favoritos</h1>
      <p className="shop__subtitle">{productosFavoritos.length} piezas guardadas</p>

      <div className="shop__grid" style={{ marginTop: 24 }}>
        {productosFavoritos.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}