import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TransversalDiagram } from "@/components/diagrams";
import { PageHeader, Section } from "@/components/site-chrome";

export const Route = createFileRoute("/angle-pairs")({
  head: () => ({
    meta: [
      { title: "Angle Pairs Formed by a Transversal — Parallelism" },
      {
        name: "description",
        content:
          "Interior, exterior, corresponding, alternating and co-interior angle pairs created when a straight line intersects two straight lines.",
      },
      { property: "og:title", content: "Angle Pairs Formed by a Transversal" },
      {
        property: "og:description",
        content: "Explore the eight angles a transversal creates and how they pair up.",
      },
    ],
  }),
  component: AnglePairs,
});

const GROUPS = [
  {
    key: "corresponding",
    name: "Corresponding angles",
    rule: "Same side of the transversal, one exterior and one interior, and not adjacent.",
    pairs: [
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8],
    ],
  },
  {
    key: "alt-interior",
    name: "Alternating interior angles",
    rule: "Both interior, on opposite sides of the transversal, and not adjacent.",
    pairs: [
      [3, 6],
      [4, 5],
    ],
  },
  {
    key: "alt-exterior",
    name: "Alternating exterior angles",
    rule: "Both exterior, on opposite sides of the transversal, and not adjacent.",
    pairs: [
      [1, 8],
      [2, 7],
    ],
  },
  {
    key: "co-interior",
    name: "Interior angles on the same side",
    rule: "Both interior and on the same side of the transversal (also called co-interior angles).",
    pairs: [
      [3, 5],
      [4, 6],
    ],
  },
] as const;

function AnglePairs() {
  const [active, setActive] = useState<{ g: number; p: number }>({ g: 0, p: 0 });
  const group = GROUPS[active.g]!;
  const pair = group.pairs[active.p]!;

  return (
    <>
      <PageHeader
        eyebrow="Section 01"
        title="Pairs of angles formed when a straight line intersects two straight lines"
        intro="A straight line that intersects two or more straight lines at two different points is called a transversal. The intersection produces eight angles: four interior and four exterior."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <TransversalDiagram highlight={[...pair]} parallel={false} labels={{ top: "r", bottom: "q", transversal: "t" }} className="w-full" />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Transversal <em>t</em> cuts lines <em>r</em> and <em>q</em>. Highlighted: ∠{pair[0]}{" "}
              and ∠{pair[1]} — {group.name.toLowerCase()}.
            </p>
          </div>
          <div>
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-secondary p-4">
                <p className="font-semibold">Interior angles</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Located between the two lines: ∠3, ∠4, ∠5, ∠6.
                </p>
              </div>
              <div className="rounded-md border border-border bg-secondary p-4">
                <p className="font-semibold">Exterior angles</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Located outside the two lines: ∠1, ∠2, ∠7, ∠8.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {GROUPS.map((g, gi) => (
                <div
                  key={g.key}
                  className={`rounded-lg border p-4 transition-colors ${
                    gi === active.g ? "border-accent bg-card" : "border-border bg-card"
                  }`}
                >
                  <p className="font-display text-lg">{g.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{g.rule}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.pairs.map((p, pi) => {
                      const on = gi === active.g && pi === active.p;
                      return (
                        <button
                          key={p.join("-")}
                          onClick={() => setActive({ g: gi, p: pi })}
                          className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                            on
                              ? "border-accent bg-accent/15 font-semibold text-accent-foreground"
                              : "border-border hover:bg-secondary"
                          }`}
                        >
                          ∠{p[0]} , ∠{p[1]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="How to spot each pair quickly">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["Look for an F shape", "The two angles inside an F (in any rotation) are corresponding angles."],
            ["Look for a Z shape", "The two angles inside a Z (or N) are alternating interior angles."],
            ["Look for a C or U shape", "The two angles inside a C are interior angles on the same side of the transversal."],
            ["Check adjacency", "A pair is never adjacent — two angles sharing a ray at the same point form a linear pair instead."],
          ].map(([t, d]) => (
            <div key={t} className="rule-accent bg-card py-2 pl-4">
              <p className="font-semibold">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
