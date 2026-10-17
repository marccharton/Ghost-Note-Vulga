import { AbsoluteFill, random, useCurrentFrame } from 'remotion';
import { film } from '../theme';

// Léger flottement vertical de toute l'image, renouvelé toutes les 3 frames
export const GateWeave: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const y = random(`weave-${Math.floor(frame / film.weaveEveryFrames)}`) * film.weaveMaxPx;
  return <AbsoluteFill style={{ translate: `0px ${y}px` }}>{children}</AbsoluteFill>;
};
