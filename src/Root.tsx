import './shared/fonts';
import { Composition } from 'remotion';
import { episodes } from './episodes';

// Une <Composition> par épisode du registre src/episodes/index.ts
export const Root: React.FC = () => {
  return (
    <>
      {episodes.map(({ meta, Episode }) => (
        <Composition
          key={meta.id}
          id={meta.id}
          component={Episode}
          durationInFrames={meta.durationInFrames}
          fps={meta.fps}
          width={meta.width}
          height={meta.height}
        />
      ))}
    </>
  );
};
