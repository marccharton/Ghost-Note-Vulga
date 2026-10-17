# Ghost-Note Vulga

Série de vidéos verticales de vulgarisation musicale, générées avec Remotion et Claude Code. Un dossier par épisode dans `src/episodes/`.

## Mise en route (une seule fois)

1. Créer le projet Remotion vide dans un dossier temporaire :
   ```
   npx create-video@latest ghost-note-vulga
   ```
   Choisir le template **Blank**, TypeScript.
2. Copier dans ce projet tout le contenu de ce kit (`CLAUDE.md`, `README.md`, `charte/`, `scripts/`, `src/shared/`, `src/episodes/`). Garder le `package.json`, `remotion.config.ts` et `tsconfig.json` générés.
3. Installer les dépendances et les skills Remotion pour Claude Code :
   ```
   cd ghost-note-vulga
   npm install
   npm install @remotion/google-fonts
   npx remotion skills add
   ```
4. Générer les sons de l'épisode 1 :
   ```
   node scripts/generate-audio.mjs 01-quinte
   ```
5. Lancer le Studio dans un terminal (`npm run dev`) et Claude Code dans un autre (`claude`).

## Premier prompt (mise en place + épisode 1)

```
Lis CLAUDE.md, charte/CHARTE.md et src/episodes/01-quinte/storyboard.md.
Passe en mode plan.

1. Mets en place l'architecture décrite dans CLAUDE.md : src/index.ts,
   src/Root.tsx qui lit le registre src/episodes/index.ts, et
   src/shared/fonts.ts.
2. Crée les composants partagés de la charte : FilmFrame (bande de
   pellicule animée, grain, vignettage, gate weave, marquage, logo),
   LightLeak, StepLabel, Title, Caption, SerifNote, et les helpers
   d'animation (draw-on, révélation, développement, pulsation).
3. Crée les composants musicaux : Keyboard, Wave, HarmonicLadder,
   LadderLink, BeatWave. Tout est calculé depuis les fréquences.
4. Crée l'épisode 01-quinte : index.tsx avec meta et SCENES, puis
   les scènes 0 à 2 seulement.

Arrête-toi là pour que je valide dans le Studio avant les scènes 3 à 6.
```

Puis, après validation : « Continue avec les scènes 3 à 6 de 01-quinte. »

## Nouvel épisode

1. Copier `src/episodes/_template/` vers `src/episodes/NN-sujet/`.
2. Remplir `storyboard.md` et `audio.config.json`, générer les sons.
3. Dans Claude Code : « Génère l'épisode NN-sujet à partir de son storyboard. Scènes 0 à 2 d'abord. »

## Rendu

```
npx remotion render quinte out/01-quinte.mp4
```

## Voix off

Enregistrer la voix sur la vidéo muette, déposer `voix-off.wav` dans `src/episodes/<slug>/audio/`, puis demander à Claude de synchroniser les sous-titres (`captions.json`) sur la voix.
