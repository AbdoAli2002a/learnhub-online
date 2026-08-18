import { createFileRoute, Link } from "@tanstack/react-router";
import { TransversalDiagram } from "@/components/diagrams";
import { Section } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Parallelism — Lesson 3 Geometry Study Guide" },
      {
        name: "description",
        content:
          "Interactive lesson on parallelism: transversals, corresponding, alternating and co-interior angles, worked proofs, exercises and learning games.",
      },
      { property: "og:title", content: "Parallelism — Lesson 3 Geometry Study Guide" },
      {
        property: "og:description",
        content:
          "Learn angle pairs formed by a transversal, prove lines are parallel, and practise with interactive games.",
      },
    ],
  }),
  component: Index,
});

const OUTCOMES = [
  "Understand the concept of parallelism.",
  "Identify the angles formed when a straight line intersects two other straight lines.",
  "Recognise corresponding angles.",
  "Recognise alternating (alternate) angles.",
  "Recognise interior angles on the same side of a transversal.",
  "Relate the angles formed when a transversal cuts two parallel lines.",
  "Prove that two straight lines are parallel.",
  "Write a clear geometric proof.",
];

const VOCAB = [
  { term: "Parallelism", def: "Two coplanar straight lines that never meet, however far they extend." },
  { term: "Transversal", def: "A straight line that cuts two or more straight lines at two different points." },
  { term: "Corresponding angles", def: "Same side of the transversal, one interior and one exterior, not adjacent." },
  { term: "Alternating angles", def: "On opposite sides of the transversal, not adjacent — both interior or both exterior." },
  { term: "Interior angles (same side)", def: "Two interior angles lying on the same side of the transversal." },
];

const MAP = [
  { to: "/angle-pairs", n: "01", t: "Pairs of angles formed by a transversal", d: "Interior, exterior, corresponding, alternating and co-interior angles." },
  { to: "/parallel-lines", n: "02", t: "The relation when the two lines are parallel", d: "Equal in measure or supplementary — with worked examples." },
  { to: "/proofs", n: "03", t: "Proving two lines are parallel & writing proofs", d: "The three conditions, plus a six-step method for a clean proof." },
  { to: "/exercises", n: "04", t: "Exercise 13 — graded questions", d: "Complete, find x, true/false and multiple-choice questions." },
  { to: "/activities", n: "05", t: "Activities, drills & learning games", d: "Angle hunter, proof builder, timed challenge and a parallel-line lab." },
] as const;

function Index() {
  return (
    <>
      <div className="border-b border-border paper">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Unit 3 · Geometry and Measurement · Lesson Three
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl">Parallelism</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              When a transversal crosses two straight lines it creates eight angles. This guide
              explains every pair, shows what changes when the two lines are parallel, and trains
              you to write proofs that hold up.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/angle-pairs"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start the lesson
              </Link>
              <Link
                to="/activities"
                className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                Jump to games
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <TransversalDiagram highlight={[1, 5]} className="w-full" />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Lines <em>m</em> ∥ <em>n</em> cut by transversal <em>t</em>: ∠1 and ∠5 are
              corresponding angles.
            </p>
          </div>
        </div>
      </div>

      <Section title="Learning outcomes">
        <ul className="grid gap-3 sm:grid-cols-2">
          {OUTCOMES.map((o, i) => (
            <li key={o} className="flex gap-3 rounded-md border border-border bg-card p-4">
              <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm leading-relaxed">{o}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Vocabulary">
        <dl className="grid gap-4 md:grid-cols-2">
          {VOCAB.map((v) => (
            <div key={v.term} className="rule-accent bg-card py-2 pl-4">
              <dt className="font-display text-lg">{v.term}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.def}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Lesson map">
        <div className="grid gap-4">
          {MAP.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="group flex items-start gap-5 rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <span className="font-display text-2xl text-accent">{m.n}</span>
              <span>
                <span className="block font-semibold group-hover:text-accent">{m.t}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{m.d}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
