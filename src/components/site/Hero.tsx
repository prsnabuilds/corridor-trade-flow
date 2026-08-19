import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { XMark } from "./XMark";

const ContainerScene = lazy(() => import("./ContainerScene"));

const stages = [
  {
    label: "Listed",
    copy: "Every commodity listed with verified grade, quantity, and origin, checked before the deal begins.",
  },
  {
    label: "Matched",
    copy: "AI surfaces a verified counterparty on spec, corridor, and Trust Score. Identities stay masked.",
  },
  {
    label: "Secured",
    copy: "Terms locked, escrow funded, identity revealed only when the deal is safe.",
  },
  {
    label: "Delivered",
    copy: "Goods move, delivery confirmed, funds release, Trust Scores update. Deal closed.",
  },
];

const headline = "Trade direct. Settle certain. No unverified hands in between.";
const subhead =
  "Corridor One X connects verified producers, exporters, and importers directly. AI matching, autonomous settlement, and escrow-secured payment. The deal you agree to is the deal that closes.";

function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-background">
      <div className="hero-aura hero-aura-a" />
      <div className="hero-aura hero-aura-b" />
      <div className="hero-aura hero-aura-c" />
    </div>
  );
}

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

function StageCallout({
  label,
  side,
  opacity,
}: {
  label: string;
  side: "left" | "right";
  opacity: number;
}) {
  const active = opacity > 0.02;
  const shift = (1 - opacity) * (side === "right" ? 42 : -42);
  return (
    <div
      aria-hidden={opacity < 0.5}
      className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
      style={{ opacity, visibility: active ? "visible" : "hidden" }}
    >
      <div
        className="deal-callout absolute top-1/2 -translate-y-1/2"
        style={{
          [side === "right" ? "right" : "left"]: "2%",
          transform: `translate3d(${shift}px, -50%, 0)`,
          transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className={`flex items-center gap-3 ${side === "right" ? "flex-row-reverse" : ""}`}>
          {/* bracketed node */}
          <span className="relative grid size-7 shrink-0 place-items-center">
            <span className="absolute inset-0 rounded-[3px] border border-accent/70" />
            <span className="deal-callout-pulse absolute inset-0 rounded-[3px] border border-accent/50" />
            <XMark className="size-3.5 text-accent" />
          </span>
          {/* dotted connector */}
          <span
            className={`deal-callout-line h-px w-10 shrink-0 md:w-16 ${side === "right" ? "origin-right" : "origin-left"}`}
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, var(--accent) 0 4px, transparent 4px 9px)",
            }}
          />
          {/* compact label pill */}
          <div className="deal-callout-box rounded-md border border-accent/25 bg-card/85 px-3 py-1.5 backdrop-blur-sm">
            <p className="font-display text-[0.68rem] tracking-[0.02em] text-accent uppercase">{label}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StageDescription({
  label,
  copy,
  side,
  opacity,
}: {
  label: string;
  copy: string;
  side: "left" | "right";
  opacity: number;
}) {
  const active = opacity > 0.02;
  const shift = (1 - opacity) * (side === "right" ? 48 : -48);
  return (
    <div
      aria-hidden={opacity < 0.5}
      className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
      style={{ opacity, visibility: active ? "visible" : "hidden" }}
    >
      <div
        className="absolute top-1/2 w-full max-w-xs -translate-y-1/2 px-6 md:max-w-sm"
        style={{
          [side === "right" ? "right" : "left"]: "0%",
          transform: `translate3d(${shift}px, -50%, 0)`,
          transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          textAlign: side === "right" ? "right" : "left",
        }}
      >
        <p className="font-display text-[0.68rem] tracking-[0.02em] text-accent uppercase">{label}</p>
        <p className="mt-3 font-sans text-base leading-relaxed text-secondary-foreground md:text-lg">{copy}</p>
      </div>
    </div>
  );
}

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const smooth = (v: number) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [p, setP] = useState(0);
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
      const v = clamp(-el.getBoundingClientRect().top / Math.max(total, 1));
      progress.current = v;
      setP(v);
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

  // stage 0 fades out as soon as scrolling starts
  const op0 = 1 - smooth(p / 0.055);

  // stages 1..4 each own a fifth of the scroll, with a long full-opacity dwell
  const seg = 1 / 5;
  const stageOp = (i: number) => {
    const local = (p - (i + 1) * seg) / seg; // 0..1 within the stage window
    if (local < 0 || local > 1) return 0;
    return Math.min(smooth(local / 0.16), smooth((1 - local) / 0.16));
  };

  if (ready && mobile) {
    return (
      <section id="top" className="relative overflow-hidden px-6 pt-32 pb-20">
        <AmbientBackdrop />
        <div className="relative mx-auto w-full max-w-6xl">
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
    <section ref={sectionRef} id="top" className="relative h-[760vh]">
      <div className="sticky top-0 h-screen min-h-[640px] overflow-hidden">
        <AmbientBackdrop />

        <div className="absolute inset-y-0 right-0 w-full md:w-[58%]">
          <SceneFrame progress={progress} />
        </div>

        <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6">
          <div
            className="relative w-full max-w-xl"
            style={{ opacity: op0, pointerEvents: op0 > 0.5 ? "auto" : "none" }}
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
        </div>

        {/* stage callouts attached to the container */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[18%] mx-auto max-w-7xl px-6">
          {stages.map((s, i) => (
            <StageCallout
              key={`callout-${s.label}`}
              label={s.label}
              side="right"
              opacity={stageOp(i)}
            />
          ))}
        </div>

        {/* stage descriptions on the left side */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[18%] mx-auto max-w-7xl px-6">
          {stages.map((s, i) => (
            <StageDescription
              key={`desc-${s.label}`}
              label={s.label}
              copy={s.copy}
              side="left"
              opacity={stageOp(i)}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: op0 }}
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
