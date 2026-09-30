import { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TestimonialCarousel from "../components/home/TestimonialCarousel";
import { getCatalogo } from "../services/catalogo";
import { testimonios } from "../data/products";

export default function Home() {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    getCatalogo()
      .then((data) => {
        const normalizados = data.map((p) => ({ ...p, precio: p.precio_venta }));
        setDestacados(normalizados.slice(0, 4));
      })
      .catch(() => setDestacados([]));
  }, []);

  return (
    <>
      <Hero />
      {destacados.length > 0 && <FeaturedProducts products={destacados} />}
      <TestimonialCarousel testimonios={testimonios} />
    </>
  );
}