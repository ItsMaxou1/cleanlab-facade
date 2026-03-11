import { useState } from "react";
import "../styles/BeforeAfterCard.css";

export default function BeforeAfterCard() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`bac ${hover ? "bac--hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Avant */}
      <div
        className="bac__before"
        style={{ clipPath: `inset(0 ${hover ? 0 : 50}% 0 0)` }}
      >
        <div className="bac__content">
          <span className="bac__emoji">🏚️</span>
          <div className="bac__tag bac__tag--before">AVANT</div>
          <p className="bac__sub">Mousses · Algues · Lichens</p>
        </div>
      </div>

      {/* Après */}
      <div className="bac__after">
        <div className="bac__content">
          <span className="bac__emoji">🏡</span>
          <div className="bac__tag bac__tag--after">APRÈS</div>
          <p className="bac__sub">Propre · Protégé · 7-10 ans</p>
        </div>
      </div>

      {/* Divider */}
      <div className="bac__divider" style={{ left: hover ? "100%" : "50%" }}>
        <div className="bac__divider-handle">⟺</div>
      </div>

      <div className="bac__hint">✦ Survolez pour voir</div>
    </div>
  );
}
