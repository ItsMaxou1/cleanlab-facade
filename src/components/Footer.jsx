import "../styles/Footer.css";
import { LINKS } from "../data/footer";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Logo + description */}
          <div className="footer__brand">
            <div className="footer__logo">
              CLEAN <span className="footer__logo--red">LAB</span>{" "}
              <span className="footer__logo--green">FAÇADE</span>
            </div>
            <p className="footer__brand-desc">
              Spécialiste du traitement anti-algues et de la protection des
              façades. Sans haute pression. Résultat garanti. Intervention
              rapide dans le 76.
            </p>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            {LINKS.map((link) => (
              <span key={link} className="footer__col-item">
                {link}
              </span>
            ))}
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <div className="footer__contact">
              <span>📍 Yvetot & Agglomération 76</span>
              <a href="tel:0679230396">📞 06 79 23 03 96</a>
              <a href="mailto:contact@cleanlabfacade.fr">
                ✉ contact@cleanlabfacade.fr
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span>© 2025 Clean Lab Façade — Tous droits réservés</span>
          <span>
            Site réalisé par{" "}
            <a
              href="https://stratoncode.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="footer__credit"
            >
              stratoncode.netlify.app
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
