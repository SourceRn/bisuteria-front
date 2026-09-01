import { IconFlower, IconHandStop, IconTruck, IconGift } from "@tabler/icons-react";
import Button from "../ui/Button";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__top">
        <div className="hero__content">
          <span className="hero__badge">Nueva colección Luna</span>
          <h1 className="hero__title">Piezas con energía natural</h1>
          <p className="hero__subtitle">
            Cuarzos y flores en armonía con la tierra que las origina.
          </p>
          <div className="hero__actions">
            <Button variant="primary" as="a" href="/tienda">
              Ver colección
            </Button>
            <Button variant="text" as="a" href="/nosotros">
              Nuestra historia
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <img
            src="/images/hero.png"
            alt="Pieza de bisutería Yatzari con cuarzo, en ambiente natural"
            className="hero__image"
          />
        </div>
      </div>

      <div className="hero__trust">
        <div className="hero__trust-item">
          <IconHandStop size={16} stroke={1.6} />
          <span>Hecho a mano</span>
        </div>
        <div className="hero__trust-item">
          <IconTruck size={16} stroke={1.6} />
          <span>Envío nacional</span>
        </div>
        <div className="hero__trust-item">
          <IconGift size={16} stroke={1.6} />
          <span>Empaque de regalo</span>
        </div>
      </div>
    </section>
  );
}
