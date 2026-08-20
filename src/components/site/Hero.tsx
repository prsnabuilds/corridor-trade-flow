import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-scrub.mp4";

const headline = "Trade direct. Settle certain. No unverified hands in between.";
const subhead =
  "Corridor One X connects verified producers, exporters, and importers directly. AI matching, autonomous settlement, and escrow-secured payment. The deal you agree to is the deal that closes.";

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

/** Portion of the hero scroll spent flying through the logo's negative space. */
const PORTAL_END = 0.26;

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

/** Interior negative space of the Corridor One X mark (centred on 0,0). */
const HOLE =
  "M0 -4.1 C0.5 -1.4 1.4 -0.5 4.1 0 C1.4 0.5 0.5 1.4 0 4.1 C-0.5 1.4 -1.4 0.5 -4.1 0 C-1.4 -0.5 -0.5 -1.4 0 -4.1 Z";

const ARMS = [
  "M16.1341 1.35123L10.6643 4.88673C9.6445 5.54589 8.33295 5.5459 7.31314 4.88673L1.84338 1.35123L2.71685 0L8.18656 3.53545C8.67479 3.85102 9.30267 3.85101 9.7909 3.53545L15.2607 0L16.1341 1.35123Z",
  "M1.84358 16.6302L7.31334 13.0947C8.33316 12.4356 9.64471 12.4355 10.6645 13.0947L16.1343 16.6302L15.2608 17.9814L9.7911 14.446C9.30288 14.1304 8.67499 14.1304 8.18676 14.446L2.717 17.9814L1.84358 16.6302Z",
  "M16.6281 16.1351L13.0926 10.6653C12.4335 9.64548 12.4335 8.33393 13.0926 7.31412L16.6281 1.84436L17.9794 2.71783L14.4439 8.18754C14.1284 8.67576 14.1284 9.30365 14.4439 9.79188L17.9794 15.2616L16.6281 16.1351Z",
  "M1.35148 1.84615L4.88698 7.31591C5.54614 8.33572 5.54614 9.64727 4.88698 10.6671L1.35148 16.1368L0.000244179 15.2634L3.53569 9.79367C3.85126 9.30544 3.85126 8.67755 3.53569 8.18932L0.000244727 2.71957L1.35148 1.84615Z",
];

/**
 * Full-bleed dark plate with the mark's negative space punched out. Scaling the
 * group up reads as the camera flying through the opening into the hero.
 */
function Portal({ progress }: { progress: number }) {
  const k = Math.pow(70, progress);
  const armOpacity = 1 - clamp((progress - 0.55) / 0.35);

  if (progress >= 1) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-30">
      <svg
        viewBox="-100 -100 200 200"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <mask id="portal-mask" maskUnits="userSpaceOnUse" x="-100" y="-100" width="200" height="200">
            <rect x="-100" y="-100" width="200" height="200" fill="#fff" />
            <g transform={`scale(${k})`}>
              <path d={HOLE} fill="#000" />
            </g>
          </mask>
        </defs>
        <rect
          x="-100"
          y="-100"
          width="200"
          height="200"
          fill="var(--background)"
          mask="url(#portal-mask)"
        />
        <g transform={`scale(${k}) translate(-9 -9)`} opacity={armOpacity}>
          {ARMS.map((d) => (
            <path key={d.slice(0, 12)} d={d} fill="var(--accent)" />
          ))}
        </g>
      </svg>
    </div>
  );
}

// Anchored to the stacked containers on deck (cargo runs diagonally
// from upper-left to lower-right of the ship in the wireframe state).
const CALLOUTS = [
  { label: "Verified", at: 0.56, x: "56%", y: "17%" },
  { label: "Matched", at: 0.68, x: "64%", y: "32%" },
  { label: "Secured", at: 0.8, x: "72%", y: "49%" },
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

function HeroCopy({ subheadOpacity, opacity = 1 }: { subheadOpacity: number; opacity?: number }) {
  return (
    <div
      className="relative mx-auto flex h-full w-full max-w-6xl items-center px-5 sm:px-6"
      style={{ opacity }}
    >
      <div className="w-full max-w-xl">
        <h1 className="hero-line font-display text-[2rem] leading-[1.06] font-medium tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
          {headline}
        </h1>
        <p
          className="hero-line mt-6 max-w-lg font-sans text-[0.95rem] leading-relaxed text-secondary-foreground transition-opacity duration-300 sm:mt-8 sm:text-base"
          style={{ animationDelay: "220ms", opacity: subheadOpacity }}
        >
          {subhead}
        </p>
        <div className="hero-line mt-8 sm:mt-10" style={{ animationDelay: "340ms" }}>
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
    const mq = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
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
      target.current = clamp((v - PORTAL_END) / (1 - PORTAL_END));
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

  const portal = clamp(p / PORTAL_END);
  const scrub = clamp((p - PORTAL_END) / (1 - PORTAL_END));
  const subheadOpacity = 1 - clamp((scrub - 0.25) / 0.35) * 0.9;
  const copyOpacity = clamp((portal - 0.6) / 0.35);

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
          preload="metadata"
        />
        <Overlay />
        <div className="relative py-28 sm:py-32">
          <HeroCopy subheadOpacity={1} />
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="top" className="relative h-[420vh]">
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

        <div aria-hidden className="pointer-events-none absolute inset-0">
          {CALLOUTS.map((c) => (
            <WireCallout
              key={c.label}
              label={c.label}
              x={c.x}
              y={c.y}
              progress={clamp((scrub - c.at) / 0.09)}
            />
          ))}
        </div>

        <div className="relative h-full">
          <HeroCopy subheadOpacity={subheadOpacity} opacity={copyOpacity} />
        </div>

        <Portal progress={portal} />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 z-40 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: 1 - clamp(p / 0.06) }}
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
