import data from "./world-dots.json";
import { useInView } from "./primitives";

type Dot = { x: number; y: number; t: number };

const points = data.points as Dot[];
const hubs = data.hubs as unknown as Record<string, [number, number]>;

const width = 120;
const height = 60;

const tone = ["var(--border)", "color-mix(in oklab, var(--accent) 80%, var(--border))", "var(--accent)"];

export function WorldCorridorMap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="World map showing active trade corridors in India, the Middle East and Africa, with Europe and Australia coming soon"
      >
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.t === 2 ? 0.42 : 0.34}
            fill={tone[p.t]}
            opacity={inView ? (p.t === 2 ? 1 : p.t === 1 ? 0.55 : 0.5) : 0}
            style={{
              transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1)",
              transitionDelay: `${Math.min(p.x * 5 + (p.t === 2 ? 250 : 0), 1200)}ms`,
            }}
          />
        ))}

        {Object.entries(hubs).map(([id, [x, y]]) => (
          <g key={id} opacity={inView ? 1 : 0} style={{ transition: "opacity 700ms ease 1200ms" }}>
            <circle cx={x} cy={y} r={0.9} fill="var(--accent)" opacity={0.9} />
            <circle cx={x} cy={y} r={0.9} fill="none" stroke="var(--accent)" strokeWidth={0.18}>
              <animate attributeName="r" values="0.9;3.2" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.8s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
