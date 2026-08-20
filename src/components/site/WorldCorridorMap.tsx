import data from "./world-dots.json";
import { useInView } from "./primitives";

type Dot = { x: number; y: number; t?: number };

const width = 238;
const height = 106;

const points = (data.points as Dot[]).filter((p) => p.y <= height);

const BASE = "#3A3F38";
const ACTIVE = "#9CAD1F";
const SOON = "#5E6B2A";

export function WorldCorridorMap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="World map highlighting active regions in India, the Middle East and Africa, with Europe and Australia coming soon"
      >
        {points.map((p, i) => {
          const t = p.t ?? 0;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={t === 1 ? 0.38 : 0.32}
              fill={t === 1 ? ACTIVE : t === 2 ? SOON : BASE}
              opacity={inView ? (t === 1 ? 0.95 : t === 2 ? 0.7 : 0.85) : 0}
              style={{
                transition: "opacity 700ms ease",
                transitionDelay: `${t ? 900 + Math.min(p.x * 1.5, 500) : Math.min(p.x * 2.4, 700)}ms`,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
