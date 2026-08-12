import { Ship, Plane, Truck } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";
import { GlobePulse, type PulseMarker } from "@/components/ui/cobe-globe-pulse";
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
  },
  {
    icon: Plane,
    title: "Airways",
    body: "Air freight for time-sensitive cargo.",
    img: airImg,
    alt: "Cargo aircraft loading at night",
  },
  {
    icon: Truck,
    title: "Roadways",
    body: "Overland and last-mile transport.",
    img: roadImg,
    alt: "Freight trucks on a highway at night",
  },
];

function ModeCard({ m, delay }: { m: (typeof modes)[number]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div
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
        </div>
      </div>
    </Reveal>
  );
}

const corridorMarkers: PulseMarker[] = [
  { id: "india", label: "India", location: [22.83, 69.72], delay: 0, labelOffset: [24, 14] },
  { id: "uae", label: "UAE", location: [25.01, 55.06], delay: 0.4, labelOffset: [4, -22] },
  { id: "oman", label: "Oman", location: [24.47, 56.63], delay: 0.8, labelOffset: [22, 20] },
  { id: "saudi", label: "Saudi Arabia", location: [26.43, 50.1], delay: 1.2, labelOffset: [-78, -12] },
];

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
          <div className="mt-12 grid items-center gap-10 rounded-lg border border-border bg-card/40 p-7 md:grid-cols-2">
            <div className="mx-auto w-full max-w-sm">
              <GlobePulse markers={corridorMarkers} speed={0.0012} initialPhi={3.84} />
            </div>
            <div>
              <p className="font-display text-sm tracking-[0.02em] text-muted-foreground uppercase">
                Active corridors
              </p>
              <ul className="mt-5 space-y-3 font-display text-base tracking-tight text-foreground">
                {corridorMarkers.filter((m) => m.id !== "india").map((m) => (
                  <li key={m.id} className="flex items-center gap-3">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                    India to {m.label}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-sans text-sm text-muted-foreground">
                New corridors activate on verified trader demand.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
