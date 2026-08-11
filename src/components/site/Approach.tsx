import { Cpu, BadgeCheck, Workflow, ShieldCheck } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";

const pillars = [
  { icon: Cpu, title: "AI Matching", body: "Counterparties surfaced by AI on spec fit and Trust Score." },
  { icon: BadgeCheck, title: "Verified Identity", body: "Every party cleared before they can trade." },
  { icon: Workflow, title: "Autonomous Settlement", body: "The platform executes the deal flow end to end." },
  { icon: ShieldCheck, title: "Escrow Protection", body: "Funds held until delivery is confirmed." },
];

export function Approach() {
  return (
    <Section className="hairline-top">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>The Corridor One X Approach</Eyebrow>
          <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-foreground md:text-4xl lg:text-[2.75rem]">
            Verified before contact. Autonomous through settlement.
          </h2>
          <p className="mt-7 font-sans text-base leading-relaxed text-secondary-foreground">
            Corridor One X does not digitise the old way of trading. It replaces it. Identity is verified before any
            deal begins. Counterparties are matched by AI across commodity, volume, corridor, and trust history.
            Terms are locked in a signed Letter of Intent. Payment is held in escrow and released only on confirmed
            delivery — all executed through the platform, without a chain of unverified hands.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="bg-card">
            <div className="h-full bg-card p-7 transition-colors hover:bg-elevated">
              <p.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-base font-medium tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
