import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { combine, develop, drawOn, fadeOut, halo, progress, pulse } from '../../../shared/lib/anim';
import { standingWavePath } from '../../../shared/lib/music';
import { Caption, uniformWords } from '../../../shared/text/Caption';
import { SerifNote } from '../../../shared/text/SerifNote';
import { audio, colors, layout, noteRoles } from '../../../shared/theme';
import doNote from '../audio/do.wav';
import h2 from '../audio/h2.wav';
import h3 from '../audio/h3.wav';
import h4 from '../audio/h4.wav';
import { SceneHeader } from './SceneHeader';

const DURATION = 300;
const VOICE =
  'Quand une corde vibre, elle vibre entière… mais aussi en deux, en trois, en quatre. Chaque morceau ajoute une note plus aiguë : ce sont les harmoniques.';

const STRING_LEFT = layout.padLeft + 40;
const STRING_WIDTH = 690;
const FIRST_Y = 700;
const GAP = 190;
const TOGETHER_AT = 230;
const FADE_AT = 270;

// Corde n : apparition, début de vibration, son
const STRINGS = [
  { n: 1, appear: 30, vibrate: 50, sound: doNote, stroke: 8 },
  { n: 2, appear: 90, vibrate: 90, sound: h2, stroke: 6 },
  { n: 3, appear: 140, vibrate: 140, sound: h3, stroke: 4.5 },
  { n: 4, appear: 190, vibrate: 190, sound: h4, stroke: 3 },
];

const Bridge: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <polygon points={`${x - 12},${y + 24} ${x + 12},${y + 24} ${x},${y + 4}`} fill={colors.umber} />
);

export const Scene1Harmoniques: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const together = pulse(frame, TOGETHER_AT);

  return (
    <AbsoluteFill>
      <SceneHeader
        label="▸ 01 · LES HARMONIQUES"
        title={[[{ text: 'UNE NOTE N’EST' }], [{ text: 'JAMAIS SEULE', color: colors.gold }]]}
      />

      {STRINGS.map((s, i) => {
        const y = FIRST_Y + i * GAP;
        const amplitude = (90 / s.n) * progress(frame, s.vibrate, 10);
        // Vitesse visuelle : corde n à n × 0,5 tour par seconde
        const t = Math.max(0, frame - s.vibrate) / fps;
        const { d } = standingWavePath({ width: STRING_WIDTH, n: s.n, amplitude, t, speed: s.n * 0.5, y0: y });
        const drawing = s.vibrate > s.appear && frame < s.vibrate; // seule la corde 1 se tend par tracé
        const enter = s.n === 1 ? {} : develop(frame, s.appear);
        const exit = s.n === 1 ? {} : fadeOut(frame, FADE_AT);
        return (
          <div key={s.n} style={{ position: 'absolute', inset: 0, ...combine(enter, exit) }}>
            <svg
              width={layout.width}
              height={layout.height}
              style={{ position: 'absolute', inset: 0, filter: halo(together) }}
            >
              <g opacity={s.n === 1 ? progress(frame, s.appear, 6) : 1}>
                <Bridge x={STRING_LEFT} y={y} />
                <Bridge x={STRING_LEFT + STRING_WIDTH} y={y} />
              </g>
              <path
                d={d}
                transform={`translate(${STRING_LEFT} 0)`}
                fill="none"
                stroke={noteRoles.reference}
                strokeWidth={s.stroke}
                strokeLinecap="round"
                strokeDasharray={drawing ? STRING_WIDTH : undefined}
                strokeDashoffset={drawing ? drawOn(frame, s.appear, s.vibrate - s.appear, STRING_WIDTH) : undefined}
              />
            </svg>
            <SerifNote
              start={s.vibrate}
              dur={12}
              style={{ position: 'absolute', left: STRING_LEFT + STRING_WIDTH + 40, top: y - 40 }}
            >
              ×{s.n}
            </SerifNote>
            <Sequence from={s.vibrate} layout="none">
              <Audio src={s.sound} volume={audio.underVoice} />
            </Sequence>
          </div>
        );
      })}

      <div style={{ position: 'absolute', left: layout.padLeft, right: layout.padRight, top: 1390, ...fadeOut(frame, FADE_AT) }}>
        <SerifNote start={TOGETHER_AT} fontSize={50}>tout ça en même temps, dans une seule note</SerifNote>
      </div>
      <Sequence from={TOGETHER_AT} layout="none">
        <Audio src={doNote} volume={audio.underVoice} />
      </Sequence>

      <Caption words={uniformWords(VOICE, 20, DURATION - 20)} />
    </AbsoluteFill>
  );
};
