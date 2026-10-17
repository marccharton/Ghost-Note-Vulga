import { useCurrentFrame } from 'remotion';
import { typewriter } from '../lib/anim';
import { colors, type } from '../theme';

// Étiquette d'étape « ▸ 02 · LA SÉRIE HARMONIQUE », en machine à écrire
export const StepLabel: React.FC<{ text: string; start?: number; style?: React.CSSProperties }> = ({
  text,
  start = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const shown = typewriter(text, frame, start);
  return (
    <div style={{ ...type.label, color: colors.muted, whiteSpace: 'pre', ...style }}>
      {Array.from(shown).map((c, i) => (
        <span key={i} style={{ color: c === '▸' ? colors.gold : undefined }}>
          {c}
        </span>
      ))}
    </div>
  );
};
