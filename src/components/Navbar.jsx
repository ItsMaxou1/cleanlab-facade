import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Méthode", href: "#methode" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__logo">
        <div className="navbar__logo-icon">⬡</div>
        <div>
          <span className="navbar__logo-name">
            CLEAN <span>LAB</span>
          </span>
          <span className="navbar__logo-sub">FAÇADE</span>
        </div>
      </div>

      {/* Desktop links */}
      <ul className="navbar__links">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="navbar__link">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="tel:0679230396" className="navbar__cta">
        <Phone size={16} />
        Devis Gratuit
      </a>

      {/* Burger mobile */}
      <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="tel:0679230396" className="navbar__mobile-cta">
            📞 06 79 23 03 96
          </a>
        </div>
      )}
    </nav>
  );
}
