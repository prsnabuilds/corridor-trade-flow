import { Reveal } from "./primitives";

export function FinalCta() {
  return (
    <section id="book-a-demo" className="corridor-glow relative overflow-hidden px-6 py-32 md:py-44">
      <div className="mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-foreground md:text-5xl lg:text-6xl">
            The infrastructure for certain trade.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-7 max-w-xl font-sans text-base leading-relaxed text-secondary-foreground">
            Whether you move 50 tonnes or 5,000, you get the same verification, the same protection, and the same
            direct access to the global market.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-10">
            <a
              href="#book-a-demo"
              className="inline-block rounded-md bg-accent px-7 py-3.5 font-display text-sm font-medium tracking-tight text-accent-foreground transition-colors hover:bg-accent-hover active:bg-accent-pressed"
            >
              Book a Demo
            </a>
          </div>
          <p className="mt-6 font-sans text-sm text-muted-foreground">
            A 20-minute walkthrough of how a verified deal closes on Corridor One X. No obligation.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
