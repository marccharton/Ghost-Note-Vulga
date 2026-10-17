import { Easing, interpolateColors, useCurrentFrame } from 'remotion';
import { combine, develop, drawOn, fadeOut, halo, progress, pulses } from '../lib/anim';
import { withAlpha } from '../lib/color';
import { colors, type } from '../theme';

export type LadderRow = { n: number; label: string; color: string };

type HarmonicLadderProps = {
  rows: LadderRow[]; // n = 1 en premier, affiché en bas
  start: number; // première rangée
  stagger: number; // écart entre deux rangées
  drawDur?: number; // tracé de la barre
  barMax?: number; // longueur de la barre n = 1 (520 / √n ensuite)
  rowHeight?: number;
  barThickness?: number;
  highlight?: { rows: number[]; at: number; dur?: number; color: string; textColor: string };
  pulse?: { rows: number[]; at: number[] };
  annotations?: Partial<Record<number, React.ReactNode>>; // affichées après le texte de la rangée n
  fadeOutAt?: number; // extinction de tout sauf les barres
  style?: React.CSSProperties;
};

// Échelle des harmoniques : numéro, barre de longueur barMax / √n, puis « Note · Hz »
export const HarmonicLadder: React.FC<HarmonicLadderProps> = ({
  rows,
  start,
  stagger,
  drawDur = 12,
  barMax = 520,
  rowHeight = 92,
  barThickness = 24,
  highlight,
  pulse,
  annotations = {},
  fadeOutAt,
  style,
}) => {
  const frame = useCurrentFrame();
  const out = fadeOutAt === undefined ? {} : fadeOut(frame, fadeOutAt, 20);
  return (
    <div style={{ display: 'flex', flexDirection: 'column-reverse', ...style }}>
      {rows.map((row, i) => {
        const t0 = start + i * stagger;
        const len = barMax / Math.sqrt(row.n);
        const lit = highlight?.rows.includes(row.n);
        const hl = lit ? progress(frame, highlight!.at, highlight!.dur ?? 20) : 0;
        const textColor = lit
          ? interpolateColors(hl, [0, 1], [colors.paper, highlight!.textColor])
          : colors.paper;
        const glow = pulse?.rows.includes(row.n) ? pulses(frame, pulse.at) : 0;
        const textIn = progress(frame, t0 + drawDur, 8, Easing.out(Easing.cubic));
        return (
          <div
            key={row.n}
            style={{ position: 'relative', height: rowHeight, display: 'flex', alignItems: 'center', filter: halo(glow) }}
          >
            {lit ? (
              <div
                style={{
                  position: 'absolute',
                  inset: '8px -24px',
                  borderRadius: 8,
                  backgroundColor: withAlpha(highlight!.color, 0.18),
                  ...combine(develop(frame, highlight!.at, highlight!.dur ?? 20), out),
                }}
              />
            ) : null}
            <div
              style={{
                ...type.data,
                color: colors.muted,
                width: 64,
                ...combine({ opacity: progress(frame, t0, 6) }, out),
              }}
            >
              {row.n}
            </div>
            <svg width={len} height={barThickness} style={{ flexShrink: 0 }}>
              <line
                x1={0}
                x2={len}
                y1={barThickness / 2}
                y2={barThickness / 2}
                stroke={row.color}
                strokeWidth={barThickness}
                strokeDasharray={len}
                strokeDashoffset={drawOn(frame, t0, drawDur, len)}
              />
            </svg>
            <div
              style={{
                ...type.data,
                color: textColor,
                marginLeft: 24,
                whiteSpace: 'nowrap',
                ...combine({ opacity: textIn, translate: `${12 * (1 - textIn)}px 0px` }, out),
              }}
            >
              {row.label}
            </div>
            {annotations[row.n] ? <div style={{ marginLeft: 28, ...out }}>{annotations[row.n]}</div> : null}
          </div>
        );
      })}
    </div>
  );
};

