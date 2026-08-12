import { Ship, Plane, Truck } from "lucide-react";
import { Eyebrow, Reveal, Section, useInView } from "./primitives";
import seaImg from "@/assets/freight-sea.jpg";
import airImg from "@/assets/freight-air.jpg";
import roadImg from "@/assets/freight-road.jpg";

const modes = [
  {
    icon: Ship,
    title: "Seaways",
    body: "Bulk port-to-port shipping.",
    img: seaImg,
    alt: "Container ship at sea in fog",
    path: "M4 40 C 60 8, 140 64, 196 24",
    dur: 6,
  },
  {
    icon: Plane,
    title: "Airways",
    body: "Air freight for time-sensitive cargo.",
    img: airImg,
    alt: "Cargo aircraft loading at night",
    path: "M4 48 C 70 -6, 130 -6, 196 40",
    dur: 4.5,
  },
  {
    icon: Truck,
    title: "Roadways",
    body: "Overland and last-mile transport.",
    img: roadImg,
    alt: "Freight trucks on a highway at night",
    path: "M4 20 C 56 60, 144 4, 196 44",
    dur: 7,
  },
];

function RouteLine({ d, dur, active }: { d: string; dur: number; active: boolean }) {
  return (
    <svg viewBox="0 0 200 64" fill="none" className="mt-6 h-12 w-full" aria-hidden>
      <path d={d} stroke="currentColor" className="text-border" strokeWidth="1" />
      <path
        d={d}
        stroke="var(--accent)"
        strokeWidth="1.25"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        style={{
          strokeDashoffset: active ? 0 : 1,
          transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1) 200ms",
        }}
      />
      {active ? (
        <circle r="2.5" fill="var(--accent)">
          <animateMotion dur={`${dur}s`} repeatCount="indefinite" path={d} />
        </circle>
      ) : null}
    </svg>
  );
}

function ModeCard({ m, delay }: { m: (typeof modes)[number]; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <Reveal delay={delay}>
      <div
        ref={ref}
        className="group h-full overflow-hidden rounded-lg border border-border bg-card/70 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-elevated"
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={m.img}
            alt={m.alt}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        </div>
        <div className="p-7">
          <m.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
          <h3 className="mt-6 font-display text-lg font-medium tracking-tight text-foreground">{m.title}</h3>
          <p className="mt-2 font-sans text-sm text-muted-foreground">{m.body}</p>
          <RouteLine d={m.path} dur={m.dur} active={inView} />
        </div>
      </div>
    </Reveal>
  );
}

export function Logistics() {
  return (
    <div className="corridor-glow-center glow-animate">
      <Section id="logistics">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Every Way Goods Move</Eyebrow>
            <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-foreground md:text-4xl lg:text-[2.75rem]">
              A deal is only closed when the goods arrive. We track every route.
            </h2>
            <p className="mt-7 font-sans text-base leading-relaxed text-secondary-foreground">
              Commodities move by sea, by air, and by road. Corridor One X tracks the shipment across whichever mode
              fits the commodity, the volume, and the timeline, and holds escrow until delivery is confirmed.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {modes.map((m, i) => (
            <ModeCard key={m.title} m={m} delay={i * 130} />
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col gap-4 rounded-lg border border-border bg-card/40 p-7 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-sm tracking-tight text-foreground">
              <span className="text-muted-foreground">Active corridors</span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                India to UAE
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                India to Oman
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                India to Saudi Arabia
              </span>
            </div>
            <p className="font-sans text-sm text-muted-foreground">
              New corridors activate on verified trader demand.
            </p>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
