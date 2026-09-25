import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import { FavoritesProvider } from "./context/FavoritesContext";
import Favorites from "./pages/Favorites";
import { ClienteAuthProvider } from "./context/ClienteAuthContext";
import Cuenta from "./pages/Cuenta";
import MisPedidos from "./pages/MisPedidos";

export default function App() {
  return (
    <ClienteAuthProvider>
      <CartProvider>
        <FavoritesProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tienda" element={<Shop />} />
                  <Route path="/producto/:id" element={<ProductDetail />} />
                  <Route path="/carrito" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/nosotros" element={<About />} />
                  <Route path="/favoritos" element={<Favorites />} />
                  <Route path="/cuenta" element={<Cuenta />} />
                  <Route path="/cuenta/pedidos" element={<MisPedidos />} />
                </Routes>
              </Layout>
            </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </ClienteAuthProvider>
  );
}