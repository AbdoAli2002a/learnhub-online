import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/site-chrome";

export const Route = createFileRoute("/exercises")({
  head: () => ({
    meta: [
      { title: "Exercise 13 — Parallelism Practice Questions" },
      {
        name: "description",
        content:
          "Graded parallelism practice: complete the sentence, true or false, find the value of x, reasoning questions and multiple-choice, all with answers.",
      },
      { property: "og:title", content: "Exercise 13 — Parallelism Practice Questions" },
      {
        property: "og:description",
        content: "Complete, decide, calculate and choose — with worked answers for every item.",
      },
    ],
  }),
  component: Exercises,
});

const COMPLETE = [
  ["If a straight line is perpendicular to one of two parallel straight lines, then it is ___ to the other line in the plane.", "perpendicular"],
  ["If two straight lines are parallel to a third straight line, then they are ___.", "parallel"],
  ["If two straight lines are perpendicular to a third line in the plane, then these two lines are ___.", "parallel"],
  ["When a transversal cuts two parallel lines, each two corresponding angles are ___ in measure.", "equal"],
  ["When a transversal cuts two parallel lines, each two interior angles on the same side are ___.", "supplementary (sum 180°)"],
];

const TRUEFALSE = [
  ["Two alternating exterior angles between parallel lines are supplementary.", false, "They are equal in measure, not supplementary."],
  ["A transversal meets the two lines it cuts at two different points.", true, "That is exactly the definition of a transversal."],
  ["If two corresponding angles are equal, the two lines must be parallel.", true, "This is the first condition for parallelism."],
  ["Co-interior angles are always equal.", false, "Between parallel lines they are supplementary; equal only when both are 90°."],
];

const FIND_X = [
  { q: "Corresponding angles: (3x + 15)° and 75°.", a: "3x + 15 = 75 ⟹ x = 20" },
  { q: "Co-interior angles: (2x + 10)° and (3x + 20)°.", a: "2x + 10 + 3x + 20 = 180 ⟹ 5x = 150 ⟹ x = 30" },
  { q: "Alternating interior angles: (4x − 12)° and (2x + 30)°.", a: "4x − 12 = 2x + 30 ⟹ 2x = 42 ⟹ x = 21" },
  { q: "Angles on a straight line: (3x + 40)° and (2x + 70)°.", a: "3x + 40 + 2x + 70 = 180 ⟹ 5x = 70 ⟹ x = 14" },
  { q: "MN ∥ ZY, CA ⊥ CE, m(∠MDC) = (2x − 3)°, m(∠ABY) = (3x + 8)°.", a: "Draw CF ∥ MN ∥ ZY: (2x − 3) + (3x + 8) = 90 + 90 ⟹ 5x = 85 ⟹ x = 17" },
  { q: "Rowing oars: m(∠1) = (2x − 6)°, m(∠2) = (3x − 29)°, x = 23.", a: "m(∠1) = 40°, m(∠2) = 40°. Equal corresponding angles ⟹ the oars are parallel." },
];

const MCQ = [
  {
    q: "If L₁, L₂ and L₃ are three lines in the same plane with L₃ ∥ L₁ and L₃ ∥ L₂, then:",
    options: ["L₂ ⊥ L₁", "L₃ ⊥ L₁", "L₂ ∥ L₁", "L₃ ⊥ L₂"],
    correct: 2,
    why: "Two lines parallel to the same line are parallel to each other.",
  },
  {
    q: "If L₂ ⊥ L₁ and L₃ ∥ L₁ in the same plane, then L₂ ___ L₃:",
    options: ["⊥", "∥", "coincides with", "bisects"],
    correct: 0,
    why: "A line perpendicular to one of two parallel lines is perpendicular to the other.",
  },
  {
    q: "Two parallel lines are cut by a transversal. One interior angle is 108°. The co-interior angle equals:",
    options: ["108°", "72°", "82°", "180°"],
    correct: 1,
    why: "Interior angles on the same side are supplementary: 180° − 108° = 72°.",
  },
  {
    q: "Which pair is NOT necessarily equal between two parallel lines?",
    options: ["Corresponding angles", "Alternating interior angles", "Alternating exterior angles", "Co-interior angles"],
    correct: 3,
    why: "Co-interior angles are supplementary, so they are equal only in the 90°/90° case.",
  },
];

