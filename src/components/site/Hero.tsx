import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-scrub.mp4";

const headline = "Trade direct. Settle certain. No unverified hands in between.";
const subhead =
  "Corridor One X connects verified producers, exporters, and importers directly. AI matching, autonomous settlement, and escrow-secured payment. The deal you agree to is the deal that closes.";

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

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

function Overlay() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, var(--background) 92%, transparent) 0%, color-mix(in oklab, var(--background) 55%, transparent) 45%, transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, color-mix(in oklab, var(--background) 88%, transparent) 0%, color-mix(in oklab, var(--background) 45%, transparent) 46%, transparent 78%)",
        }}
      />
    </>
  );
}

const CALLOUTS = [
  { label: "Verified", at: 0.5, x: "58%", y: "38%" },
  { label: "Matched", at: 0.66, x: "72%", y: "55%" },
  { label: "Secured", at: 0.82, x: "62%", y: "70%" },
];

function WireCallout({
  label,
  x,
  y,
  progress,
}: {
  label: string;
  x: string;
  y: string;
  progress: number;
}) {
  const o = clamp(progress);
  return (
    <div
      className="pointer-events-none absolute flex items-center gap-0 transition-opacity duration-500"
      style={{ left: x, top: y, opacity: o, transform: `translate(-4px, -50%)` }}
    >
      <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
        <span className="absolute h-2 w-2 rounded-full bg-accent" />
        <span className="deal-callout-pulse absolute h-2 w-2 rounded-full bg-accent" />
      </span>
      <span
        className="h-px bg-accent/70 origin-left transition-transform duration-700"
        style={{ width: 44, transform: `scaleX(${o})` }}
      />
      <span
        className="ml-2 font-display text-[0.68rem] tracking-[0.02em] whitespace-nowrap text-accent uppercase transition-transform duration-500"
        style={{ transform: `translateX(${(1 - o) * 8}px)` }}
      >
        {label}
      </span>
    </div>
  );
}

function HeroCopy({ subheadOpacity }: { subheadOpacity: number }) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-6xl items-center px-6">
      <div className="w-full max-w-xl">
        <h1 className="hero-line font-display text-4xl leading-[1.04] font-medium tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p
          className="hero-line mt-8 max-w-lg font-sans text-base leading-relaxed text-secondary-foreground transition-opacity duration-300"
          style={{ animationDelay: "220ms", opacity: subheadOpacity }}
        >
          {subhead}
        </p>
        <div className="hero-line mt-10" style={{ animationDelay: "340ms" }}>
          <HeroCta />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const current = useRef(0);
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

  // scroll -> target progress
  useEffect(() => {
    if (mobile) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const v = clamp(-el.getBoundingClientRect().top / Math.max(total, 1));
      target.current = v;
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

  // eased seek loop
  useEffect(() => {
    if (mobile) return;
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const v = videoRef.current;
      if (!v) return;
      const dur = v.duration;
      if (!dur || Number.isNaN(dur)) return;
      current.current += (target.current - current.current) * 0.12;
      const t = clamp(current.current) * (dur - 0.05);
      if (Math.abs(v.currentTime - t) > 1 / 60) {
        try {
          v.currentTime = t;
        } catch {
          /* seek not ready */
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mobile]);

  const subheadOpacity = 1 - clamp((p - 0.25) / 0.35) * 0.9;

  if (ready && mobile) {
    return (
      <section id="top" className="relative min-h-[88vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <Overlay />
        <div className="relative py-32">
          <HeroCopy subheadOpacity={1} />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="top" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen min-h-[640px] overflow-hidden bg-background">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo}
          muted
          playsInline
          preload="auto"
        />
        <Overlay />

        <div className="relative h-full">
          <HeroCopy subheadOpacity={subheadOpacity} />
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: 1 - clamp(p / 0.08) }}
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
