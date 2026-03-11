import useInView from "../hooks/useInView";
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
  const [ref, visible] = useInView();

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
            Des centaines de clients satisfaits dans le 76. Lisez leurs retours
            d'expérience.
          </p>
        </div>

        <div className="testimonials__grid" ref={ref}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ${i * 0.12}s, transform 0.6s ${i * 0.12}s`,
              }}
            >
              <Stars count={t.stars} />
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <Avatar name={t.name} />
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__location">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
