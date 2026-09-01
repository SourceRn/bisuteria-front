import { Link } from "react-router-dom";
import "./PromoBanner.css";

export default function PromoBanner({ texto, href = "/tienda", imagen }) {
  return (
    <Link
      to={href}
      className="promo-banner"
      style={imagen ? { backgroundImage: `url(${imagen})` } : undefined}
    >
      <div className="promo-banner__overlay" />
      <span className="promo-banner__text">{texto}</span>
    </Link>
  );
}