import { Eyebrow, Reveal, Section } from "./primitives";
import problemImg from "@/assets/problem.jpg";

const cards = [
  "Deals negotiated with zero identity verification.",
  "No recourse when a deal fails mid-transaction.",
  "No infrastructure built for cross-border SME commodity trade, until now.",
];

export function Problem() {
  return (
    <Section id="problem">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <Eyebrow>The Status Quo</Eyebrow>
          <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-foreground md:text-4xl lg:text-[2.75rem]">
            Multi-crore deals. Still closed on a phone call and blind trust.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="font-sans text-base leading-relaxed text-secondary-foreground lg:pt-14">
            Every year, thousands of producers, exporters, and importers negotiate deals worth hundreds of thousands
            of dollars through unverified contacts and informal arrangements. No verified identity. No enforceable
            terms. No protection on the payment. When a deal collapses, and they do, there is no recourse, and the
            goods, the margin, or the money are simply gone.
          </p>
        </Reveal>
      </div>

      <Reveal delay={60}>
        <div className="relative mt-16 overflow-hidden rounded-lg border border-border">
          <img
            src={problemImg}
            alt="Dim trading desk with paperwork and a landline telephone"
            loading="lazy"
            width={1536}
            height={1024}
            className="h-[18rem] w-full object-cover opacity-70 grayscale-[0.4] md:h-[26rem]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30"
          />
          <p className="absolute bottom-0 left-0 max-w-md p-7 font-display text-lg leading-snug tracking-tight text-foreground md:text-xl">
            Handshake deals, unverified contacts, and paperwork no one can enforce.
          </p>
        </div>
      </Reveal>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c} delay={i * 90}>
            <div className="h-full rounded-lg border border-border bg-card p-7 transition-colors hover:border-accent/40 hover:bg-elevated">
              <span className="font-display text-xs tracking-[0.02em] text-accent">0{i + 1}</span>
              <p className="mt-5 font-display text-lg leading-snug tracking-tight text-foreground">{c}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
