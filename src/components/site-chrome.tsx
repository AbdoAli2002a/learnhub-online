import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Overview" },
  { to: "/angle-pairs", label: "Angle Pairs" },
  { to: "/parallel-lines", label: "Parallel Lines" },
  { to: "/proofs", label: "Proofs" },
  { to: "/exercises", label: "Exercises" },
  { to: "/activities", label: "Activities & Games" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          Lesson 3 · <span className="text-accent">Parallelism</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-5 text-sm text-muted-foreground">
        Unit 3 · Geometry and Measurement — Lesson Three: Parallelism. An interactive study
        companion with worked examples, proofs and practice games.
      </div>
    </footer>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="border-b border-border paper">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      </div>
    </div>
  );
}

export function Section({
  title,
  children,
  id,
}: {
  title?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-12">
      {title && <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">{title}</h2>}
      {children}
    </section>
  );
}
