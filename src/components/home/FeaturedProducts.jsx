import { Link } from "react-router-dom";
import ProductCard from "../ui/ProductCard";
import "./FeaturedProducts.css";

export default function FeaturedProducts({ products }) {
  return (
    <section className="featured container">
      <div className="featured__header">
        <p className="featured__eyebrow">Destacados</p>
        <Link to="/tienda" className="featured__link">
          Ver todo →
        </Link>
      </div>

      <div className="featured__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} className="ProductCard"/>
        ))}
      </div>
    </section>
  );
}
