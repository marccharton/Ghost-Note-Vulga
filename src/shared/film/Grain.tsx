import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { film, layout } from '../theme';

// Bruit fractal plein cadre, nouveau motif toutes les 2 frames (seed déterministe)
export const Grain: React.FC = () => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / film.grainEveryFrames);
  return (
    <AbsoluteFill style={{ opacity: film.grainOpacity, mixBlendMode: 'screen', pointerEvents: 'none' }}>
      <svg width={layout.width} height={layout.height}>
        <filter id={`grain-${seed}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={3} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0" intercept="1" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};
