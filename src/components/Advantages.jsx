import useInView from "../hooks/useInView";
import { ADVANTAGES } from "../data/advantages";
import "../styles/Advantages.css";

export default function Advantages() {
  const [ref, visible] = useInView();

  return (
    <section id="avantages" className="advantages">
      <div className="advantages__container">
        {/* Colonne gauche */}
        <div className="advantages__left">
          <div className="section-tag">Pourquoi nous choisir</div>
          <h2 className="section-title">
            La différence
            <br />
            <span className="section-title--green">Clean Lab</span>
          </h2>
          <p className="advantages__desc">
            Contrairement aux nettoyages haute pression classiques qui abîment
            les supports et voient les salissures revenir en quelques mois,
            notre méthode traite le problème à la racine.
          </p>
          <a href="tel:0679230396" className="btn btn--primary">
            📞 06 79 23 03 96
          </a>
        </div>

        {/* Colonne droite */}
        <div className="advantages__grid" ref={ref}>
          {ADVANTAGES.map((item, i) => (
            <div
              key={item.title}
              className="advantages__card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.9)",
                transition: `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`,
              }}
            >
              <div className="advantages__card-icon">{item.icon}</div>
              <h4 className="advantages__card-title">{item.title}</h4>
              <p className="advantages__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
