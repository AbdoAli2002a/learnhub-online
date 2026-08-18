import { createFileRoute } from "@tanstack/react-router";
import { AngleFigure, TransversalDiagram } from "@/components/diagrams";
import { PageHeader, Section } from "@/components/site-chrome";

export const Route = createFileRoute("/parallel-lines")({
  head: () => ({
    meta: [
      { title: "Angles Between Two Parallel Lines — Parallelism" },
      {
        name: "description",
        content:
          "When a transversal cuts two parallel lines, angle pairs are either equal in measure or supplementary. Rules plus fully worked examples.",
      },
      { property: "og:title", content: "Angles Between Two Parallel Lines" },
      {
        property: "og:description",
        content: "Equal or supplementary: the four relations, with worked examples and answers.",
      },
    ],
  }),
  component: ParallelLines,
});

const RULES = [
  { t: "Corresponding angles are equal", eq: ["m(∠1) = m(∠5)", "m(∠2) = m(∠6)", "m(∠3) = m(∠7)", "m(∠4) = m(∠8)"], h: [2, 6] },
  { t: "Alternating interior angles are equal", eq: ["m(∠3) = m(∠6)", "m(∠4) = m(∠5)"], h: [3, 6] },
  { t: "Alternating exterior angles are equal", eq: ["m(∠1) = m(∠8)", "m(∠2) = m(∠7)"], h: [2, 7] },
  { t: "Interior angles on the same side are supplementary", eq: ["m(∠3) + m(∠5) = 180°", "m(∠4) + m(∠6) = 180°"], h: [4, 6] },
];

const EXAMPLES = [
  {
    known: "70°",
    knownAt: 4,
    unknownAt: 8,
    answer: "70°",
    reason: "AB ∥ CD and GF is a transversal, so m(∠GEB) = m(∠EFD) = 70° — corresponding angles are equal in measure.",
  },
  {
    known: "52°",
    knownAt: 4,
    unknownAt: 5,
    answer: "52°",
    reason: "AB ∥ CD and EF is a transversal, so m(∠BEF) = m(∠EFC) = 52° — alternating interior angles are equal in measure.",
  },
  {
    known: "115°",
    knownAt: 1,
    unknownAt: 8,
    answer: "115°",
    reason: "IH ∥ ON and JK is a transversal, so m(∠JLI) = m(∠NMK) = 115° — alternating exterior angles are equal in measure.",
  },
  {
    known: "101°",
    knownAt: 4,
    unknownAt: 6,
    answer: "79°",
    reason: "BA ∥ CD and BC is a transversal, so m(∠B) + m(∠C) = 180° — interior angles on the same side are supplementary. Hence m(∠C) = 180° − 101° = 79°.",
  },
];

function ParallelLines() {
  return (
    <>
      <PageHeader
        eyebrow="Section 02"
        title="The relation between angle pairs when the two lines are parallel"
        intro="When a straight line intersects two parallel straight lines, any pair of angles formed by the intersection is either equal in measure or supplementary. That single sentence powers every calculation in this lesson."
      />

      <Section title="The four relations">
        <div className="grid gap-6 lg:grid-cols-2">
          {RULES.map((r, i) => (
            <div key={r.t} className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Rule {i + 1}
              </p>
              <h3 className="mt-2 text-xl">{r.t}</h3>
              <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_1fr]">
                <TransversalDiagram highlight={r.h} className="w-full" />
                <ul className="space-y-1 font-mono text-sm text-muted-foreground">
                  {r.eq.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Example 1 — find the angle marked ?">
        <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
          In each figure the two horizontal lines are parallel. Find the measure of the marked
          angle and state the reason.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {EXAMPLES.map((ex, i) => (
            <details key={i} className="rounded-lg border border-border bg-card p-5">
              <summary className="cursor-pointer font-semibold">
                Figure {i + 1} — given {ex.known}
              </summary>
              <AngleFigure
                known={ex.known}
                knownAt={ex.knownAt}
                unknownAt={ex.unknownAt}
                className="mt-4 w-full"
              />
              <p className="mt-2 font-display text-lg text-accent">Answer: {ex.answer}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ex.reason}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section title="Try it yourself">
        <div className="rounded-lg border border-border bg-secondary p-6">
          <p className="text-sm leading-relaxed">
            In each of the following, two parallel lines are cut by a transversal. Name the angle
            pair first, then decide whether the angles are <strong>equal</strong> or{" "}
            <strong>supplementary</strong>, and only then compute. Practising the naming step is
            what makes exam questions fast.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Given 63° at an exterior position, find the corresponding interior angle.</li>
            <li>Given 118° interior, find the co-interior angle on the same side.</li>
            <li>Given 47° interior, find its alternating interior partner.</li>
          </ol>
          <p className="mt-4 font-mono text-sm text-accent">Answers: 63° · 62° · 47°</p>
        </div>
      </Section>
    </>
  );
}
