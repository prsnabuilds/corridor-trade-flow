import { Search, Gauge, Repeat, ShieldAlert, Radar } from "lucide-react";
import { Eyebrow, Reveal, Section, useScrollProgress } from "./primitives";

const steps = [
  {
    icon: Search,
    stage: "Ingest",
    title: "Matches on more than commodity.",
    body: "The AI weighs commodity type, grade, volume, corridor, price expectation, and trust history together, not just a keyword search. It finds counterparties a manual search would miss.",
  },
  {
    icon: Gauge,
    stage: "Score",
    title: "Ranks by likelihood to close.",
    body: "Every match is scored on fit and on both parties' verified track records, so the strongest, safest deals surface first.",
  },
  {
    icon: ShieldAlert,
    stage: "Screen",
    title: "Flags risk before it costs you.",
    body: "The AI reads patterns across verified trade data to surface counterparty and delivery risk early, so a deal is protected before it's signed, not after it fails.",
  },
  {
    icon: Radar,
    stage: "Monitor",
    title: "Works while you don't.",
    body: "The market moves constantly. The AI monitors it continuously and alerts you the moment a matching, verified opportunity appears.",
  },
  {
    icon: Repeat,
    stage: "Learn",
    title: "Learns from every closed deal.",
    body: "Each completed transaction sharpens the model: better matches, better pricing signals, better risk detection with every deal on the platform.",
  },
];

/** Small reticle node that "locks on" when the scroll line reaches it. */
function Node({ active, index }: { active: boolean; index: number }) {
  return (
    <span
      className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-[3px] border border-dashed transition-all duration-700 ${
        active ? "border-accent/70 bg-accent/10" : "border-border bg-card"
      }`}
    >
      <span
        className={`font-display text-xs tracking-tight transition-colors duration-700 ${
          active ? "text-accent" : "text-muted-foreground"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map(
        (pos) => (
          <span
            key={pos}
            className={`absolute h-1.5 w-1.5 transition-all duration-700 ${
              active ? "bg-accent opacity-100" : "bg-border opacity-60"
            } ${pos}`}
          />
        ),
      )}
      {active && <span className="deal-callout-pulse absolute inset-0 rounded-[3px] border border-accent/50" />}
    </span>
  );
}

export function HowAiWorks() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <div className="corridor-glow-center glow-animate">
      <Section id="how-the-ai-works" className="hairline-top">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>The Intelligence Layer</Eyebrow>
            <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-foreground md:text-4xl lg:text-[2.75rem]">
              The AI behind every match.
            </h2>
            <p className="mt-7 font-sans text-base leading-relaxed text-secondary-foreground">
              Corridor One X doesn't wait for you to find the right counterparty. Its AI reads every verified
              listing, requirement, and Trust Score across the network, and surfaces the deals that actually fit,
              ranked by how likely they are to close.
            </p>
          </Reveal>
        </div>

        {/* process rail */}
        <div ref={ref} className="relative mt-16 pl-2 md:pl-4">
          {/* static track + drawn lime line */}
          <span className="pointer-events-none absolute left-[26px] top-6 bottom-6 w-px bg-border md:left-[30px]" />
          <span
            className="pointer-events-none absolute left-[26px] top-6 w-px origin-top bg-accent transition-[height] duration-300 ease-out md:left-[30px]"
            style={{ height: `calc((100% - 3rem) * ${progress})` }}
          />

          <ol className="space-y-6">
            {steps.map((s, i) => {
              const active = progress > (i + 0.35) / steps.length;
              return (
                <li key={s.title} className="relative flex items-start gap-5 md:gap-7">
                  <Node active={active} index={i} />
                  <div
                    className={`flex-1 rounded-lg border p-6 transition-all duration-700 md:p-7 ${
                      active
                        ? "-translate-y-0.5 border-accent/35 bg-elevated"
                        : "border-border bg-card/60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <s.icon
                        className={`h-4 w-4 transition-colors duration-700 ${
                          active ? "text-accent" : "text-muted-foreground"
                        }`}
                        strokeWidth={1.5}
                      />
                      <span className="font-display text-[0.72rem] uppercase tracking-[0.02em] text-muted-foreground">
                        {s.stage}
                      </span>
                      <span className="h-px flex-1 border-t border-dashed border-border" />
                    </div>
                    <h3 className="mt-4 font-display text-lg leading-snug font-medium tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-secondary-foreground">{s.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal delay={120}>
          <p className="mt-14 max-w-3xl border-l-2 border-accent pl-8 font-display text-xl leading-snug font-medium tracking-[-0.03em] text-accent md:text-2xl">
            You decide the deal. The AI makes sure the right one reaches you.
          </p>
        </Reveal>
      </Section>
    </div>
  );
}
