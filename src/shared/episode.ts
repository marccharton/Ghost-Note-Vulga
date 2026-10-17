// Contrat d'un épisode (voir CLAUDE.md)
export type EpisodeMeta = {
  id: string;
  slug: string;
  title: string;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
};

export type EpisodeModule = {
  meta: EpisodeMeta;
  Episode: React.FC;
};

// Bornes d'une scène, en frames absolues de l'épisode
export type SceneBounds = {
  number: number;
  from: number;
  durationInFrames: number;
};
