import { AbsoluteFill, Audio, Sequence, useCurrentFrame } from 'remotion';
import { fadeOut } from '../../../shared/lib/anim';
import { harmonic, harmonicName } from '../../../shared/lib/music';
import { HarmonicLadder, type LadderRow } from '../../../shared/music/HarmonicLadder';
import { Caption, uniformWords } from '../../../shared/text/Caption';
import { SerifNote } from '../../../shared/text/SerifNote';
import { audio, colors, layout, noteRoles } from '../../../shared/theme';
import h1 from '../audio/h1.wav';
import h2 from '../audio/h2.wav';
import h3 from '../audio/h3.wav';
import h4 from '../audio/h4.wav';
import h5 from '../audio/h5.wav';
import h6 from '../audio/h6.wav';
import h7 from '../audio/h7.wav';
import h8 from '../audio/h8.wav';
import solNote from '../audio/sol.wav';
import { F0 } from '../freqs';
import { SceneHeader } from './SceneHeader';

const DURATION = 360;
const VOICE =
  'Voici les harmoniques d’un do. Après l’octave, la toute première nouvelle note qui apparaît… c’est un sol. La quinte est déjà cachée dans le do.';

const HARMONIC_SOUNDS = [h1, h2, h3, h4, h5, h6, h7, h8];
const ARPEGGIO_START = 30;
const ARPEGGIO_STAGGER = 20;
const HIGHLIGHT_AT = 200;
const PULSES = [270, 300];
const FADE_AT = 340;

// Couleur de barre selon la note : do = référence, sol = note comparée, le reste en umber
const barColor = (name: string): string =>
  name === 'Do' ? noteRoles.reference : name === 'Sol' ? noteRoles.compared : colors.umber;

const ROWS: LadderRow[] = HARMONIC_SOUNDS.map((_, i) => {
  const n = i + 1;
  const name = harmonicName(n);
  return { n, label: `${name} · ${Math.round(harmonic(F0, n))} Hz`, color: barColor(name) };
});

const SOL_ROWS = ROWS.filter((r) => r.color === noteRoles.compared).map((r) => r.n);

export const Scene2Serie: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = fadeOut(frame, FADE_AT, 20);

  return (
    <AbsoluteFill>
      <div style={exit}>
        <SceneHeader
          label="▸ 02 · LA SÉRIE HARMONIQUE"
          titleFontSize={120}
          title={[[{ text: 'LA QUINTE EST' }], [{ text: 'DÉJÀ ' }, { text: 'DANS LE DO', color: colors.gold }]]}
        />
      </div>

      <HarmonicLadder
        rows={ROWS}
        start={ARPEGGIO_START}
        stagger={ARPEGGIO_STAGGER}
        drawDur={12}
        highlight={{ rows: SOL_ROWS, at: HIGHLIGHT_AT, dur: 30, color: colors.ember, textColor: colors.emberLight }}
        pulse={{ rows: [3], at: PULSES }}
        annotations={{
          3: (
            <SerifNote mode="wipe" start={230} dur={30} color={colors.emberLight} fontSize={50}>
              ← déjà là !
            </SerifNote>
          ),
        }}
        fadeOutAt={FADE_AT}
        style={{ position: 'absolute', left: layout.padLeft, top: 580 }}
      />

      <div style={{ position: 'absolute', left: layout.padLeft, right: layout.padRight, top: 1350, ...exit }}>
        <SerifNote start={300} dur={40} color={colors.muted} fontSize={50}>
          Plus la barre est longue, plus l’harmonique est forte.
        </SerifNote>
      </div>

      {HARMONIC_SOUNDS.map((src, i) => (
        <Sequence key={i} from={ARPEGGIO_START + i * ARPEGGIO_STAGGER} layout="none">
          <Audio src={src} volume={audio.underVoice} />
        </Sequence>
      ))}
      <Sequence from={PULSES[0]} layout="none">
        <Audio src={solNote} volume={audio.underVoice} />
      </Sequence>

      <Caption words={uniformWords(VOICE, 20, DURATION - 20)} />
    </AbsoluteFill>
  );
};
