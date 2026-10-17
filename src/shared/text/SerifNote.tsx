import { useCurrentFrame } from 'remotion';
import { develop, progress } from '../lib/anim';
import { colors, type } from '../theme';

type SerifNoteProps = {
  children: React.ReactNode;
  start?: number;
  dur?: number;
  mode?: 'develop' | 'wipe'; // wipe = révélation de gauche à droite par masque
  color?: string;
  fontSize?: number;
  style?: React.CSSProperties;
};

// Annotation en Instrument Serif italique
export const SerifNote: React.FC<SerifNoteProps> = ({
  children,
  start = 0,
  dur,
  mode = 'develop',
  color = colors.gold,
  fontSize = type.note.fontSize,
  style,
}) => {
  const frame = useCurrentFrame();
  const anim: React.CSSProperties =
    mode === 'wipe'
      ? { clipPath: `inset(0 ${100 - 100 * progress(frame, start, dur ?? 20)}% 0 0)` }
      : develop(frame, start, dur);
  return <div style={{ ...type.note, fontSize, color, ...anim, ...style }}>{children}</div>;
};
