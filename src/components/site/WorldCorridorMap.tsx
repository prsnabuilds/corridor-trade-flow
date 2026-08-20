import data from "./world-dots.json";
import { useInView } from "./primitives";

type Dot = { x: number; y: number };
type Hub = [number, number];

const width = 238;
const height = 106;

const points = (data.points as Dot[]).filter((p) => p.y <= height);
const hubs = data.hubs as unknown as Record<string, Hub>;
const hub = (id: string): Hub => hubs[id] ?? [0, 0];

const active: { id: string; label: string }[] = [
  { id: "uae", label: "UAE" },
  { id: "oman", label: "Oman" },
  { id: "saudi", label: "Saudi Arabia" },
  { id: "kenya", label: "Kenya" },
  { id: "nigeria", label: "Nigeria" },
  { id: "southafrica", label: "South Africa" },
];

const soon: { id: string; label: string }[] = [
  { id: "europe", label: "Europe" },
  { id: "australia", label: "Australia" },
];

function arc([x1, y1]: Hub, [x2, y2]: Hub) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(len * 0.18, 14);
  return `M ${x1} ${y1} Q ${mx - (dy / len) * bow} ${my + (dx / len) * bow} ${x2} ${y2}`;
}

export function WorldCorridorMap() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const origin = hub("india");

  return (
    <div ref={ref} className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="World map showing active trade corridors between India, the Middle East and Africa, with Europe and Australia coming soon"
      >
        <g fill="#3A3F38">
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={0.32}
              opacity={inView ? 0.85 : 0}
              style={{
                transition: "opacity 700ms ease",
                transitionDelay: `${Math.min(p.x * 2.4, 700)}ms`,
              }}
            />
          ))}
        </g>

        {/* coming soon routes */}
        {soon.map((h, i) => (
          <path
            key={h.id}
            d={arc(origin, hub(h.id))}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={0.22}
            strokeDasharray="1.4 2"
            opacity={inView ? 0.22 : 0}
            style={{ transition: "opacity 900ms ease", transitionDelay: `${1500 + i * 120}ms` }}
          />
        ))}

        {/* active routes */}
        {active.map((h, i) => {
          const d = arc(origin, hub(h.id));
          return (
            <g key={h.id}>
              <path
                d={d}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={0.24}
                opacity={0.5}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={inView ? 0 : 1}
                style={{
                  transition: "stroke-dashoffset 1400ms cubic-bezier(0.16,1,0.3,1)",
                  transitionDelay: `${1000 + i * 140}ms`,
                }}
              />
              {inView && (
                <circle r={0.5} fill="var(--accent)" opacity={0.9}>
                  <animateMotion
                    dur={`${4.5 + i * 0.4}s`}
                    begin={`${1.4 + i * 0.5}s`}
                    repeatCount="indefinite"
                    path={d}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="spline"
                    keySplines="0.4 0 0.6 1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    dur={`${4.5 + i * 0.4}s`}
                    begin={`${1.4 + i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* coming soon hubs: hollow */}
        {soon.map((h) => (
          <circle
            key={h.id}
            cx={hub(h.id)[0]}
            cy={hub(h.id)[1]}
            r={0.85}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={0.28}
            opacity={inView ? 0.45 : 0}
            style={{ transition: "opacity 700ms ease 1600ms" }}
          />
        ))}

        {/* active hubs: solid */}
        {[{ id: "india", label: "India" }, ...active].map((h) => (
          <circle
            key={h.id}
            cx={hub(h.id)[0]}
            cy={hub(h.id)[1]}
            r={h.id === "india" ? 1.05 : 0.85}
            fill="var(--accent)"
            opacity={inView ? 1 : 0}
            style={{ transition: "opacity 600ms ease 900ms" }}
          >
            <title>{h.label}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}
