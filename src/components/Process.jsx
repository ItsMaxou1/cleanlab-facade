import useInView from "../hooks/useInView";
import { PROCESS } from "../data/process";
import "../styles/Process.css";

export default function Process() {
  const [ref, visible] = useInView();

  return (
    <section id="methode" className="process">
      <div className="process__container">
        <div className="section-header">
          <div className="section-tag">Notre Méthode</div>
          <h2 className="section-title">
            Un résultat
            <br />
            <span className="section-title--green">garanti</span>
          </h2>
          <p className="section-sub">
            4 étapes simples pour retrouver une façade comme neuve, sans tracas
            et sans mauvaise surprise.
          </p>
        </div>

        <div className="process__steps" ref={ref}>
          {PROCESS.map((step, i) => (
            <div
              key={step.number}
              className="process__step"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.6s ${i * 0.15}s, transform 0.6s ${i * 0.15}s`,
              }}
            >
              <div className="process__icon">{step.icon}</div>
              <div className="process__number">ÉTAPE {step.number}</div>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
