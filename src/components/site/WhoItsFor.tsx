import { Eyebrow, Reveal } from "./primitives";
import producersImg from "@/assets/who-producers.jpg";
import exportersImg from "@/assets/who-exporters.jpg";
import importersImg from "@/assets/who-importers.jpg";

const audiences = [
  {
    label: "Producers",
    title: "You produced it. Sell it directly.",
    img: producersImg,
    alt: "Producer inspecting bulk grain in a storage silo",
    points: [
      "If you harvest, extract, or manufacture the commodity yourself, you don't need to be an exporter.",
      "Reach verified buyers directly, with no trader in between.",
      "Move low-volume or aging stock before it loses value.",
    ],
  },
  {
    label: "Exporters",
    title: "Stop chasing unverified buyers.",
    img: exportersImg,
    alt: "Exporter with a clipboard at a container yard at dawn",
    points: [
      "Verified buyers with real intent on record.",
      "Get paid through escrow before you take on risk.",
      "Build a Trust Score that travels with you.",
    ],
  },
  {
    label: "Importers",
    title: "Stop wiring money into hope.",
    img: importersImg,
    alt: "Importer checking incoming pallets in a warehouse",
    points: [
      "Verified suppliers with a proven track record.",
      "Quality and documents checked before release.",
      "Funds released only on confirmed delivery.",
    ],
  },
];

export function WhoItsFor() {
  return (
    <section id="who-its-for" className="bg-light-surface-alt px-6 py-24 text-ink md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow tone="light">Who It's For</Eyebrow>
            <h2 className="mt-6 font-display text-3xl leading-[1.1] tracking-[-0.03em] text-ink md:text-4xl lg:text-[2.75rem]">
              One platform. Three sides of the same deal.
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.label} delay={i * 90}>
              <div className="h-full overflow-hidden rounded-lg border border-ink/12 bg-light-surface transition-colors hover:border-ink/30">
                <div className="relative h-52 overflow-hidden bg-background">
                  <img
                    src={a.img}
                    alt={a.alt}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover"
                  />
                  <div aria-hidden className="absolute inset-0 bg-background/25" />
                  <p className="absolute bottom-0 left-0 p-5 font-display text-[0.72rem] uppercase tracking-[0.02em] text-accent">
                    {a.label}
                  </p>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-xl leading-snug font-medium tracking-tight text-ink">
                    {a.title}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {a.points.map((p) => (
                      <li key={p} className="flex gap-3 font-sans text-sm leading-relaxed text-ink/70">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
