import { useEffect, useState } from "react";
import heroBg from "@/assets/c1x-hero-bg.png.asset.json";

function XMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className={className} aria-hidden>
      <path
        d="M16.1341 1.35123L10.6643 4.88673C9.6445 5.54589 8.33295 5.5459 7.31314 4.88673L1.84338 1.35123L2.71685 0L8.18656 3.53545C8.67479 3.85102 9.30267 3.85101 9.7909 3.53545L15.2607 0L16.1341 1.35123Z"
        fill="currentColor"
      />
      <path
        d="M1.84358 16.6302L7.31334 13.0947C8.33316 12.4356 9.64471 12.4355 10.6645 13.0947L16.1343 16.6302L15.2608 17.9814L9.7911 14.446C9.30288 14.1304 8.67499 14.1304 8.18676 14.446L2.717 17.9814L1.84358 16.6302Z"
        fill="currentColor"
      />
      <path
        d="M16.6281 16.1351L13.0926 10.6653C12.4335 9.64548 12.4335 8.33393 13.0926 7.31412L16.6281 1.84436L17.9794 2.71783L14.4439 8.18754C14.1284 8.67576 14.1284 9.30365 14.4439 9.79188L17.9794 15.2616L16.6281 16.1351Z"
        fill="currentColor"
      />
      <path
        d="M1.35148 1.84615L4.88698 7.31591C5.54614 8.33572 5.54614 9.64727 4.88698 10.6671L1.35148 16.1368L0.000244179 15.2634L3.53569 9.79367C3.85126 9.30544 3.85126 8.67755 3.53569 8.18932L0.000244727 2.71957L1.35148 1.84615Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Reticle + label callout that animates in on first load. */
function DealCallout() {
  return (
    <div className="deal-callout pointer-events-none absolute right-[16%] top-[46%] hidden items-center gap-0 md:flex">
      <span className="deal-callout-label rounded-md border border-accent/45 bg-background/70 px-3 py-1.5 font-sans text-sm text-accent backdrop-blur-md">
        Deal Locked
      </span>
      <span className="deal-callout-line h-px w-14 origin-left border-t border-dashed border-accent/60" />
      <span className="deal-callout-box relative grid h-14 w-14 place-items-center rounded-[3px] border border-dashed border-accent/70">
        <XMark className="h-5 w-5 text-accent" />
        {["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map(
          (pos) => (
            <span key={pos} className={`absolute h-1.5 w-1.5 bg-accent ${pos}`} />
          ),
        )}
        <span className="deal-callout-pulse absolute inset-0 rounded-[3px] border border-accent/60" />
      </span>
    </div>
  );
}

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      setOffset(Math.min(window.scrollY, window.innerHeight));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const fade = Math.max(0, 1 - offset / 620);

  return (
    <section id="top" className="relative flex h-screen min-h-[640px] items-center overflow-hidden">
      {/* full-bleed hero imagery, scrolls slower than the page for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-y-[15%] inset-x-0 -z-10"
        style={{
          transform: `translate3d(0, ${(offset * 0.18).toFixed(2)}px, 0) scale(1.06)`,
          opacity: Math.max(0, 1 - offset / 780),
        }}
      >
        <img
          src={heroBg.url}
          alt=""
          className="h-full w-full object-cover object-right"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-transparent to-background" />
      </div>

      <DealCallout />

      <div
        className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:pt-40"
        style={{ opacity: fade, transform: `translate3d(0, ${(offset * -0.06).toFixed(2)}px, 0)` }}
      >
        <div className="max-w-2xl">
          <h1 className="hero-line font-display text-5xl leading-[1.02] font-medium tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
            Commodity trade,
            <br />
            now AI-native.
          </h1>
          <p className="hero-line mt-8 max-w-xl font-sans text-base leading-relaxed text-secondary-foreground md:text-lg" style={{ animationDelay: "220ms" }}>
            Corridor One X connects verified producers, exporters, and importers directly. AI matching, autonomous
            settlement, and escrow-secured payment. The deal you agree to is the deal that closes.
          </p>
          <div className="hero-line mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "340ms" }}>
            <a
              href="#book-a-demo"
              className="rounded-md bg-accent px-6 py-3.5 text-center font-display text-sm font-medium tracking-tight text-accent-foreground transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 active:bg-accent-pressed"
            >
              Book a Demo
            </a>
            <a
              href="#how-it-works"
              className="rounded-md border border-border bg-background/40 px-6 py-3.5 text-center font-display text-sm font-medium tracking-tight text-foreground backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 hover:bg-card"
            >
              See How It Works
            </a>
          </div>
          <p className="hero-line mt-24 max-w-md font-sans text-sm leading-relaxed text-muted-foreground" style={{ animationDelay: "460ms" }}>
            Built for traders moving cross-border volume in agriculture, food, crude oil, and minerals across the
            India-Gulf corridor.
          </p>
        </div>
      </div>
    </section>
  );
}
