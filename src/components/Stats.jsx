import { useState, useEffect } from "react";
import useInView from "../hooks/useInView";
import "../styles/Stats.css";

const STATS = [
  { value: 500, suffix: "+", label: "Chantiers réalisés" },
  { value: 30, suffix: " min", label: "Résultat visible" },
  { value: 10, suffix: " ans", label: "Protection max" },
  { value: 100, suffix: "%", label: "Clients satisfaits" },
];

function AnimatedCounter({ target, suffix, duration = 2000, visible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [ref, visible] = useInView();

  return (
    <section className="stats">
      <div className="stats__container" ref={ref}>
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="stats__item"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
            }}
          >
            <div className="stats__value">
              <AnimatedCounter
                target={s.value}
                suffix={s.suffix}
                visible={visible}
              />
            </div>
            <div className="stats__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
