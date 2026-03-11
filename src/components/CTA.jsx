import { useState } from "react";
import useInView from "../hooks/useInView";
import "../styles/CTA.css";

export default function CTA() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Demande de devis — ${form.name}`);
    const body = encodeURIComponent(
      `Nom : ${form.name}\nTéléphone : ${form.phone}\n\nMessage :\n${form.message}`,
    );
    window.location.href = `mailto:contact@cleanlabfacade.fr?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="cta">
      <div
        className={`cta__container ${visible ? "cta__container--visible" : ""}`}
        ref={ref}
      >
        <div className="section-tag">Devis 100% Gratuit · Sans Engagement</div>

        <h2 className="cta__title">
          Prêt à retrouver
          <br />
          <span className="section-title--green">une façade impeccable ?</span>
        </h2>

        <p className="cta__desc">
          Intervention rapide sur Yvetot et toute l'agglomération 76. Remplissez
          le formulaire ou appelez directement.
        </p>

        <div className="cta__content">
          {/* Formulaire */}
          {sent ? (
            <div className="cta__success">
              ✅ Votre demande a été envoyée ! Nous vous recontactons sous 2h.
            </div>
          ) : (
            <form className="cta__form" onSubmit={handleSubmit}>
              <div className="cta__form-row">
                <div className="cta__field">
                  <label className="cta__label">Votre nom</label>
                  <input
                    className="cta__input"
                    type="text"
                    name="name"
                    placeholder="Jean Dupont"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="cta__field">
                  <label className="cta__label">Votre téléphone</label>
                  <input
                    className="cta__input"
                    type="tel"
                    name="phone"
                    placeholder="06 XX XX XX XX"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="cta__field">
                <label className="cta__label">Votre message</label>
                <textarea
                  className="cta__input cta__textarea"
                  name="message"
                  placeholder="Décrivez votre projet : type de surface, superficie approximative, localisation..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn--primary cta__submit">
                ✦ Envoyer ma demande de devis
              </button>
            </form>
          )}

          {/* Infos contact directes */}
          <div className="cta__infos">
            <a href="tel:0679230396" className="cta__info-item">
              <span className="cta__info-icon">📞</span>
              <div>
                <div className="cta__info-label">Téléphone</div>
                <div className="cta__info-value">06 79 23 03 96</div>
              </div>
            </a>
            <a
              href="mailto:contact@cleanlabfacade.fr"
              className="cta__info-item"
            >
              <span className="cta__info-icon">✉️</span>
              <div>
                <div className="cta__info-label">Email</div>
                <div className="cta__info-value">contact@cleanlabfacade.fr</div>
              </div>
            </a>
            <div className="cta__info-item">
              <span className="cta__info-icon">📍</span>
              <div>
                <div className="cta__info-label">Zone d'intervention</div>
                <div className="cta__info-value">Yvetot & Agglomération 76</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
