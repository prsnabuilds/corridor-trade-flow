const traders = [
  "Meridian Agro Exports",
  "Gulf Basin Commodities",
  "Sahyadri Grain Co.",
  "Al Rayan Trading FZE",
  "Deccan Minerals Ltd.",
  "Levant Foods DMCC",
  "Konkan Bulk Shipping",
  "Oman Continental Import",
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-card/40 py-10">
      <p className="px-6 text-center font-sans text-xs tracking-wide text-muted-foreground">
        Trusted by verified traders moving volume across the India-Gulf corridor.
      </p>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-14 pr-14">
          {[...traders, ...traders].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-display text-sm font-medium tracking-tight whitespace-nowrap text-secondary-foreground/60"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
