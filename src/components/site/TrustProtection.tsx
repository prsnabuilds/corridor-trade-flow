import { Eyebrow, Reveal } from "./primitives";

const columns = [
  {
    title: "Trust Score (0 to 1000)",
    body: "A single number every trader carries, built only from verified, closed-loop signals.",
    items: [
      "KYC and identity: 30%",
      "Trade history: 30%",
      "On-time delivery: 25%",
      "Dispute rate: 15%",
    ],
  },
  {
    title: "Verification",
    body: "Every counterparty cleared before they can transact.",
    items: [
      "Business KYB & beneficial ownership",
      "Export/import licence checks",
      "Bank & GST validation",
      "Trade-reference cross-verification",
    ],
  },
  {
    title: "Escrow & Payment Safety",
    body: "Regulated escrow via Razorpay with segregated accounts.",
    items: [
      "Milestone-based release (load, ship, deliver)",
      "Dispute window before final release",
      "Full audit trail",
      "Segregated client accounts",
    ],
  },
];

export function TrustProtection() {
  return (
    <section id="trust" className="bg-light-surface px-6 py-24 text-ink md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="light">Trust, Verified. Money, Protected.</Eyebrow>
            <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-ink md:text-4xl lg:text-[2.75rem]">
              Every counterparty verified. Every rupee in escrow.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {columns.map((c, i) => (
            <Reveal key={c.title} delay={i * 90}>
              <div className="h-full border-t border-ink/15 pt-7">
                <h3 className="font-display text-xl font-medium tracking-tight text-ink">{c.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink/65">{c.body}</p>
                <ul className="mt-6 space-y-3">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-3 font-sans text-sm text-ink/80">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
