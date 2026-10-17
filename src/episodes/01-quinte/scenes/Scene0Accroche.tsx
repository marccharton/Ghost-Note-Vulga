import { AbsoluteFill, Audio, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { develop } from '../../../shared/lib/anim';
import { Keyboard } from '../../../shared/music/Keyboard';
import { Wave } from '../../../shared/music/Wave';
import { Caption, uniformWords } from '../../../shared/text/Caption';
import { SerifNote } from '../../../shared/text/SerifNote';
import { audio, colors, layout, noteRoles } from '../../../shared/theme';
import doSol from '../audio/do_sol.wav';
import { F0, SOL } from '../freqs';
import { SceneHeader } from './SceneHeader';

const DURATION = 150;
const VOICE = 'Joue un do et un sol ensemble. Ça sonne évident. Mais pourquoi ?';
const CONTENT_WIDTH = layout.width - layout.padLeft - layout.padRight;
const AMPLITUDE = 80;
const LIVE_FROM = 86; // les ondes vivent à partir de cette frame

export const Scene0Accroche: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Phase en tours : do à 1 tour par seconde (30 frames), sol à freq/F0 tours, le rapport reste 3:2
  const t = Math.max(0, frame - LIVE_FROM) / fps;
  const phase = (freq: number) => t * (freq / F0);

  const waves = [
    { name: 'do', freq: F0, color: noteRoles.reference, top: 640, drawStart: 56 },
    { name: 'sol', freq: SOL, color: noteRoles.compared, top: 920, drawStart: 62 },
  ];

  return (
    <AbsoluteFill>
      <SceneHeader
        label="▸ 00 · ÉPISODE 1"
        labelStart={10}
        titleStart={14}
        title={[
          [{ text: 'POURQUOI ÇA' }],
          [{ text: 'SONNE ' }, { text: 'BIEN ?', color: colors.gold, pulseAt: [120] }],
        ]}
      />

      {waves.map((w) => (
        <div key={w.name} style={{ position: 'absolute', left: layout.padLeft, top: w.top, width: CONTENT_WIDTH }}>
          <SerifNote start={w.drawStart} dur={12} color={w.color === noteRoles.compared ? colors.emberLight : w.color}>
            {w.name}
          </SerifNote>
          <Wave
            freq={w.freq}
            refFreq={F0}
            refCycles={2}
            width={CONTENT_WIDTH}
            amplitude={AMPLITUDE}
            color={w.color}
            drawStart={w.drawStart}
            phase={phase(w.freq)}
            style={{ marginTop: 8 }}
          />
        </div>
      ))}

      <div style={{ position: 'absolute', left: layout.padLeft, top: 1210, ...develop(frame, 30) }}>
        <Keyboard
          width={CONTENT_WIDTH}
          height={300}
          pressed={[
            { key: 'do', color: noteRoles.reference, at: 52 },
            { key: 'sol', color: noteRoles.compared, at: 52 },
          ]}
        />
      </div>

      <Sequence from={52} layout="none">
        <Audio src={doSol} volume={audio.underVoice} />
      </Sequence>

      <Caption words={uniformWords(VOICE, 20, DURATION - 20)} />
    </AbsoluteFill>
  );
};
