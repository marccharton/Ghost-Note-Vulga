import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { clamp } from '../lib/anim';
import { colors, durations } from '../theme';

// Fuite de lumière : à monter dans une <Sequence> de durations.lightLeak frames centrée sur la coupe
export const LightLeak: React.FC = () => {
  const frame = useCurrentFrame();
  const d = durations.lightLeak;
  const p = interpolate(frame, [0, d], [0, 1], clamp);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        opacity: interpolate(frame, [0, d / 2, d], [0, 0.35, 0], clamp),
        background: `linear-gradient(135deg, transparent 30%, ${colors.ember} 45%, ${colors.gold} 55%, transparent 70%)`,
        backgroundSize: '300% 300%',
        backgroundPosition: `${100 - 100 * p}% ${100 - 100 * p}%`,
      }}
    />
  );
};
