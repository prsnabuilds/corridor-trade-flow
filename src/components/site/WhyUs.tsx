import { Eyebrow, Reveal, Section } from "./primitives";

const advantages = [
  "AI-verified matching network",
  "Trust Score 0–1000 per trader",
  "Identity protected until escrow funds",
  "Proprietary closed-deal intelligence",
  "Document verification at every step",
];

export function WhyUs() {
  return (
    <Section className="hairline-top">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>Why Corridor One X Wins</Eyebrow>
          <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-foreground md:text-4xl lg:text-[2.75rem]">
            Early numbers. Compounding moat.
          </h2>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
            What only we have
          </h3>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {advantages.map((a) => (
              <li key={a} className="flex items-center gap-3 py-4 font-display text-base tracking-tight text-foreground">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
            The data flywheel
          </h3>
          <p className="mt-6 font-sans text-base leading-relaxed text-secondary-foreground">
            Every closed deal generates a verified, closed-loop data point no public database holds — counterparty
            reliability, commodity grade accuracy, price benchmark, logistics outcome, payment behaviour. By deal
            500, Corridor One X holds the most valuable proprietary commodity intelligence dataset in the corridor.
            By deal 5,000, no competitor can enter.
          </p>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <blockquote className="mt-20 border-l-2 border-accent pl-8">
          <p className="max-w-3xl font-display text-2xl leading-[1.25] font-medium tracking-[-0.03em] text-accent md:text-3xl lg:text-4xl">
            The moat is not the technology. It is the data no one else will ever have.
          </p>
        </blockquote>
      </Reveal>
    </Section>
  );
}
