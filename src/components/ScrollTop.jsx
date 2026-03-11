import { useState, useEffect } from "react";
import "../styles/ScrollTop.css";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      className={`scrolltop ${visible ? "scrolltop--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Remonter en haut"
    >
      ↑
    </button>
  );
}
