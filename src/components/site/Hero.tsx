import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ContainerScene = lazy(() => import("./ContainerScene"));

const stages = [
  {
    label: "Listed",
    copy: "Every commodity is listed with verified grade, quantity, and origin, checked before the deal begins.",
  },
  {
    label: "Matched",
    copy: "AI surfaces a verified counterparty on spec fit, corridor, and Trust Score. Identities stay masked.",
  },
  {
    label: "Secured",
    copy: "Terms are locked, escrow is funded, and identity is revealed only when the deal is safe.",
  },
  {
    label: "Delivered",
    copy: "Goods move, delivery is confirmed, funds release, and Trust Scores update. The deal is closed with certainty.",
  },
];

const headline = "Trade direct. Settle certain. No unverified hands in between.";
const subhead =
  "Corridor One X connects verified producers, exporters, and importers directly. AI matching, autonomous settlement, and escrow-secured payment. The deal you agree to is the deal that closes.";

function SceneFrame({ progress }: { progress: React.RefObject<number> }) {
  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 52%, color-mix(in oklab, var(--accent) 20%, transparent) 0%, transparent 72%)",
        }}
      />
      <Suspense
        fallback={
          <div className="grid h-full w-full place-items-center">
            <div className="h-24 w-40 animate-pulse rounded-md border border-dashed border-accent/40 bg-card/40" />
          </div>
        }
      >
        <ContainerScene progress={progress} />
      </Suspense>
    </div>
  );
}

function HeroCta() {
  return (
    <a
      href="#book-a-demo"
      className="inline-block rounded-md bg-accent px-6 py-3.5 text-center font-display text-sm font-medium tracking-tight text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover active:bg-accent-pressed"
    >
      Book a Demo
    </a>
  );
}

function StageBlock({ label, copy }: { label: string; copy: string }) {
  return (
    <div className="max-w-md">
      <p className="font-display text-[0.72rem] tracking-[0.02em] text-accent uppercase">{label}</p>
      <p className="mt-5 font-display text-2xl leading-[1.25] tracking-[-0.03em] text-foreground md:text-3xl">{copy}</p>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [stageF, setStageF] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    setReady(true);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (mobile) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-el.getBoundingClientRect().top / Math.max(total, 1), 0), 1);
      progress.current = p;
      setStageF(p * 4);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mobile]);

  const op = (i: number) => Math.min(Math.max(1 - Math.abs(stageF - i) * 2.4, 0), 1);

  if (ready && mobile) {
    return (
      <section id="top" className="relative overflow-hidden px-6 pt-32 pb-20">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-foreground">
            {headline}
          </h1>
          <p className="mt-7 font-sans text-base leading-relaxed text-secondary-foreground">{subhead}</p>
          <div className="mt-9">
            <HeroCta />
          </div>
          <div className="mt-12 h-[60vw] min-h-[260px] w-full overflow-hidden rounded-lg border border-border bg-card/40">
            <SceneFrame progress={progress} />
          </div>
          <div className="mt-14 space-y-12">
            {stages.map((s) => (
              <StageBlock key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="top" className="relative h-[500vh]">
      <div className="sticky top-0 h-screen min-h-[640px] overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
          <SceneFrame progress={progress} />
        </div>

        <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6">
          <div className="relative w-full max-w-xl">
            <div
              className="transition-opacity duration-300"
              style={{ opacity: op(0), pointerEvents: op(0) > 0.5 ? "auto" : "none" }}
            >
              <h1 className="hero-line font-display text-4xl leading-[1.04] font-medium tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
                {headline}
              </h1>
              <p
                className="hero-line mt-8 max-w-lg font-sans text-base leading-relaxed text-secondary-foreground"
                style={{ animationDelay: "220ms" }}
              >
                {subhead}
              </p>
              <div className="hero-line mt-10" style={{ animationDelay: "340ms" }}>
                <HeroCta />
              </div>
            </div>

            {stages.map((s, i) => (
              <div
                key={s.label}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-300"
                style={{ opacity: op(i + 1) }}
                aria-hidden={op(i + 1) < 0.5}
              >
                <StageBlock {...s} />
              </div>
            ))}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: op(0) }}
        >
          <span className="font-display text-[0.68rem] tracking-[0.02em] text-muted-foreground uppercase">Scroll</span>
          <span className="relative h-10 w-px bg-border">
            <span className="corridor-particle absolute inset-x-0 top-0 h-3 bg-accent" />
          </span>
        </div>
      </div>
    </section>
  );
}
