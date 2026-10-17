# Charte Ghost-Note Vulga

Identité Ghost-Note : sobre, artistique, ambiance studio photo et cinéma, esthétique de pellicule développée. Chaleureux mais classe, jamais terne. Fond noir dominant, couleurs chaudes.

## Couleurs

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0E0B09` | Fond principal, noir chaud |
| `inkGlow` | `#2B1E15` | Centre du vignettage (lumière de projecteur) |
| `strip` | `#050403` | Bande de pellicule à gauche |
| `sprocket` | `#2E231B` | Perforations de la pellicule |
| `paper` | `#F1E6D2` | Texte principal, crème |
| `gold` | `#E0B35A` | Note de référence (le do de l'épisode 1), mots surlignés, accents |
| `ember` | `#D9772E` | Deuxième note (le sol), mise en garde, « ça frotte » |
| `emberLight` | `#F0A060` | Texte orange lisible sur fond noir |
| `umber` | `#6B4426` | Éléments secondaires, marquages de pellicule |
| `muted` | `#9C8670` | Texte secondaire |
| `keyIvory` | `#EFE3CC` | Touches blanches du clavier |
| `keyEbony` | `#15100C` | Touches noires |

**Rôles des notes.** Dans un épisode, la note de référence est toujours `gold`, la note comparée `ember`, une note « intruse » ou dissonante `paper`. Les liens entre notes communes sont `paper` avec un halo `paper` à 22 % d'opacité.

## Typographie

| Rôle | Police | Réglages |
|---|---|---|
| Titres | Big Shoulders Display 800 | Capitales, interlignage 0,94, 120 à 150 px en 1080p |
| Sous-titres karaoké | Instrument Sans 600 | 50 px, centré, mot actif sur fond `gold` texte `ink` |
| Annotations | Instrument Serif italique | 50 à 60 px, `gold` ou `emberLight` |
| Étiquettes, données, Hz | IBM Plex Mono 500 | Capitales, espacement 0,2 em, 24 px |

Les étiquettes d'étape suivent le format `▸ 02 · LA SÉRIE HARMONIQUE`.

## Cadre permanent (FilmFrame)

Présent sur toutes les frames de tous les épisodes :
- Fond `ink` avec vignettage radial : centre `inkGlow` à 55 % / 38 %, bord `ink` à 72 %.
- Bande de pellicule à gauche, 72 px de large en 1080p, perforations de 28 px tous les 52 px. Les perforations défilent vers le haut à 2 px par frame (le film avance).
- Marquage vertical sur le bord droit en mono `umber` : `GHOST-NOTE ▸ 400 ▸ <numéro de scène>A`. Le numéro change à chaque scène.
- Grain : bruit fractal plein cadre, opacité 0,09, mode screen, nouveau motif toutes les 2 frames.
- Gate weave : léger flottement de toute l'image, 0 à 1,5 px vertical, piloté par `random(seed)`, renouvelé toutes les 3 frames.
- Logo : rond crème de 36 px + « GHOST-NOTE » en mono, en haut à droite.
- Marges de contenu : 136 px à gauche (après la pellicule), 88 px à droite, 144 px en haut, 120 px en bas.

## Grammaire d'animation

Les mouvements évoquent la projection et le développement photo, pas l'interface d'application.

| Nom | Description | Durée |
|---|---|---|
| **Allumage projecteur** | Ouverture d'épisode : noir complet, deux flashs d'exposition (opacité 0 → 0,6 → 0,2 → 1), puis le vignettage s'installe | 18 frames |
| **Révélation** | Entrée d'un titre : chaque ligne monte de 40 px dans un masque, spring `soft` | 14 frames par ligne, décalage 5 |
| **Développement** | Entrée d'un élément graphique : flou 12 px → 0 et luminosité 0,3 → 1, comme une photo dans le bain | 20 frames |
| **Tracé** | Ondes, barreaux, liens : `strokeDashoffset` de la longueur totale à 0, easing `out(cubic)` | 20 à 30 frames |
| **Machine à écrire** | Étiquettes mono : un caractère par frame | variable |
| **Fuite de lumière** | Transition entre scènes : dégradé `ember` → `gold` qui balaie l'image en diagonale, opacité max 0,35, mode screen | 14 frames, à cheval sur la coupe |
| **Pulsation** | Mise en avant d'un élément déjà présent : halo `paper` qui s'élargit puis retombe | 12 frames |
| **Extinction** | Sortie d'un élément : opacité 1 → 0 avec légère montée de 10 px | 10 frames |

Springs dans `theme.ts` :
- `soft` : `{ damping: 200 }` pour les textes.
- `snap` : `{ damping: 14, stiffness: 180 }` pour les touches de clavier et les barreaux qui s'allument.

Interdits : clignotements, rebonds exagérés, rotations décoratives, zooms rapides. Un seul mouvement principal à la fois à l'écran.

## Sous-titres

- Bas d'écran, zone de 240 px au-dessus de la marge basse.
- Phrase entière affichée, mot actif surligné `gold` sur `ink` avec un léger padding.
- Avant l'enregistrement de la voix off : timings provisoires répartis uniformément sur la durée de la réplique.
- Après enregistrement : `captions.json` au format `[{ "word": "Joue", "from": 12, "to": 20 }]` en frames.

## Son

- Sons synthétiques : sinus avec harmoniques décroissantes (amplitude 1/n, 8 harmoniques), attaque 10 ms, relâchement 300 ms. Timbre doux, proche d'un orgue de cinéma.
- Volume des sons : 0,6 quand la voix off parle, 1 sinon.
- Voix off de Marc posée en dernier sur toute la durée de l'épisode.
