import { Sequence, useCurrentFrame } from 'remotion';
import type { EpisodeMeta, SceneBounds } from '../../shared/episode';
import { FilmFrame } from '../../shared/film/FilmFrame';
import { LightLeak } from '../../shared/film/LightLeak';
import { progress, projectorOn } from '../../shared/lib/anim';
import { durations, film } from '../../shared/theme';
import { Scene0Accroche } from './scenes/Scene0Accroche';
import { Scene1Harmoniques } from './scenes/Scene1Harmoniques';
import { Scene2Serie } from './scenes/Scene2Serie';

export const meta: EpisodeMeta = {
  id: 'quinte',
  slug: '01-quinte',
  title: 'Pourquoi la quinte sonne bien ?',
  durationInFrames: 1860,
  fps: 30,
  width: 1080,
  height: 1920,
};

export { DO_DIESE, F0, SOL } from './freqs';

// Bornes des scènes, en frames absolues (storyboard.md)
export const SCENES = {
  accroche: { number: 0, from: 0, durationInFrames: 150 },
  harmoniques: { number: 1, from: 150, durationInFrames: 300 },
  serie: { number: 2, from: 450, durationInFrames: 360 },
  communes: { number: 3, from: 810, durationInFrames: 390 },
  frottement: { number: 4, from: 1200, durationInFrames: 300 },
  motif: { number: 5, from: 1500, durationInFrames: 210 },
  outro: { number: 6, from: 1710, durationInFrames: 150 },
} satisfies Record<string, SceneBounds>;

const bounds = Object.values(SCENES);

const sceneAt = (frame: number): number =>
  bounds.reduce((current, s) => (frame >= s.from ? s.number : current), 0);

export const Episode: React.FC = () => {
  const frame = useCurrentFrame();
  const exposure = projectorOn(frame);
  return (
    <FilmFrame
      sceneNumber={sceneAt(frame)}
      scroll={frame * film.sprocketSpeedPx}
      exposure={exposure}
      vignette={exposure}
      logoOpacity={progress(frame, 10, 30)}
    >
      <Sequence name="0 · Accroche" from={SCENES.accroche.from} durationInFrames={SCENES.accroche.durationInFrames}>
        <Scene0Accroche />
      </Sequence>
      <Sequence
        name="1 · Une note n'est jamais seule"
        from={SCENES.harmoniques.from}
        durationInFrames={SCENES.harmoniques.durationInFrames}
      >
        <Scene1Harmoniques />
      </Sequence>
      <Sequence name="2 · La série harmonique" from={SCENES.serie.from} durationInFrames={SCENES.serie.durationInFrames}>
        <Scene2Serie />
      </Sequence>
      {/* Fuites de lumière à cheval sur chaque coupe (7 frames avant, 7 après) */}
      {bounds.slice(1).map((s) => (
        <Sequence
          key={s.number}
          name={`Fuite de lumière ${s.number}`}
          from={s.from - durations.lightLeak / 2}
          durationInFrames={durations.lightLeak}
        >
          <LightLeak />
        </Sequence>
      ))}
    </FilmFrame>
  );
};
