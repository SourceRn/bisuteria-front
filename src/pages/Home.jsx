import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import TestimonialCarousel from "../components/home/TestimonialCarousel";
import { products, testimonios } from "../data/products";

export default function Home() {
  const destacados = products.slice(0, 4);

  return (
    <>
      <Hero />
      <FeaturedProducts products={destacados} />
      <TestimonialCarousel testimonios={testimonios} />
    </>
  );
}
