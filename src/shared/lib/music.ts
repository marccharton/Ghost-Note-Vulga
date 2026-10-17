// Helpers fréquences et notes. Tous les tracés musicaux sont calculés à partir d'ici.

export const harmonic = (f0: number, n: number): number => f0 * n;
export const semitone = (f0: number, k: number): number => f0 * 2 ** (k / 12);
export const beatHz = (a: number, b: number): number => Math.abs(a - b);

// Noms français des 12 demi-tons à partir de do
export const NOTE_NAMES = ['Do', 'Do♯', 'Ré', 'Mi♭', 'Mi', 'Fa', 'Fa♯', 'Sol', 'Sol♯', 'La', 'Si♭', 'Si'] as const;

// Nom (tempéré le plus proche) de l'harmonique n d'une note située rootIndex demi-tons au-dessus de do
export const harmonicName = (n: number, rootIndex = 0, names: readonly string[] = NOTE_NAMES): string => {
  const k = Math.round(12 * Math.log2(n)) + rootIndex;
  return names[((k % 12) + 12) % 12];
};

type Point = [number, number];

const toPath = (points: Point[]): { d: string; length: number } => {
  let length = 0;
  for (let i = 1; i < points.length; i++) {
    length += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
  }
  const d = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
  return { d, length };
};

// Onde progressive : y = y0 − A·sin(2π(cycles·x/width + phase)), phase en tours
export const wavePath = ({
  width,
  amplitude,
  cycles,
  phase = 0,
  y0 = 0,
  samples = 240,
}: {
  width: number;
  amplitude: number;
  cycles: number;
  phase?: number;
  y0?: number;
  samples?: number;
}) => {
  const points: Point[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * width;
    points.push([x, y0 - amplitude * Math.sin(2 * Math.PI * ((cycles * x) / width + phase))]);
  }
  return toPath(points);
};

// Somme de plusieurs ondes (même échelle de temps) : sert au battement
export const sumWavePath = ({
  width,
  amplitude,
  freqs,
  duration,
  y0 = 0,
  samples = 600,
}: {
  width: number;
  amplitude: number;
  freqs: number[];
  duration: number; // secondes représentées sur la largeur
  y0?: number;
  samples?: number;
}) => {
  const points: Point[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * duration;
    const v = freqs.reduce((acc, f) => acc + Math.sin(2 * Math.PI * f * t), 0) / freqs.length;
    points.push([(i / samples) * width, y0 - amplitude * v]);
  }
  return toPath(points);
};

// Corde en onde stationnaire : y = A·sin(n·π·x)·cos(2π·t·v), x normalisé 0 → 1
export const standingWavePath = ({
  width,
  n,
  amplitude,
  t,
  speed,
  y0 = 0,
  samples = 160,
}: {
  width: number;
  n: number;
  amplitude: number;
  t: number; // secondes
  speed: number; // tours par seconde
  y0?: number;
  samples?: number;
}) => {
  const c = Math.cos(2 * Math.PI * t * speed);
  const points: Point[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = i / samples;
    points.push([x * width, y0 + amplitude * Math.sin(n * Math.PI * x) * c]);
  }
  return toPath(points);
};
