import { Ship, Plane, Truck } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";

const modes = [
  { icon: Ship, title: "Seaways", body: "Bulk port-to-port shipping." },
  { icon: Plane, title: "Airways", body: "Air freight for time-sensitive cargo." },
  { icon: Truck, title: "Roadways", body: "Overland and last-mile transport." },
];

export function Logistics() {
  return (
    <div className="corridor-glow-center">
      <Section id="logistics">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Every Way Goods Move</Eyebrow>
            <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-foreground md:text-4xl lg:text-[2.75rem]">
              A deal is only closed when the goods arrive. We track every route.
            </h2>
            <p className="mt-7 font-sans text-base leading-relaxed text-secondary-foreground">
              Commodities move by sea, by air, and by road. Corridor One X tracks the shipment across whichever mode
              fits the commodity, the volume, and the timeline — and holds escrow until delivery is confirmed.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {modes.map((m, i) => (
            <Reveal key={m.title} delay={i * 90}>
              <div className="h-full rounded-lg border border-border bg-card/70 p-7 transition-colors hover:border-accent/40 hover:bg-elevated">
                <m.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-lg font-medium tracking-tight text-foreground">{m.title}</h3>
                <p className="mt-2 font-sans text-sm text-muted-foreground">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col gap-4 rounded-lg border border-border bg-card/40 p-7 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-sm tracking-tight text-foreground">
              <span className="text-muted-foreground">Active corridors</span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                India → UAE
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                India → Oman
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                India → Saudi Arabia
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
