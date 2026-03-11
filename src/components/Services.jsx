import { useState } from "react";
import useInView from "../hooks/useInView";
import { SERVICES } from "../data/services";
import ServiceModal from "./ServiceModal";
import "../styles/Services.css";

function ServiceCard({
  icon,
  title,
  desc,
  colorClass,
  delay,
  visible,
  onMore,
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`service-card service-card--${colorClass} ${hover ? "service-card--hover" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s ${delay}s, transform 0.6s ${delay}s`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="service-card__icon">{icon}</div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__desc">{desc}</p>
      <button className="service-card__more" onClick={onMore}>
        En savoir plus →
      </button>
    </div>
  );
}

export default function Services() {
  const [ref, visible] = useInView();
  const [selected, setSelected] = useState(null);

  return (
    <section id="services" className="services">
      <div className="services__container">
        <div className="section-header">
          <div className="section-tag">Nos Prestations</div>
          <h2 className="section-title">
            Ce que nous
            <br />
            <span className="section-title--green">traitons</span>
          </h2>
          <p className="section-sub">
            Une expertise complète pour toutes les surfaces extérieures de votre
            habitation ou de vos locaux professionnels.
          </p>
        </div>

        <div className="services__grid" ref={ref}>
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              {...s}
              delay={i * 0.08}
              visible={visible}
              onMore={() => setSelected(s)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ServiceModal service={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
