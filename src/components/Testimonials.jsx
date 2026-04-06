import { useState, useEffect, useCallback, useRef } from "react";
import { TESTIMONIALS } from "../data/testimonials";
import "../styles/Testimonials.css";

function Stars({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="stars__item">
          ★
        </span>
      ))}
    </div>
  );
}

function Avatar({ name }) {
  return <div className="avatar">{name[0]}</div>;
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const autoplayRef = useRef(null);

  const VISIBLE = 3; // cartes visibles sur desktop
  const total = TESTIMONIALS.length;

  const goTo = useCallback(
    (index, dir = "next") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating],
  );

  const next = useCallback(() => {
    goTo((current + 1) % total, "next");
  }, [current, total, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + total) % total, "prev");
  }, [current, total, goTo]);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(next, 4500);
    return () => clearInterval(autoplayRef.current);
  }, [next]);

  const pauseAutoplay = () => clearInterval(autoplayRef.current);
  const resumeAutoplay = () => {
    autoplayRef.current = setInterval(next, 4500);
  };

  // Indices visibles (3 sur desktop, 1 sur mobile)
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < VISIBLE; i++) {
      indices.push((current + i) % total);
    }
    return indices;
  };

  return (
    <section id="avis" className="testimonials">
      <div className="testimonials__container">
        <div className="section-header">
          <div className="section-tag">Avis Clients</div>
          <h2 className="section-title">
            Ils nous font
            <br />
            <span className="section-title--green">confiance</span>
          </h2>
          <p className="section-sub">
            Des clients satisfaits dans tout le 76. Lisez leurs retours
            d'expérience.
          </p>
        </div>

        <div
          className="carousel"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          {/* Desktop : 3 cartes */}
          <div
            className={`carousel__track carousel__track--${direction} ${isAnimating ? "animating" : ""}`}
          >
            {getVisibleIndices().map((idx, pos) => {
              const t = TESTIMONIALS[idx];
              return (
                <div
                  key={`${idx}-${pos}`}
                  className={`testimonial-card ${pos === 1 ? "testimonial-card--center" : ""}`}
                >
                  <Stars count={t.stars} />
                  <p className="testimonial-card__text">"{t.text}"</p>
                  <div className="testimonial-card__author">
                    <Avatar name={t.name} />
                    <div>
                      <div className="testimonial-card__name">{t.name}</div>
                      <div className="testimonial-card__location">
                        {t.location}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile : 1 carte */}
          <div
            className={`carousel__track-mobile carousel__track--${direction} ${isAnimating ? "animating" : ""}`}
          >
            <div className="testimonial-card testimonial-card--center">
              <Stars count={TESTIMONIALS[current].stars} />
              <p className="testimonial-card__text">
                "{TESTIMONIALS[current].text}"
              </p>
              <div className="testimonial-card__author">
                <Avatar name={TESTIMONIALS[current].name} />
                <div>
                  <div className="testimonial-card__name">
                    {TESTIMONIALS[current].name}
                  </div>
                  <div className="testimonial-card__location">
                    {TESTIMONIALS[current].location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contrôles */}
          <div className="carousel__controls">
            <button
              className="carousel__btn"
              onClick={prev}
              aria-label="Précédent"
            >
              ‹
            </button>
            <div className="carousel__dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`carousel__dot ${i === current ? "carousel__dot--active" : ""}`}
                  onClick={() => goTo(i, i > current ? "next" : "prev")}
                  aria-label={`Avis ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="carousel__btn"
              onClick={next}
              aria-label="Suivant"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
