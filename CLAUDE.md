# Ghost-Note Vulga : série de vidéos de vulgarisation musicale

Projet Remotion qui produit une série de vidéos verticales courtes (environ 1 minute) pour Ghost-Note, la marque de transmission musicale de Marc Charton.
**Un dossier = un épisode = une vidéo.** Tous les épisodes partagent la même charte et les mêmes composants.

## Arborescence

```
ghost-note-vulga/
├── CLAUDE.md                  ← ce fichier, règles du projet
├── README.md                  ← mise en route
├── charte/
│   └── CHARTE.md              ← identité visuelle et grammaire d'animation (source de vérité)
├── scripts/
│   └── generate-audio.mjs     ← génère les WAV d'un épisode depuis son audio.config.json
├── src/
│   ├── index.ts               ← registerRoot(Root)
│   ├── Root.tsx               ← enregistre une <Composition> par épisode, depuis le registre
│   ├── shared/                ← tout ce qui sert à plusieurs épisodes
│   │   ├── theme.ts           ← tokens de la charte (couleurs, polices, timings)
│   │   ├── fonts.ts           ← chargement des polices via @remotion/google-fonts
│   │   ├── film/              ← FilmFrame, FilmStrip, Grain, Vignette, LightLeak, GateWeave
│   │   ├── text/              ← StepLabel, Title, Caption, SerifNote, LogoMark
│   │   ├── music/             ← Keyboard, Wave, HarmonicLadder, LadderLink, BeatWave
│   │   └── lib/               ← draw-on, springs, helpers fréquences/notes
│   └── episodes/
│       ├── index.ts           ← registre : liste des épisodes exportés
│       ├── _template/         ← modèle à copier pour un nouvel épisode
│       │   ├── storyboard.md
│       │   └── audio.config.json
│       └── 01-quinte/
│           ├── storyboard.md  ← script, voix off, animations scène par scène
│           ├── audio.config.json
│           ├── index.tsx      ← export { meta, Episode }
│           ├── scenes/        ← un fichier par scène (Scene0Accroche.tsx…)
│           ├── audio/         ← WAV générés + voix off (voix-off.wav)
│           └── captions.json  ← sous-titres mot par mot (après enregistrement voix)
└── out/                       ← rendus MP4, un fichier par épisode : out/<slug>.mp4
```

## Règles de travail

1. **Périmètre strict par épisode.** Quand on travaille sur `src/episodes/<slug>/`, ne modifie aucun autre épisode. Si un composant manque, ajoute-le dans `src/shared/` et signale-le.
2. **Le storyboard de l'épisode est le cahier des charges.** Timings, textes, voix off et animations viennent de `src/episodes/<slug>/storyboard.md`. En cas de doute, demande plutôt que d'inventer.
3. **La charte est la seule source de style.** Couleurs, polices, mouvements : `charte/CHARTE.md` et `src/shared/theme.ts`. Aucune couleur en dur dans les scènes.
4. **Avancer par paliers.** Pour un nouvel épisode : plan d'abord, puis scènes 0 à 2, pause pour validation dans le Studio, puis la suite.
5. **Composants partagés stables.** Changer l'API d'un composant de `shared/` peut casser les épisodes déjà rendus : vérifie les usages existants avant, et garde la rétrocompatibilité.

## Contrat d'un épisode

Chaque `src/episodes/<slug>/index.tsx` exporte :

```ts
export const meta = {
  id: 'quinte',                 // id de composition Remotion (lettres, chiffres, tirets)
  slug: '01-quinte',
  title: 'Pourquoi la quinte sonne bien ?',
  durationInFrames: 1860,
  fps: 30,
  width: 1080,
  height: 1920,
};
export const Episode: React.FC = () => { /* <Series> ou <Sequence> des scènes */ };
```

`src/episodes/index.ts` importe chaque épisode et l'ajoute au tableau `episodes`. `Root.tsx` boucle dessus pour créer les compositions. Ajouter un épisode = une ligne dans ce registre.

## Conventions techniques

- Format : 1080 × 1920, 30 fps. Les timings du storyboard sont en frames, relatifs au début de chaque scène.
- Une scène = un composant dans `scenes/`, monté dans une `<Sequence from={…} durationInFrames={…}>`. Les bornes de scène viennent d'un objet `SCENES` en haut de `index.tsx`.
- Tous les tracés sont en SVG, calculés depuis les vraies fréquences (`F0` défini dans l'épisode). Jamais de path figé copié à la main.
- Animations : `interpolate` avec `extrapolateLeft/Right: 'clamp'` et `spring` avec les presets de `theme.ts`. Rien ne doit dépendre de `Math.random()` : utiliser `random(seed)` de Remotion pour le grain et le gate weave.
- Audio : importé par `import x from './audio/do.wav'` puis `<Audio src={x} />`, placé dans la scène concernée.
- Polices : `@remotion/google-fonts` (Big Shoulders Display, Instrument Sans, Instrument Serif, IBM Plex Mono), chargées dans `shared/fonts.ts`.
- Texte à l'écran en français, avec les accents.

## Commandes

```
npm run dev                                  # Remotion Studio
node scripts/generate-audio.mjs 01-quinte    # génère les sons d'un épisode
npx remotion render quinte out/01-quinte.mp4 # rendu final d'un épisode
```

## Créer un nouvel épisode

1. Copier `src/episodes/_template/` vers `src/episodes/NN-sujet/`.
2. Remplir `storyboard.md` et `audio.config.json`.
3. Ajouter l'épisode au registre `src/episodes/index.ts`.
4. Demander à Claude : « Génère l'épisode NN-sujet à partir de son storyboard. »
