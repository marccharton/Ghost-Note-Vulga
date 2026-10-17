import { interpolate, useCurrentFrame } from 'remotion';
import { clamp } from '../lib/anim';
import { colors, layout, type } from '../theme';

export type CaptionWord = { word: string; from: number; to: number };

// Surlignage d'un mot dans une couleur autre que gold (ex. « presque » en ember)
export type CaptionOverride = { index: number; color: string; from: number; to: number };

// Timings provisoires : mots répartis uniformément entre from et to
export const uniformWords = (text: string, from: number, to: number): CaptionWord[] => {
  const words = text.split(/\s+/).filter(Boolean);
  const step = (to - from) / words.length;
  return words.map((word, i) => ({ word, from: from + i * step, to: from + (i + 1) * step }));
};

// Regroupe les mots par phrase pour n'afficher que la phrase en cours
const sentences = (words: CaptionWord[]): CaptionWord[][] => {
  const out: CaptionWord[][] = [[]];
  words.forEach((w, i) => {
    out[out.length - 1].push(w);
    if (/[.?!»]$/.test(w.word) && i < words.length - 1) out.push([]);
  });
  return out;
};

// Sous-titres karaoké : phrase entière, mot actif sur fond gold
export const Caption: React.FC<{ words: CaptionWord[]; overrides?: CaptionOverride[] }> = ({
  words,
  overrides = [],
}) => {
  const frame = useCurrentFrame();
  const groups = sentences(words);
  const active = words.findIndex((w) => frame >= w.from && frame < w.to);
  const lastStarted = words.reduce((acc, w, i) => (frame >= w.from ? i : acc), 0);
  let offset = 0;
  const groupIndex = groups.findIndex((g) => {
    const inside = lastStarted < offset + g.length;
    offset += g.length;
    return inside;
  });
  const first = groups.slice(0, groupIndex).reduce((a, g) => a + g.length, 0);
  return (
    <div
      style={{
        position: 'absolute',
        left: layout.padLeft,
        right: layout.padRight,
        bottom: layout.padBottom,
        height: layout.captionZone,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        opacity: interpolate(frame, [0, 8], [0, 1], clamp),
      }}
    >
      <div style={{ ...type.caption, color: colors.paper, wordSpacing: '0.15em' }}>
        {groups[groupIndex].map((w, i) => {
          const index = first + i;
          const o = overrides.find((x) => x.index === index && frame >= x.from && frame < x.to);
          const on = index === active || Boolean(o);
          return (
            <span key={index}>
              <span
                style={{
                  backgroundColor: on ? (o?.color ?? colors.gold) : undefined,
                  color: on ? colors.ink : undefined,
                  padding: '0 8px',
                  margin: '0 -8px',
                  borderRadius: 6,
                  boxDecorationBreak: 'clone',
                }}
              >
                {w.word}
              </span>{' '}
            </span>
          );
        })}
      </div>
    </div>
  );
};
