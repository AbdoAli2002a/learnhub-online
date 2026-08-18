import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { TransversalDiagram } from "@/components/diagrams";
import { PageHeader, Section } from "@/components/site-chrome";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities & Learning Games — Parallelism" },
      {
        name: "description",
        content:
          "Play four parallelism games: Angle Hunter, the timed Find-x Challenge, Proof Builder and the interactive Parallel Lines Lab, plus classroom activities.",
      },
      { property: "og:title", content: "Activities & Learning Games — Parallelism" },
      {
        property: "og:description",
        content: "Interactive drills and games to master angle pairs and geometric proof.",
      },
    ],
  }),
  component: Activities;
});

function Activities() {
  return (
    <>
      <PageHeader
        eyebrow="Section 05"
        title="Activities, drills and learning games"
        intro="Four interactive trainers plus hands-on classroom activities. Each game targets one skill from the lesson: naming pairs, computing angles, ordering a proof, and reading a live figure."
      />
      <Section title="Game 1 · Angle Hunter">
        <AngleHunter />
      </Section>
      <Section title="Game 2 · Find-x Challenge (timed)">
        <FindXChallenge />
      </Section>
      <Section title="Game 3 · Proof Builder">
        <ProofBuilder />
      </Section>
      <Section title="Lab · Parallel Lines Explorer">
        <ParallelLab />
      </Section>
      <Section title="Off-screen activities">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Classroom hunt", "Photograph five real transversals around school — window frames, floor tiles, railings — and label one pair of each angle type on the printout."],
            ["Paper folding", "Fold a sheet twice to create two parallel creases, then fold a slanted crease across them. Measure the eight angles with a protractor and verify every rule."],
            ["Proof relay", "In teams of four, each student writes one line of a proof and passes it on. The team with the fewest unjustified statements wins."],
          ].map(([t, d]) => (
            <div key={t} className="rule-accent bg-card py-3 pl-4">
              <p className="font-semibold">{t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

/* ---------------- Game 1 ---------------- */

const PAIR_TYPES = [
  "Corresponding angles",
  "Alternating interior angles",
  "Alternating exterior angles",
  "Interior angles on the same side",
] as const;

const HUNTER_ITEMS: { pair: [number, number]; type: (typeof PAIR_TYPES)[number] }[] = [
  { pair: [1, 5], type: "Corresponding angles" },
  { pair: [2, 6], type: "Corresponding angles" },
  { pair: [3, 7], type: "Corresponding angles" },
  { pair: [4, 8], type: "Corresponding angles" },
  { pair: [3, 6], type: "Alternating interior angles" },
  { pair: [4, 5], type: "Alternating interior angles" },
  { pair: [1, 8], type: "Alternating exterior angles" },
  { pair: [2, 7], type: "Alternating exterior angles" },
  { pair: [3, 5], type: "Interior angles on the same side" },
  { pair: [4, 6], type: "Interior angles on the same side" },
];

function AngleHunter() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const item = HUNTER_ITEMS[i % HUNTER_ITEMS.length]!;

  return (
    <div className="grid gap-6 rounded-lg border border-border bg-card p-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <TransversalDiagram highlight={item.pair} className="w-full" />
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Name the pair ∠{item.pair[0]} and ∠{item.pair[1]}.
        </p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          Question {i + 1} · Score {score}
        </p>
        <div className="mt-3 grid gap-2">
          {PAIR_TYPES.map((t) => (
            <button
              key={t}
              disabled={picked !== null}
              onClick={() => {
                setPicked(t);
                if (t === item.type) setScore((s) => s + 1);
              }}
              className={`rounded-md border px-4 py-2.5 text-left text-sm transition-colors ${
                picked === null
                  ? "border-border hover:bg-secondary"
                  : t === item.type
                    ? "border-accent bg-accent/15 font-semibold"
                    : t === picked
                      ? "border-destructive bg-destructive/10"
                      : "border-border opacity-60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {picked && (
          <button
            onClick={() => {
              setPicked(null);
              setI((v) => v + 1);
            }}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Next question
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------------- Game 2 ---------------- */

type XQ = { text: string; answer: number };

function makeQuestion(): XQ {
  const kind = Math.floor(Math.random() * 3);
  const x = 5 + Math.floor(Math.random() * 25);
  if (kind === 0) {
    const a = 2 * x + 10;
    return { text: `Corresponding angles: (2x + 10)° and ${a}°. Find x.`, answer: x };
  }
  if (kind === 1) {
    const other = 180 - (3 * x + 15);
    return {
      text: `Interior angles on the same side: (3x + 15)° and ${other}°. Find x.`,
      answer: x,
    };
  }
  const a = 4 * x - 8;
  return { text: `Alternating interior angles: (4x − 8)° and ${a}°. Find x.`, answer: x };
}

function FindXChallenge() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(60);
  const [q, setQ] = useState<XQ>(() => makeQuestion());
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const submit = () => {
    if (!running) return;
    if (Number(value) === q.answer) {
      setScore((s) => s + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`x = ${q.answer}`);
    }
    setValue("");
    setQ(makeQuestion());
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-display text-xl">
          Time left: <span className="text-accent">{time}s</span>
        </p>
        <p className="text-sm text-muted-foreground">Solved: {score}</p>
        <button
          onClick={() => {
            setRunning(true);
            setTime(60);
            setScore(0);
            setFeedback("");
            setQ(makeQuestion());
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {running ? "Restart" : "Start 60-second round"}
        </button>
      </div>
      <p className="mt-6 text-lg">{running ? q.text : "Press start — questions are generated randomly."}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          disabled={!running}
          inputMode="numeric"
          placeholder="x = ?"
          className="w-32 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={submit}
          disabled={!running}
          className="rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-50"
        >
          Submit
        </button>
        {feedback && <span className="self-center text-sm text-muted-foreground">{feedback}</span>}
      </div>
      {!running && time === 0 && (
        <p className="mt-4 font-display text-lg text-accent">
          Round over — you solved {score} question{score === 1 ? "" : "s"}.
        </p>
      )}
    </div>
  );
}

/* ---------------- Game 3 ---------------- */

const PROOF_STEPS = [
  "∵ CE bisects ∠BCD",
  "∴ m(∠BCD) = 2 × 29° = 58°",
  "∵ m(∠ABC) = m(∠BCD) = 58°, and they are alternating interior angles",
  "∴ BA ∥ CD",
];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function ProofBuilder() {
  const [pool, setPool] = useState<string[]>(() => shuffle(PROOF_STEPS));
  const [built, setBuilt] = useState<string[]>([]);
  const done = built.length === PROOF_STEPS.length;
  const correct = useMemo(() => done && built.every((s, i) => s === PROOF_STEPS[i]), [built, done]);

  return (
    <div className="grid gap-6 rounded-lg border border-border bg-card p-6 lg:grid-cols-2">
      <div>
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Given:</strong> m(∠ABC) = 58°, m(∠ECD) = 29°, CE
          bisects ∠BCD. <strong className="text-foreground">Required:</strong> prove BA ∥ CD.
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-accent">
          Available statements
        </p>
        <div className="mt-2 grid gap-2">
          {pool.map((s) => (
            <button
              key={s}
              onClick={() => {
                setBuilt((b) => [...b, s]);
                setPool((p) => p.filter((x) => x !== s));
              }}
              className="rounded-md border border-border px-3 py-2 text-left font-mono text-sm transition-colors hover:bg-secondary"
            >
              {s}
            </button>
          ))}
          {pool.length === 0 && <p className="text-sm text-muted-foreground">All statements used.</p>}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">Your proof</p>
        <ol className="mt-2 grid gap-2">
          {built.map((s, i) => (
            <li
              key={s}
              className={`rounded-md border px-3 py-2 font-mono text-sm ${
                done ? (s === PROOF_STEPS[i] ? "border-accent bg-accent/10" : "border-destructive bg-destructive/10") : "border-border"
              }`}
            >
              {i + 1}. {s}
            </li>
          ))}
          {built.length === 0 && (
            <li className="text-sm text-muted-foreground">Click statements in the correct order.</li>
          )}
        </ol>
        {done && (
          <p className="mt-4 font-display text-lg text-accent">
            {correct ? "Perfect — that is a valid proof." : "Order is off. Reset and try again."}
          </p>
        )}
        <button
          onClick={() => {
            setPool(shuffle(PROOF_STEPS));
            setBuilt([]);
          }}
          className="mt-4 rounded-md border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

/* ---------------- Lab ---------------- */

function ParallelLab() {
  const [angle, setAngle] = useState(65);
  const supp = 180 - angle;
  const values: Record<number, number> = {
    1: supp,
    2: angle,
    3: angle,
    4: supp,
    5: supp,
    6: angle,
    7: angle,
    8: supp,
  };
  return (
    <div className="grid gap-6 rounded-lg border border-border bg-card p-6 lg:grid-cols-[1fr_1fr]">
      <div>
        <TransversalDiagram highlight={[2, 6]} className="w-full" />
        <label className="mt-4 block text-sm font-semibold" htmlFor="lab-angle">
          Drag to change ∠2: {angle}°
        </label>
        <input
          id="lab-angle"
          type="range"
          min={20}
          max={160}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="mt-2 w-full accent-[var(--accent)]"
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          The two lines stay parallel, so every other angle is forced. Watch which measures stay
          equal to ∠2 and which become its supplement.
        </p>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className={`rounded-md border p-3 text-center ${
                values[n] === angle ? "border-accent bg-accent/10" : "border-border bg-secondary"
              }`}
            >
              <p className="text-xs text-muted-foreground">∠{n}</p>
              <p className="font-display text-lg">{values[n]}°</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Check: ∠3 + ∠5 = {angle + supp}° and ∠4 + ∠6 = {supp + angle}° — co-interior angles are
          always supplementary.
        </p>
      </div>
    </div>
  );
}
