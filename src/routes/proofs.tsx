import { createFileRoute } from "@tanstack/react-router";
import { ZigzagFigure } from "@/components/diagrams";
import { PageHeader, Section } from "@/components/site-chrome";

export const Route = createFileRoute("/proofs")({
  head: () => ({
    meta: [
      { title: "Proving Lines Are Parallel & Writing Proofs — Parallelism" },
      {
        name: "description",
        content:
          "The three conditions that prove two straight lines are parallel, a six-step method for writing a geometric proof, and four fully worked proofs.",
      },
      { property: "og:title", content: "Proving Lines Are Parallel" },
      {
        property: "og:description",
        content: "Conditions, method and worked geometric proofs, step by step.",
      },
    ],
  }),
  component: Proofs,
});

const STEPS = [
  ["Read carefully", "Separate what is given from what is required. Every word in the statement is data."],
  ["Write the given", "List the given facts as short bullet points, using symbols (∥, ⊥, m(∠A) = …)."],
  ["Write the required", "State exactly what must be found or proved."],
  ["Plan the proof", "Sketch the essential steps that connect the given to the required before writing."],
  ["Write statements + reasons", "Each mathematical statement needs a justification: a definition, postulate, theorem, given fact or property."],
  ["Check", "Confirm the required question is answered and the numbers are consistent."],
];

const PROOFS = [
  {
    title: "Example 2 — find x and y",
    given: ["CD ∥ BA", "BC ∥ DE", "m(∠ABC) = 70°", "m(∠CDE) = (x + 10)°", "y = m(∠BCD)"],
    required: "Find the values of x and y.",
    lines: [
      ["∵ BA ∥ CD and BC is a transversal", ""],
      ["∴ m(∠ABC) = m(∠BCD) = 70°", "alternating interior angles are equal"],
      ["∴ y = 70", ""],
      ["∵ BC ∥ DE and CD is a transversal", ""],
      ["∴ m(∠CDE) + m(∠BCD) = 180°", "interior angles on the same side are supplementary"],
      ["∴ m(∠CDE) = 180° − 70° = 110°", ""],
      ["∴ x + 10 = 110  ⟹  x = 100", ""],
    ],
  },
  {
    title: "Example 3a — prove BA ∥ CD",
    given: ["m(∠ABC) = 58°", "m(∠ECD) = 29°", "CE bisects ∠BCD"],
    required: "Prove that BA ∥ CD.",
    lines: [
      ["∵ CE bisects ∠BCD", ""],
      ["∴ m(∠BCD) = 2 × 29° = 58°", "definition of an angle bisector"],
      ["∵ m(∠ABC) = m(∠BCD) = 58°", "and they are alternating interior angles"],
      ["∴ BA ∥ CD", "equal alternating interior angles"],
    ],
  },
  {
    title: "Example 3b — prove AB ∥ CD",
    given: ["m(∠EFB) = 54°", "m(∠CMF) = 126°"],
    required: "Prove that AB ∥ CD.",
    lines: [
      ["∵ AB ∩ EN = {F}", ""],
      ["∴ m(∠EFB) = m(∠AFM) = 54°", "vertically opposite angles"],
      ["∵ m(∠AFM) + m(∠CMF) = 54° + 126° = 180°", "and they are interior angles on the same side"],
      ["∴ AB ∥ CD", "co-interior angles are supplementary"],
    ],
  },
  {
    title: "Example 4 — the auxiliary parallel line",
    given: ["DE ∥ BA", "m(∠EDC) = 120°", "m(∠ABC) = 130°"],
    required: "Find m(∠DCB) with proof.",
    lines: [
      ["Construction: draw CF ∥ DE and ∥ BA through C", "two lines parallel to a third are parallel"],
      ["∵ DE ∥ CF and DC is a transversal", ""],
      ["∴ m(∠DCF) = 180° − 120° = 60°", "interior angles on the same side"],
      ["∵ BA ∥ CF and BC is a transversal", ""],
      ["∴ m(∠BCF) = 180° − 130° = 50°", "interior angles on the same side"],
      ["∴ m(∠DCB) = 60° + 50° = 110°", "angle addition"],
    ],
  },
];

function Proofs() {
  return (
    <>
      <PageHeader
        eyebrow="Section 03"
        title="Proving that two straight lines are parallel"
        intro="Two straight lines cut by a transversal are parallel whenever one of three conditions holds. Combine a condition with a clean, justified write-up and the proof is complete."
      />

      <Section title="The three conditions">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Two corresponding angles are equal in measure.",
            "Two alternating angles (both interior or both exterior) are equal in measure.",
            "Two interior angles on the same side of the transversal are supplementary.",
          ].map((c, i) => (
            <div key={c} className="rounded-lg border border-border bg-card p-5">
              <span className="font-display text-2xl text-accent">{i + 1}</span>
              <p className="mt-2 text-sm leading-relaxed">{c}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-md border border-border bg-secondary p-5 text-sm leading-relaxed">
          <strong>Also useful:</strong> if two straight lines are parallel to a third line, they are
          parallel to each other. If a straight line is perpendicular to one of two parallel lines,
          it is perpendicular to the other. Two lines perpendicular to the same line in a plane are
          parallel.
        </div>
      </Section>

      <Section title="How to write a proof in geometry">
        <ol className="grid gap-4 md:grid-cols-3">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="rounded-lg border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                Step {i + 1}
              </p>
              <p className="mt-2 font-semibold">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-md border border-border bg-card p-5 text-sm leading-relaxed">
          <strong>Notation:</strong> the symbol <span className="font-mono">∵</span> is short for
          “since” and introduces a given fact or theorem; <span className="font-mono">∴</span> is
          short for “therefore” and introduces a derived statement.
        </div>
      </Section>

      <Section title="Worked proofs">
        <div className="grid gap-6 lg:grid-cols-2">
          {PROOFS.map((p) => (
            <article key={p.title} className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-xl">{p.title}</h3>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
                Given
              </p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
                {p.given.map((g) => (
                  <li key={g} className="font-mono">
                    {g}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
                Required
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{p.required}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
                Proof
              </p>
              <table className="mt-2 w-full text-left text-sm">
                <tbody>
                  {p.lines.map(([s, r], i) => (
                    <tr key={i} className="border-t border-border align-top">
                      <td className="py-2 pr-4 font-mono">{s}</td>
                      <td className="py-2 text-muted-foreground">{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {p.title.startsWith("Example 4") && <ZigzagFigure className="mt-5 w-full" />}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
