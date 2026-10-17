import { useCurrentFrame, useVideoConfig } from 'remotion';
import { drawOn } from '../lib/anim';
import { beatHz, sumWavePath } from '../lib/music';
import { colors, durations } from '../theme';

type BeatWaveProps = {
  freqs: [number, number];
  width: number;
  amplitude: number;
  duration: number; // secondes représentées sur la largeur
  drawStart?: number;
  envelopeStart?: number;
  beatFrom?: number; // frame à partir de laquelle l'enveloppe pulse au rythme du battement
  color?: string;
  envelopeColor?: string;
  style?: React.CSSProperties;
};

// Onde résultante de deux notes proches et son enveloppe |cos(π·Δf·t)|, calculées depuis les fréquences
export const BeatWave: React.FC<BeatWaveProps> = ({
  freqs,
  width,
  amplitude,
  duration,
  drawStart = 0,
  envelopeStart = drawStart + durations.draw,
  beatFrom,
  color = colors.paper,
  envelopeColor = colors.ember,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const h = 2 * amplitude + 12;
  const wave = sumWavePath({ width, amplitude, freqs, duration, y0: h / 2 });
  const df = beatHz(freqs[0], freqs[1]);
  const samples = 300;
  const env = (sign: 1 | -1) =>
    Array.from({ length: samples + 1 }, (_, i) => {
      const t = (i / samples) * duration;
      const y = h / 2 - sign * amplitude * Math.abs(Math.cos(Math.PI * df * t));
      return `${i === 0 ? 'M' : 'L'}${((i / samples) * width).toFixed(2)},${y.toFixed(2)}`;
    }).join(' ');
  const beat =
    beatFrom !== undefined && frame >= beatFrom
      ? 0.6 + 0.4 * Math.abs(Math.cos(Math.PI * df * ((frame - beatFrom) / fps)))
      : 1;
  const envOpacity = Math.min(1, Math.max(0, (frame - envelopeStart) / 10)) * beat;
  return (
    <svg width={width} height={h} style={{ overflow: 'visible', ...style }}>
      <path
        d={wave.d}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeDasharray={wave.length}
        strokeDashoffset={drawOn(frame, drawStart, durations.draw, wave.length)}
      />
      <g opacity={envOpacity} fill="none" stroke={envelopeColor} strokeWidth={3} strokeDasharray="8 10">
        <path d={env(1)} />
        <path d={env(-1)} />
      </g>
    </svg>
  );
};
