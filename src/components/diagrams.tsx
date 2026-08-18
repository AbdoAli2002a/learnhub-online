/**
 * Reusable geometry diagrams (pure SVG, English labels).
 * Colors come from design tokens via `currentColor` + token classes.
 */

type Highlight = number[];

const P1 = { x: 163.8, y: 90 };
const P2 = { x: 256.2, y: 210 };

const OFFSETS: Record<number, { dx: number; dy: number }> = {
  1: { dx: -30, dy: -12 },
  2: { dx: 20, dy: -12 },
  3: { dx: -30, dy: 24 },
  4: { dx: 20, dy: 24 },
  5: { dx: -30, dy: -12 },
  6: { dx: 20, dy: -12 },
  7: { dx: -30, dy: 24 },
  8: { dx: 20, dy: 24 },
};

export function TransversalDiagram({
  highlight = [],
  parallel = true,
  labels = { top: "m", bottom: "n", transversal: "t" },
  className,
}: {
  highlight?: Highlight;
  parallel?: boolean;
  labels?: { top: string; bottom: string; transversal: string };
  className?: string;
}) {
  const bottomTilt = parallel ? 0 : 14;
  return (
    <svg
      viewBox="0 0 420 300"
      className={className ?? "w-full max-w-md"}
      role="img"
      aria-label="Two straight lines cut by a transversal with eight numbered angles"
    >
      <line
        x1="20"
        y1={P1.y}
        x2="400"
        y2={P1.y}
        className="stroke-foreground"
        strokeWidth="2.5"
      />
      <line
        x1="20"
        y1={P2.y + bottomTilt}
        x2="400"
        y2={P2.y - bottomTilt}
        className="stroke-foreground"
        strokeWidth="2.5"
      />
      <line
        x1="110"
        y1="20"
        x2="310"
        y2="280"
        className="stroke-accent"
        strokeWidth="2.5"
      />
      {parallel && (
        <>
          <Arrow x={380} y={P1.y} />
          <Arrow x={380} y={P2.y} />
        </>
      )}
      <circle cx={P1.x} cy={P1.y} r="4" className="fill-primary" />
      <circle cx={P2.x} cy={P2.y} r="4" className="fill-primary" />
      <text x="404" y={P1.y - 8} className="fill-muted-foreground text-[13px] italic">
        {labels.top}
      </text>
      <text x="404" y={P2.y - 8} className="fill-muted-foreground text-[13px] italic">
        {labels.bottom}
      </text>
      <text x="314" y="292" className="fill-accent text-[13px] italic">
        {labels.transversal}
      </text>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
        const base = n <= 4 ? P1 : P2;
        const o = OFFSETS[n]!;
        const on = highlight.includes(n);
        return (
          <g key={n}>
            {on && (
              <circle
                cx={base.x + o.dx + 6}
                cy={base.y + o.dy - 5}
                r="14"
                className="fill-accent/20 stroke-accent"
                strokeWidth="1.5"
              />
            )}
            <text
              x={base.x + o.dx}
              y={base.y + o.dy}
              className={
                on
                  ? "fill-accent-foreground text-[14px] font-semibold"
                  : "fill-muted-foreground text-[14px]"
              }
            >
              {n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Arrow({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M ${x} ${y - 6} L ${x + 10} ${y} L ${x} ${y + 6}`}
      className="fill-none stroke-primary"
      strokeWidth="2"
    />
  );
}

/** Small figure: two parallel lines + transversal with one known angle and one unknown. */
export function AngleFigure({
  known,
  unknownLabel = "?",
  knownAt,
  unknownAt,
  className,
}: {
  known: string;
  unknownLabel?: string;
  knownAt: number;
  unknownAt: number;
  className?: string;
}) {
  const pos = (n: number) => {
    const base = n <= 4 ? P1 : P2;
    const o = OFFSETS[n]!;
    return { x: base.x + o.dx - 8, y: base.y + o.dy };
  };
  const k = pos(knownAt);
  const u = pos(unknownAt);
  return (
    <svg viewBox="0 0 420 300" className={className ?? "w-full max-w-sm"} role="img" aria-label="Find the unknown angle">
      <line x1="20" y1={P1.y} x2="400" y2={P1.y} className="stroke-foreground" strokeWidth="2.5" />
      <line x1="20" y1={P2.y} x2="400" y2={P2.y} className="stroke-foreground" strokeWidth="2.5" />
      <line x1="110" y1="20" x2="310" y2="280" className="stroke-accent" strokeWidth="2.5" />
      <Arrow x={380} y={P1.y} />
      <Arrow x={380} y={P2.y} />
      <text x={k.x} y={k.y} className="fill-foreground text-[15px] font-semibold">
        {known}
      </text>
      <text x={u.x} y={u.y} className="fill-accent text-[17px] font-bold">
        {unknownLabel}
      </text>
    </svg>
  );
}

/** Zig-zag figure used for the "draw an auxiliary parallel line" example. */
export function ZigzagFigure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 260" className={className ?? "w-full max-w-sm"} role="img" aria-label="Zig-zag figure between two parallel lines">
      <line x1="30" y1="50" x2="370" y2="50" className="stroke-foreground" strokeWidth="2.5" />
      <line x1="30" y1="220" x2="370" y2="220" className="stroke-foreground" strokeWidth="2.5" />
      <Arrow x={352} y={50} />
      <Arrow x={352} y={220} />
      <polyline
        points="150,50 230,135 130,220"
        className="fill-none stroke-accent"
        strokeWidth="2.5"
      />
      <line x1="30" y1="135" x2="370" y2="135" className="stroke-primary/50" strokeWidth="2" strokeDasharray="6 6" />
      <text x="120" y="42" className="fill-muted-foreground text-[13px]">D</text>
      <text x="236" y="140" className="fill-foreground text-[13px] font-semibold">C</text>
      <text x="112" y="236" className="fill-muted-foreground text-[13px]">B</text>
      <text x="374" y="46" className="fill-muted-foreground text-[13px] italic">DE</text>
      <text x="374" y="226" className="fill-muted-foreground text-[13px] italic">BA</text>
      <text x="160" y="70" className="fill-accent text-[13px]">120°</text>
      <text x="140" y="210" className="fill-accent text-[13px]">130°</text>
      <text x="248" y="118" className="fill-primary text-[13px]">auxiliary ∥ line</text>
    </svg>
  );
}
