import { useCurrentFrame } from 'remotion';
import { drawOn } from '../lib/anim';
import { wavePath } from '../lib/music';
import { durations } from '../theme';

type WaveProps = {
  freq: number;
  refFreq: number; // fréquence de référence (F0 de l'épisode)
  refCycles: number; // nombre d'oscillations de la référence sur la largeur
  width: number;
  amplitude: number;
  color: string;
  strokeWidth?: number;
  drawStart?: number;
  drawDur?: number;
  phase?: number; // en tours
  style?: React.CSSProperties;
};

// Onde sinusoïdale : le nombre d'oscillations découle du rapport freq / refFreq
export const Wave: React.FC<WaveProps> = ({
  freq,
  refFreq,
  refCycles,
  width,
  amplitude,
  color,
  strokeWidth = 5,
  drawStart = 0,
  drawDur = durations.draw,
  phase = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const h = 2 * amplitude + strokeWidth * 2;
  const { d, length } = wavePath({ width, amplitude, cycles: (refCycles * freq) / refFreq, phase, y0: h / 2 });
  return (
    <svg width={width} height={h} style={{ overflow: 'visible', ...style }}>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={drawOn(frame, drawStart, drawDur, length)}
      />
    </svg>
  );
};
