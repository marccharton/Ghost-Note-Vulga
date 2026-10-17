import { AbsoluteFill } from 'remotion';
import { colors } from '../theme';

// Vignettage radial : centre inkGlow à 55 % / 38 %, bord ink à 72 %
export const Vignette: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => (
  <AbsoluteFill
    style={{
      opacity: intensity,
      background: `radial-gradient(ellipse at 55% 38%, ${colors.inkGlow} 0%, ${colors.ink} 72%)`,
    }}
  />
);
