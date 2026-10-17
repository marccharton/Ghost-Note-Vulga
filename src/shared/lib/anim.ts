// Grammaire d'animation de la charte (charte/CHARTE.md). Toutes les frames sont relatives à la scène.
import { Easing, interpolate, spring } from 'remotion';
import { colors, durations, springs } from '../theme';
import { withAlpha } from './color';

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// Avancement 0 → 1 entre start et start + dur
export const progress = (
  frame: number,
  start: number,
  dur: number,
  easing: (t: number) => number = (t) => t,
): number => interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing });

// Tracé : strokeDashoffset de la longueur totale à 0, easing out(cubic)
export const drawOn = (frame: number, start: number, dur: number, length: number): number =>
  length * (1 - progress(frame, start, dur, Easing.out(Easing.cubic)));

// Révélation : 0 → 1 en spring soft, pour une montée de 40 px dans un masque
export const reveal = (frame: number, fps: number, start: number): number =>
  spring({ frame: frame - start, fps, config: springs.soft, durationInFrames: durations.reveal });

// Développement : flou 12 px → 0, luminosité 0,3 → 1, comme une photo dans le bain
export const develop = (frame: number, start: number, dur: number = durations.develop): React.CSSProperties => {
  const p = progress(frame, start, dur, Easing.out(Easing.cubic));
  return {
    opacity: interpolate(p, [0, 0.25], [0, 1], clamp),
    filter: `blur(${12 * (1 - p)}px) brightness(${0.3 + 0.7 * p})`,
  };
};

// Pulsation : intensité 0 → 1 → 0 sur 12 frames
export const pulse = (frame: number, at: number, dur: number = durations.pulse): number =>
  interpolate(frame, [at, at + dur / 2, at + dur], [0, 1, 0], { ...clamp, easing: Easing.inOut(Easing.sin) });

// Somme de plusieurs pulsations (frames de déclenchement)
export const pulses = (frame: number, ats: number[]): number => Math.min(1, ats.reduce((acc, at) => acc + pulse(frame, at), 0));

// Halo paper qui s'élargit puis retombe, à appliquer en filter
export const halo = (intensity: number, color: string = colors.paper): string =>
  intensity > 0 ? `drop-shadow(0 0 ${6 + 26 * intensity}px ${withAlpha(color, 0.75 * intensity)})` : 'none';

// Extinction : opacité 1 → 0 avec légère montée de 10 px
export const fadeOut = (frame: number, start: number, dur: number = durations.fadeOut): React.CSSProperties => {
  const p = progress(frame, start, dur, Easing.in(Easing.cubic));
  return { opacity: 1 - p, translate: `0px ${-10 * p}px` };
};

// Machine à écrire : un caractère par frame
export const typewriter = (text: string, frame: number, start: number): string => {
  const chars = Array.from(text);
  return chars.slice(0, Math.max(0, Math.floor(frame - start))).join('');
};

// Allumage projecteur : exposition 0 → 0,6 → 0,2 → 1 sur 18 frames
export const projectorOn = (frame: number, start = 0): number => {
  const d = durations.projectorOn;
  return interpolate(frame - start, [0, d / 3, (2 * d) / 3, d], [0, 0.6, 0.2, 1], clamp);
};

// Combine plusieurs styles d'animation : opacités multipliées, filtres et translations enchaînés
export const combine = (...styles: React.CSSProperties[]): React.CSSProperties => {
  const opacity = styles.reduce((acc, s) => acc * (s.opacity === undefined ? 1 : Number(s.opacity)), 1);
  const filters = styles.map((s) => s.filter).filter((f) => f && f !== 'none');
  const translates = styles.map((s) => s.translate).filter(Boolean) as string[];
  const [x, y] = translates.reduce(
    ([ax, ay], t) => {
      const [tx, ty = '0px'] = t.split(' ');
      return [ax + parseFloat(tx), ay + parseFloat(ty)];
    },
    [0, 0],
  );
  return {
    opacity,
    filter: filters.length ? filters.join(' ') : undefined,
    translate: translates.length ? `${x}px ${y}px` : undefined,
  };
};
