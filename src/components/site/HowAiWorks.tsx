import { Search, Gauge, Repeat, ShieldAlert, Radar } from "lucide-react";
import { Eyebrow, Reveal, Section } from "./primitives";

const points = [
  {
    icon: Search,
    title: "Matches on more than commodity.",
    body: "The AI weighs commodity type, grade, volume, corridor, price expectation, and trust history together, not just a keyword search. It finds counterparties a manual search would miss.",
  },
  {
    icon: Gauge,
    title: "Ranks by likelihood to close.",
    body: "Every match is scored on fit and on both parties' verified track records, so the strongest, safest deals surface first.",
  },
  {
    icon: Repeat,
    title: "Learns from every closed deal.",
    body: "Each completed transaction sharpens the model: better matches, better pricing signals, better risk detection with every deal on the platform.",
  },
  {
    icon: ShieldAlert,
    title: "Flags risk before it costs you.",
    body: "The AI reads patterns across verified trade data to surface counterparty and delivery risk early, so a deal is protected before it's signed, not after it fails.",
  },
  {
    icon: Radar,
    title: "Works while you don't.",
    body: "The market moves constantly. The AI monitors it continuously and alerts you the moment a matching, verified opportunity appears.",
  },
];

export function HowAiWorks() {
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

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 130} className={i === 4 ? "md:col-span-2" : ""}>
              <div className="group h-full rounded-lg border border-border bg-card/70 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-elevated">
                <p.icon
                  className="h-5 w-5 text-accent transition-transform duration-500 ease-out group-hover:scale-110"
                  strokeWidth={1.5}
                />
                <h3 className="mt-6 font-display text-lg leading-snug font-medium tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-secondary-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
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
