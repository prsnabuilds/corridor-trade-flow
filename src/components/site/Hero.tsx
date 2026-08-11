import { Eyebrow, Reveal } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="corridor-glow relative overflow-hidden px-6 pt-40 pb-28 md:pt-52 md:pb-40">
      {/* faint corridor arcs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]">
        <svg className="h-full w-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="arc" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#C4D82E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C4D82E" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${-200 - i * 160} 760 Q600 ${420 - i * 90} ${1400 + i * 160} 760`}
              stroke="url(#arc)"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      <div className="mx-auto w-full max-w-5xl text-center">
        <Reveal>
          <Eyebrow>The Next Generation of Commodity Trade Infrastructure</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-7 font-display text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Trade direct. Settle certain.
            <br className="hidden sm:block" /> No unverified hands in between.
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-secondary-foreground md:text-lg">
            Corridor One X connects verified producers, exporters, and importers directly — with AI matching,
            autonomous settlement, and escrow-secured payment. The deal you agree to is the deal that closes.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#book-a-demo"
              className="w-full rounded-md bg-accent px-6 py-3.5 font-display text-sm font-medium tracking-tight text-accent-foreground transition-all hover:bg-accent-hover active:bg-accent-pressed sm:w-auto"
            >
              Book a Demo
            </a>
            <a
              href="#how-it-works"
              className="w-full rounded-md border border-border px-6 py-3.5 font-display text-sm font-medium tracking-tight text-foreground transition-colors hover:border-accent/50 hover:bg-card sm:w-auto"
            >
              See How It Works
            </a>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <p className="mx-auto mt-12 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground">
            Built for traders moving cross-border volume in agriculture, food, crude oil, and minerals across the
            India–Gulf corridor.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
