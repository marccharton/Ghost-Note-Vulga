import { useCurrentFrame } from 'remotion';
import { develop, drawOn } from '../lib/anim';
import { withAlpha } from '../lib/color';
import { colors, durations } from '../theme';

type LadderLinkProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  start: number;
  dur?: number;
  color?: string;
  dashed?: boolean;
  glow?: boolean; // halo paper à 22 %
};

// Lien entre deux barreaux de même fréquence (ou de même rang), tracé de gauche à droite
export const LadderLink: React.FC<LadderLinkProps> = ({
  x1,
  y1,
  x2,
  y2,
  start,
  dur = durations.draw,
  color = colors.paper,
  dashed = false,
  glow = true,
}) => {
  const frame = useCurrentFrame();
  const length = Math.hypot(x2 - x1, y2 - y1);
  const progressDash = drawOn(frame, start, dur, length);
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width={1} height={1}>
      {glow ? (
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={withAlpha(colors.paper, 0.22)}
          strokeWidth={18}
          strokeLinecap="round"
          style={develop(frame, start, dur)}
        />
      ) : null}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={dashed ? '10 10' : length}
        strokeDashoffset={dashed ? 0 : progressDash}
        style={dashed ? { clipPath: `inset(0 ${(100 * progressDash) / length}% 0 0)` } : undefined}
      />
    </svg>
  );
};