function Exercises() {
  return (
    <>
      <PageHeader
        eyebrow="Section 04"
        title="Exercise 13 — Parallelism"
        intro="Work through the four question types in order: recall, reasoning, calculation, then multiple choice. Every answer is one click away, so attempt first and reveal after."
      />

      <Section title="1 · Complete each of the following">
        <ol className="grid gap-3">
          {COMPLETE.map(([q, a], i) => (
            <li key={i} className="rounded-md border border-border bg-card p-4">
              <p className="text-sm">
                <span className="mr-2 font-display text-accent">{i + 1}</span>
                {q}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-accent">Show answer</summary>
                <p className="mt-1 font-mono text-sm text-muted-foreground">{a}</p>
              </details>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="2 · True or false — and why">
        <div className="grid gap-3 md:grid-cols-2">
          {TRUEFALSE.map(([q, a, why], i) => (
            <TFItem key={i} q={q as string} a={a as boolean} why={why as string} />
          ))}
        </div>
      </Section>

      <Section title="3 · Find the value of x">
        <div className="grid gap-3 md:grid-cols-2">
          {FIND_X.map((f, i) => (
            <div key={i} className="rounded-md border border-border bg-card p-4">
              <p className="text-sm">
                <span className="mr-2 font-display text-accent">{i + 1}</span>
                {f.q}
              </p>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm text-accent">Show solution</summary>
                <p className="mt-1 font-mono text-sm text-muted-foreground">{f.a}</p>
              </details>
            </div>
          ))}
        </div>
      </Section>

      <Section title="4 · Multiple choice">
        <div className="grid gap-5 md:grid-cols-2">
          {MCQ.map((m, i) => (
            <McqItem key={i} {...m} index={i} />
          ))}
        </div>
      </Section>

      <Section title="5 · Applied problems">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rule-accent bg-card py-3 pl-4">
            <p className="font-semibold">Road safety</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A pedestrian crossing runs across a straight road. The crossing lines are parallel and
              the kerb acts as a transversal. If one marked angle is (2x + 30)° and the co-interior
              angle is (3x + 50)°, then 5x + 80 = 180, so x = 20.
            </p>
          </div>
          <div className="rule-accent bg-card py-3 pl-4">
            <p className="font-semibold">Rowing on the Nile</p>
            <p className="mt-1 text-sm text-muted-foreground">
              With m(∠1) = (2x − 6)° and m(∠2) = (3x − 29)° at x = 23, both angles measure 40°.
              Equal corresponding angles prove the left oars are parallel.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

function TFItem({ q, a, why }: { q: string; a: boolean; why: string }) {
  const [picked, setPicked] = useState<boolean | null>(null);
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="text-sm">{q}</p>
      <div className="mt-3 flex gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            onClick={() => setPicked(v)}
            className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
              picked === v
                ? v === a
                  ? "border-accent bg-accent/15 font-semibold"
                  : "border-destructive bg-destructive/10"
                : "border-border hover:bg-secondary"
            }`}
          >
            {v ? "True" : "False"}
          </button>
        ))}
      </div>
      {picked !== null && (
        <p className="mt-2 text-sm text-muted-foreground">
          {picked === a ? "Correct. " : "Not quite. "}
          {why}
        </p>
      )}
    </div>
  );
}

function McqItem({
  q,
  options,
  correct,
  why,
  index,
}: {
  q: string;
  options: string[];
  correct: number;
  why: string;
  index: number;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm">
        <span className="mr-2 font-display text-accent">{index + 1}</span>
        {q}
      </p>
      <div className="mt-3 grid gap-2">
        {options.map((o, i) => (
          <button
            key={o}
            onClick={() => setPicked(i)}
            className={`rounded-md border px-3 py-2 text-left text-sm transition-colors ${
              picked === null
                ? "border-border hover:bg-secondary"
                : i === correct
                  ? "border-accent bg-accent/15 font-semibold"
                  : i === picked
                    ? "border-destructive bg-destructive/10"
                    : "border-border opacity-70"
            }`}
          >
            {String.fromCharCode(97 + i)}) {o}
          </button>
        ))}
      </div>
      {picked !== null && <p className="mt-3 text-sm text-muted-foreground">{why}</p>}
    </div>
  );
}
