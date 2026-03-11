import { useEffect } from "react";
import "../styles/ServiceModal.css";

export default function ServiceModal({ service, onClose }) {
  // Fermer avec Echap
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Bloquer le scroll derrière
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!service) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal__header">
          <span className="modal__icon">{service.icon}</span>
          <div>
            <div className={`modal__tag modal__tag--${service.colorClass}`}>
              {service.title}
            </div>
          </div>
          <button className="modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Contenu */}
        <p className="modal__details">{service.details}</p>

        {/* CTA */}
        <a
          href="#contact"
          className="btn btn--primary modal__cta"
          onClick={onClose}
        >
          ✦ Demander un devis gratuit
        </a>
      </div>
    </div>
  );
}
