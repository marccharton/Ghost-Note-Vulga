import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, springs } from '../theme';

export type KeyName = 'do' | 'do♯' | 'ré' | 'ré♯' | 'mi' | 'fa' | 'fa♯' | 'sol' | 'sol♯' | 'la' | 'la♯' | 'si' | 'do+';

const WHITE: KeyName[] = ['do', 'ré', 'mi', 'fa', 'sol', 'la', 'si', 'do+'];
// Touches noires : nom et index de la touche blanche à leur gauche
const BLACK: [KeyName, number][] = [
  ['do♯', 0],
  ['ré♯', 1],
  ['fa♯', 3],
  ['sol♯', 4],
  ['la♯', 5],
];

export type PressedKey = { key: KeyName; color: string; at: number };

type KeyboardProps = {
  width: number;
  height?: number;
  pressed?: PressedKey[];
  style?: React.CSSProperties;
};

// Clavier d'une octave (do à do). Une touche enfoncée descend de 6 px en spring snap et se remplit de sa couleur.
export const Keyboard: React.FC<KeyboardProps> = ({ width, height = 300, pressed = [], style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const w = width / WHITE.length;
  const press = (key: KeyName) => {
    const p = pressed.find((k) => k.key === key);
    if (!p) return { s: 0, color: undefined };
    return { s: spring({ frame: frame - p.at, fps, config: springs.snap }), color: p.color };
  };
  const key = (name: KeyName, x: number, kw: number, kh: number, base: string) => {
    const { s, color } = press(name);
    return (
      <g key={name} style={{ translate: `0px ${6 * s}px` }}>
        <rect x={x + 2} y={0} width={kw - 4} height={kh} rx={8} fill={base} />
        {color ? <rect x={x + 2} y={0} width={kw - 4} height={kh} rx={8} fill={color} opacity={Math.min(1, s)} /> : null}
      </g>
    );
  };
  const bw = w * 0.6;
  return (
    <svg width={width} height={height + 8} style={{ overflow: 'visible', ...style }}>
      {WHITE.map((n, i) => key(n, i * w, w, height, colors.keyIvory))}
      {BLACK.map(([n, i]) => key(n, (i + 1) * w - bw / 2, bw, height * 0.62, colors.keyEbony))}
    </svg>
  );
};
