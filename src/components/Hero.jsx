import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import BeforeAfterCard from "./BeforeAfterCard";
import "../styles/Hero.css";

const words = ["Façades", "Toitures", "Terrasses", "Murs", "Allées"];

// Généré une seule fois hors du composant → pas de problème de pureté
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 4.7 + 3) % 100}%`,
  top: `${(i * 7.3 + 5) % 100}%`,
  size: (i % 4) + 2,
  delay: i % 5,
  duration: (i % 6) + 6,
}));

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [wIdx, setWIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wIdx];

    if (!deleting && typed.length < word.length) {
      const t = setTimeout(
        () => setTyped(word.slice(0, typed.length + 1)),
        100,
      );
      return () => clearTimeout(t);
    }

    if (!deleting && typed.length === word.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }

    if (deleting && typed.length > 0) {
      const t = setTimeout(() => setTyped(typed.slice(0, -1)), 60);
      return () => clearTimeout(t);
    }

    if (deleting && typed.length === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setWIdx((i) => (i + 1) % words.length);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [typed, deleting, wIdx]);

  return (
    <section id="accueil" className="hero">
      <div className="hero__particles">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="hero__particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="hero__orb hero__orb--blue" />
      <div className="hero__orb hero__orb--green" />

      <div className="hero__container">
        <div className="hero__left">
          <div className="hero__badge hero__badge--anim">
            <span className="hero__badge-dot" />
            Yvetot & Agglomération 76
          </div>

          <h1 className="hero__title hero__title--anim">
            VOS
            <br />
            <span className="hero__title--typed">
              {typed}
              <span className="hero__cursor" />
            </span>
            <br />
            <span className="hero__title--red">IMPECCABLES</span>
          </h1>

          <p className="hero__desc hero__desc--anim">
            Traitement anti-algues en profondeur{" "}
            <strong>sans haute pression agressive</strong>. Résultat visible en{" "}
            <strong>30 minutes</strong>, protection <strong>7 à 10 ans</strong>{" "}
            garantie.
          </p>

          <div className="hero__actions hero__actions--anim">
            <a href="#contact" className="btn btn--primary">
              ✦ Devis Gratuit Immédiat
            </a>
            <a href="#realisations" className="btn btn--outline">
              Voir nos travaux →
            </a>
          </div>

          <div className="hero__badges hero__badges--anim">
            {[
              {
                icon: "🚫",
                label: "Sans Haute Pression",
                sub: "Zéro dégât sur vos murs",
              },
              {
                icon: "⏱️",
                label: "Résultat en 30 min",
                sub: "Visible à l'œil nu",
              },
              {
                icon: "🌿",
                label: "Produits Biosourcés",
                sub: "Respectueux de l'environnement",
              },
            ].map((b) => (
              <div key={b.label} className="hero__badge-item">
                <span className="hero__badge-icon">{b.icon}</span>
                <div>
                  <div className="hero__badge-label">{b.label}</div>
                  <div className="hero__badge-sub">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__right hero__right--anim">
          <BeforeAfterCard />
        </div>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-text">Découvrir</span>
        <ArrowDown size={16} color="rgba(255,255,255,0.3)" />
      </div>
    </section>
  );
}
