import { Eyebrow, Reveal, Section } from "./primitives";

const steps = [
  {
    n: "01",
    title: "Listing",
    body: "Producer or exporter submits commodity, grade, quantity, corridor, and minimum price. Identity verified against GST, IEC, and trade documents.",
  },
  {
    n: "02",
    title: "AI Match",
    body: "Importer submits requirements. Corridor One X's AI matches against verified counterparties, ranked by spec fit and Trust Score. Identities stay masked.",
  },
  {
    n: "03",
    title: "Direct Negotiation",
    body: "Both parties negotiate through a masked relay. Neither identity is revealed.",
  },
  {
    n: "04",
    title: "LOI Signed",
    body: "A digital Letter of Intent is signed. Circumvention protection locks the deal to the platform for 12 months.",
  },
  {
    n: "05",
    title: "Escrow Funded",
    body: "Buyer deposits into licensed escrow via Razorpay. Counterparty identity revealed.",
  },
  {
    n: "06",
    title: "Shipped & Verified",
    body: "Shipping documents verified. Logistics tracked across the route the goods move: sea, air, or road.",
  },
  {
    n: "07",
    title: "Escrow Released",
    body: "Funds released on delivery confirmation. Trust Scores updated. Deal complete.",
  },
];

export function DealFlow() {
  return (
    <Section id="how-it-works" className="hairline-top">
      <div className="max-w-3xl">
        <Reveal>
          <Eyebrow>The Deal Flow</Eyebrow>
          <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-foreground md:text-4xl lg:text-[2.75rem]">
            A $200,000 deal. Closed with certainty. In seven steps.
          </h2>
        </Reveal>
      </div>

      <ol className="mt-16 border-l border-border">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 60}>
            <li className="group relative grid gap-4 py-8 pl-8 md:grid-cols-[7rem_1fr_1.4fr] md:items-baseline md:gap-8">
              <span
                aria-hidden
                className="absolute top-[2.6rem] -left-[4.5px] h-2 w-2 rounded-full bg-border transition-colors group-hover:bg-accent"
              />
              <span className="font-display text-sm tracking-[0.02em] text-accent">{s.n}</span>
              <h3 className="font-display text-xl font-medium tracking-tight text-foreground">{s.title}</h3>
              <p className="font-sans text-sm leading-relaxed text-secondary-foreground">{s.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
