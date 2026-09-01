import { Link } from "react-router-dom";
import { IconSearch, IconHeart, IconShoppingBag } from "@tabler/icons-react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import SearchOverlay from "./SearchOverlay";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const { totalItems } = useCart();
  const { favoritos } = useFavorites();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__logo">
          Yatzari
        </Link>

        <nav className="navbar__links" aria-label="Navegación principal">
          <Link to="/tienda">Tienda</Link>
          <Link to="/nosotros">Nosotros</Link>
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__icon-btn"
            aria-label="Buscar"
            onClick={() => setSearchOpen(true)}
          >
            <IconSearch size={19} stroke={1.6} />
          </button>
          <Link to="/favoritos" className="navbar__icon-btn navbar__cart" aria-label={`Favoritos, ${favoritos.length} guardados`}>
            <IconHeart size={19} stroke={1.6} />
            {favoritos.length > 0 && (
              <span className="navbar__cart-badge">{favoritos.length}</span>
            )}
          </Link>
          <Link
            to="/carrito"
            className="navbar__icon-btn navbar__cart"
            aria-label={`Carrito, ${totalItems} productos`}
          >
            <IconShoppingBag size={19} stroke={1.6} />
            {totalItems > 0 && (
              <span className="navbar__cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
