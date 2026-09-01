import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconStarFilled, IconUserCircle } from "@tabler/icons-react";
import "./TestimonialCarousel.css";

export default function TestimonialCarousel({ testimonios }) {
  const [index, setIndex] = useState(0);
  const total = testimonios.length;

  function anterior() {
    setIndex((i) => (i - 1 + total) % total);
  }

  function siguiente() {
    setIndex((i) => (i + 1) % total);
  }

  return (
    <section className="testimonials container" aria-label="Testimonios de clientas">
      <p className="testimonials__eyebrow">Lo que dicen nuestras clientas</p>

      <div className="testimonials__viewport">
        <div
          className="testimonials__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {testimonios.map((t) => (
            <article
              key={t.id}
              className={`testimonial-slide testimonial-slide--${t.colorTema}`}
            >
              <div className="testimonial-slide__avatar">
                {t.foto ? (
                  <img src={t.foto} alt={t.nombre} className="testimonial-slide__photo" />
                ) : (
                  <IconUserCircle size={48} stroke={1.2} />
                )}
              </div>
              <div className="testimonial-slide__body">
                <div className="testimonial-slide__stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarFilled key={i} size={14} />
                  ))}
                </div>
                <p className="testimonial-slide__text">"{t.texto}"</p>
                <p className="testimonial-slide__author">
                  {t.nombre} — {t.producto}
                </p>
              </div>
            </article>
          ))}
        </div>

        <button
          className="testimonials__nav testimonials__nav--prev"
          onClick={anterior}
          aria-label="Testimonio anterior"
        >
          <IconChevronLeft size={16} />
        </button>
        <button
          className="testimonials__nav testimonials__nav--next"
          onClick={siguiente}
          aria-label="Siguiente testimonio"
        >
          <IconChevronRight size={16} />
        </button>
      </div>

      <div className="testimonials__dots">
        {testimonios.map((t, i) => (
          <button
            key={t.id}
            className={`testimonials__dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Ir al testimonio ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
