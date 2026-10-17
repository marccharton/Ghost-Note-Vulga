import { useCurrentFrame, useVideoConfig } from 'remotion';
import { halo, pulses, reveal } from '../lib/anim';
import { colors, durations, type } from '../theme';

export type TitleSegment = {
  text: string;
  color?: string;
  pulseAt?: number[]; // frames où le segment pulse
};

type TitleProps = {
  lines: TitleSegment[][];
  start?: number;
  fontSize?: number;
  style?: React.CSSProperties;
};

// Titre en révélation : chaque ligne monte de 40 px dans un masque, décalage de 5 frames
export const Title: React.FC<TitleProps> = ({ lines, start = 0, fontSize = type.title.fontSize, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ ...type.title, fontSize, color: colors.paper, ...style }}>
      {lines.map((segments, i) => {
        const p = reveal(frame, fps, start + i * durations.revealStagger);
        return (
          <div key={i} style={{ overflow: 'hidden', paddingTop: 8, marginTop: -8 }}>
            <div style={{ translate: `0px ${40 * (1 - p)}px`, opacity: p, whiteSpace: 'nowrap' }}>
              {segments.map((s, j) => (
                <span key={j} style={{ color: s.color, filter: halo(pulses(frame, s.pulseAt ?? [])) }}>
                  {s.text}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
