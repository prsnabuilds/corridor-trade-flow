import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { XMark } from "@/components/site/XMark";

const XMarkScene = lazy(() => import("@/components/site/XMarkScene"));

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function Intro3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const [p, setP] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const v = clamp(-el.getBoundingClientRect().top / Math.max(total, 1));
      const eased = easeInOut(v);
      progressRef.current = eased;
      setP(eased);
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
  }, []);

  const opacity = 1 - clamp((p - 0.35) / 0.5);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(45% 40% at 50% 50%, color-mix(in oklab, var(--accent) 12%, transparent) 0%, transparent 70%)",
            opacity,
          }}
        />

        <div className="absolute inset-0" style={{ opacity }}>
          {mounted && !mobile ? (
            <Suspense
              fallback={
                <div className="grid h-full w-full place-items-center">
                  <XMark className="h-20 w-20 animate-pulse text-accent" />
                </div>
              }
            >
              <XMarkScene progress={progressRef} />
            </Suspense>
          ) : (
            <div className="grid h-full w-full place-items-center">
              <XMark
                className="h-24 w-24 text-accent transition-transform"
                // scale/rotate fallback for mobile & reduced motion
              />
            </div>
          )}
        </div>

        {mobile && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid place-items-center"
            style={{ opacity: 0 }}
          />
        )}

        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{ opacity: 1 - clamp(p / 0.12) }}
        >
          <span className="font-display text-[0.68rem] tracking-[0.02em] text-muted-foreground uppercase">
            Scroll
          </span>
          <span className="relative h-10 w-px bg-border">
            <span className="corridor-particle absolute inset-x-0 top-0 h-3 bg-accent" />
          </span>
        </div>
      </div>
    </section>
  );
}
