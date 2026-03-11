import { useState, useRef } from "react";
import useInView from "../hooks/useInView";
import { REALISATIONS } from "../data/realisations";
import "../styles/Realisations.css";

function SliderCard({ item, delay, visible }) {
  const [sliderX, setSliderX] = useState(50);
  const [dragging, setDragging] = useState(false);
  const cardRef = useRef(null);

  function getPercent(clientX) {
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    return percent;
  }

  // Souris
  function onMouseMove(e) {
    if (!dragging) return;
    setSliderX(getPercent(e.clientX));
  }

  function onMouseDown(e) {
    setDragging(true);
    setSliderX(getPercent(e.clientX));
  }

  function onMouseUp() {
    setDragging(false);
  }

  // Tactile
  function onTouchMove(e) {
    setSliderX(getPercent(e.touches[0].clientX));
  }

  return (
    <div
      className="realisation-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ${delay}s, transform 0.6s ${delay}s`,
      }}
    >
      {/* Slider avant/après */}
      <div
        ref={cardRef}
        className="realisation-slider"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
      >
        {/* Après — fond */}
        <div
          className="realisation-slider__after"
          style={{
            background: item.afterImg
              ? `url(${item.afterImg}) center/cover`
              : `linear-gradient(135deg, ${item.afterColor}, #0a2518)`,
          }}
        >
          <div className="realisation-slider__label realisation-slider__label--after">
            APRÈS
          </div>
        </div>

        {/* Avant — clippé */}
        <div
          className="realisation-slider__before"
          style={{
            clipPath: `inset(0 ${100 - sliderX}% 0 0)`,
            background: item.beforeImg
              ? `url(${item.beforeImg}) center/cover`
              : `linear-gradient(135deg, ${item.beforeColor}, #2d1a0e)`,
          }}
        >
          <div className="realisation-slider__label realisation-slider__label--before">
            AVANT
          </div>
        </div>

        {/* Trait + poignée */}
        <div
          className="realisation-slider__divider"
          style={{ left: `${sliderX}%` }}
        >
          <div className="realisation-slider__handle">
            <span>‹</span>
            <span>›</span>
          </div>
        </div>

        {/* Hint glisser */}
        <div className="realisation-slider__hint">← Glissez →</div>
      </div>

      {/* Infos chantier */}
      <div className="realisation-card__infos">
        <div className="realisation-card__label">{item.label}</div>
        <div className="realisation-card__desc">{item.desc}</div>
        <div className="realisation-card__meta">
          <span>📍 {item.lieu}</span>
          <span>📐 {item.surface}</span>
        </div>
      </div>
    </div>
  );
}

export default function Realisations() {
  const [ref, visible] = useInView();

  return (
    <section id="realisations" className="realisations">
      <div className="realisations__container">
        <div className="section-header">
          <div className="section-tag">Nos Réalisations</div>
          <h2 className="section-title">
            Avant &amp; après
            <br />
            <span className="section-title--green">jugez par vous-même</span>
          </h2>
          <p className="section-sub">
            Glissez sur chaque photo pour découvrir la transformation. Tous nos
            chantiers sont réalisés sans haute pression.
          </p>
        </div>

        <div className="realisations__grid" ref={ref}>
          {REALISATIONS.map((item, i) => (
            <SliderCard
              key={item.id}
              item={item}
              delay={i * 0.08}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
