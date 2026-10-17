# Épisode 01 · Pourquoi la quinte sonne bien ?

| | |
|---|---|
| Slug | `01-quinte` |
| Id de composition | `quinte` |
| Format | 1080 × 1920, 30 fps |
| Durée | 1860 frames (62 s) |
| F0 | Do2 = 65,41 Hz. Sol = F0 × 1,5 (quinte juste, 98,12 Hz). Do♯ = F0 × 2^(1/12) (69,30 Hz) |
| Charte | `charte/CHARTE.md` |

## L'idée à retenir

Une note contient déjà d'autres notes, ses harmoniques. Après l'octave, la quinte est la note qui en partage le plus avec la note de départ. Une note presque identique, elle, ne tombe jamais pile et ça frotte.

## Découpage

| Scène | Nom | Frames | Durée |
|---|---|---|---|
| 0 | Accroche | 0 → 150 | 5 s |
| 1 | Une note n'est jamais seule | 150 → 450 | 10 s |
| 2 | La série harmonique | 450 → 810 | 12 s |
| 3 | Les notes en commun | 810 → 1200 | 13 s |
| 4 | Le frottement | 1200 → 1500 | 10 s |
| 5 | Le motif qui boucle | 1500 → 1710 | 7 s |
| 6 | Outro | 1710 → 1860 | 5 s |

Une **fuite de lumière** couvre chaque coupe entre deux scènes (7 frames avant, 7 après). Le **FilmFrame** est présent en permanence, son marquage vertical affiche `01A`, `02A`… selon la scène.

Dans les tableaux ci-dessous, les frames sont **relatives au début de la scène**.

---

## Scène 0 · Accroche (0 → 150)

**Voix** : « Joue un do et un sol ensemble. Ça sonne évident. Mais pourquoi ? »
**Étiquette** : `▸ 00 · ÉPISODE 1`
**Titre** : POURQUOI ÇA SONNE **BIEN ?** (« BIEN ? » en `gold`)

| Frames | Animation |
|---|---|
| 0 → 18 | Allumage projecteur. Les perforations commencent à défiler. |
| 10 → 40 | Étiquette en machine à écrire. Logo en fondu. |
| 14 → 38 | Titre en révélation, 2 lignes. |
| 30 → 50 | Clavier (une octave, Do à Do) en développement, sous le titre en bas du bloc central. |
| 52 | Touches Do et Sol enfoncées ensemble : spring `snap`, descente de 6 px, remplissage `gold` et `ember`. Son `do_sol` démarre. |
| 56 → 86 | Ondes tracées au-dessus du clavier. Do (`gold`, 2 oscillations sur la largeur) puis Sol (`ember`, 3 oscillations), décalage de 6 frames. Étiquettes « do » et « sol » en serif italique. |
| 86 → 150 | Les ondes vivent : leur phase avance (do à 1 tour par 30 frames, sol à 1,5 tour par 30 frames, le rapport reste 3:2). |
| 100 → 150 | Le mot « bien » pulse une fois à la frame 120, sur « pourquoi ». |

**Son** : `do_sol` à la frame 52.

## Scène 1 · Une note n'est jamais seule (150 → 450)

**Voix** : « Quand une corde vibre, elle vibre entière… mais aussi en deux, en trois, en quatre. Chaque morceau ajoute une note plus aiguë : ce sont les harmoniques. »
**Étiquette** : `▸ 01 · LES HARMONIQUES`
**Titre** : UNE NOTE N'EST **JAMAIS SEULE**

**Visuel** : quatre cordes horizontales empilées, chacune tendue entre deux chevalets (petits triangles `umber`). Corde 1 en `gold` épais (8 px), cordes 2 à 4 de plus en plus fines. Chaque corde vibre en onde stationnaire : `y = A · sin(n·π·x) · cos(2π·t·v)` avec n ventres. Amplitude décroissante : A = 90 / n px.

| Frames | Animation |
|---|---|
| 0 → 30 | Étiquette machine à écrire, titre en révélation. |
| 30 → 60 | Corde 1 se tend (tracé), puis vibre avec 1 ventre. Annotation « ×1 » à droite. Son `do`. |
| 90 → 120 | Corde 2 apparaît en développement sous la 1, 2 ventres, « ×2 ». Son `h2`. |
| 140 → 170 | Corde 3, 3 ventres, « ×3 ». Son `h3`. |
| 190 → 220 | Corde 4, 4 ventres, « ×4 ». Son `h4`. |
| 230 → 270 | Les quatre cordes pulsent ensemble. Annotation serif sous le groupe : « tout ça en même temps, dans une seule note ». Son `do` (complet, avec ses harmoniques). |
| 270 → 300 | Extinction des cordes 2 à 4. La corde 1 reste. |

Vitesse de vibration visuelle : corde n à n × 0,5 tour par seconde (lisible, pas réaliste).

## Scène 2 · La série harmonique (450 → 810)

**Voix** : « Voici les harmoniques d'un do. Après l'octave, la toute première nouvelle note qui apparaît… c'est un sol. La quinte est déjà cachée dans le do. »
**Étiquette** : `▸ 02 · LA SÉRIE HARMONIQUE`
**Titre** : LA QUINTE EST DÉJÀ **DANS LE DO**

**Visuel** : échelle de 8 rangées, la 1 en bas, la 8 en haut. Chaque rangée : numéro (mono `muted`), barre horizontale de longueur `520 / √n` px, puis « Note · Hz ».

| n | Hz | Note | Couleur de barre |
|---|---|---|---|
| 1 | 65 | Do | `gold` |
| 2 | 131 | Do | `gold` |
| 3 | 196 | **Sol** | `ember` |
| 4 | 262 | Do | `gold` |
| 5 | 327 | Mi | `umber` |
| 6 | 392 | **Sol** | `ember` |
| 7 | 458 | Si♭ | `umber` |
| 8 | 523 | Do | `gold` |

| Frames | Animation |
|---|---|
| 0 → 30 | Étiquette, titre. |
| 30 → 190 | Rangées 1 à 8 tracées de bas en haut, une toutes les 20 frames : la barre se trace de gauche à droite (12 frames), puis le texte apparaît. Chaque rangée déclenche son son `h1` à `h8` (arpège). |
| 200 → 230 | Les rangées 3 et 6 s'allument : fond `ember` à 18 % qui se développe derrière la rangée, texte en `emberLight`. |
| 230 → 260 | Annotation « ← déjà là ! » écrite à droite de la barre 3 (révélation de gauche à droite par masque). |
| 260 → 330 | Rangée 3 pulse deux fois (frames 270 et 300) sur « c'est un sol ». Son `sol`. |
| 300 → 340 | Légende en serif `muted` : « Plus la barre est longue, plus l'harmonique est forte. » |
| 340 → 360 | Extinction de tout sauf les barres 1 à 8 (préparent la scène suivante). |

## Scène 3 · Les notes en commun (810 → 1200)

**Voix** : « Le sol vibre exactement 1,5 fois plus vite que le do : un rapport 3 pour 2. Résultat : la troisième harmonique du do, c'est la deuxième du sol. Et ça continue plus haut. Elles se renforcent au lieu de se gêner. »
**Étiquette** : `▸ 03 · LES NOTES EN COMMUN`
**Titre** : DO ET SOL PARTAGENT **DES NOTES**

**Visuel** : deux échelles verticales côte à côte, axe vertical = fréquence (bas grave, haut aigu, même échelle pour les deux). Mention discrète en bas : `▲ PLUS AIGU`.
- Gauche « harmoniques du do » (`gold`) : 9 barreaux, n × F0 pour n = 1 à 9. Noms à gauche : Do, Do, Sol, Do, Mi, Sol, Si♭, Do, Ré.
- Droite « du sol » (`ember`) : 6 barreaux, n × 1,5 F0 pour n = 1 à 6. Noms à droite : Sol, Sol, Ré, Sol, Si, Ré.
- Liens horizontaux `paper` avec halo entre barreaux de même fréquence : 196 Hz (Sol), 392 Hz (Sol), 588 Hz (Ré). Étiquette mono au-dessus de chaque lien.
- Position verticale : `y = bas − (f − F0) × k`, avec k calculé pour que 9 × F0 tienne en haut de la zone (environ 880 px de haut en 1080p).

| Frames | Animation |
|---|---|
| 0 → 30 | Étiquette, titre. |
| 30 → 100 | Échelle du do : les 9 barreaux se tracent de bas en haut (un toutes les 7 frames, 10 frames chacun). Son `do`. |
| 110 → 170 | Échelle du sol : 6 barreaux de bas en haut (un toutes les 10 frames). Son `sol`. |
| 180 → 210 | Lien 196 Hz : le trait se trace de gauche à droite, le halo se développe, les deux barreaux reliés pulsent. Son `do_sol`. |
| 210 → 225 | Lien 392 Hz, même animation, plus rapide. |
| 225 → 240 | Lien 588 Hz. |
| 250 → 300 | Phrase serif sous les échelles : « La 3e harmonique du do est la 2e du sol. C'est tout le sens du “3 pour 2”. » Pendant la phrase, le barreau 3 du do et le barreau 2 du sol s'allument avec un contour `paper` (frame 260). |
| 300 → 390 | Les trois liens pulsent en vague de bas en haut toutes les 30 frames, sur « elles se renforcent ». |

## Scène 4 · Le frottement (1200 → 1500)

**Voix** : « Compare avec un do dièse. Ses harmoniques tombent presque au même endroit que celles du do, mais pas tout à fait. Et ce presque, ton oreille l'entend comme un frottement. »
**Étiquette** : `▸ 04 · LE FROTTEMENT`
**Titre** : PRESQUE PAREIL **= ÇA FROTTE** (deuxième partie en `ember`)

**Visuel** : en haut, l'onde résultante de do + do♯ en `paper` avec son enveloppe en pointillés `ember`. En dessous, les deux échelles comme en scène 3, mais à droite le do♯ (`paper`, 8 barreaux, noms : Do♯, Do♯, Sol♯, Do♯, Fa, Sol♯, Si, Do♯). Liens en pointillés `ember` entre barreaux de même rang, de plus en plus inclinés, avec l'écart en Hz au milieu : 4, 8, 12, 16, 20, 23, 27, 31 Hz.

| Frames | Animation |
|---|---|
| 0 → 30 | Fuite de lumière déjà passée. Titre en révélation. L'échelle du do de la scène 3 reste en place (continuité), l'échelle du sol et les liens s'éteignent (frames 0 à 10). |
| 30 → 80 | L'échelle du do♯ se développe barreau par barreau. Son `do_dos` démarre à 40 et dure jusqu'à 200. |
| 80 → 150 | Les 8 liens pointillés se tracent de bas en haut. L'étiquette Hz de chaque lien compte de 0 à sa valeur en 8 frames. |
| 150 → 190 | Onde résultante tracée en haut, puis son enveloppe. |
| 190 → 300 | **Battement synchronisé** : l'enveloppe de l'onde et un halo `ember` léger sur toute l'échelle pulsent à la vraie fréquence de battement des fondamentales, Δf = 3,89 Hz, soit un cycle toutes les 7,7 frames. Calculer depuis les fréquences, pas en dur. |
| 240 → 280 | Mot « presque » du sous-titre surligné en `ember` au lieu de `gold`. |

## Scène 5 · Le motif qui boucle (1500 → 1710)

**Voix** : « Deux vibrations de do, trois vibrations de sol, et tout recommence. Un motif court et régulier : c'est ça, une consonance. »
**Étiquette** : `▸ 05 · LA CONSONANCE`
**Titre** : UN MOTIF QUI **BOUCLE**

**Visuel** : les deux ondes de la scène 0, plus grandes (pleine largeur), do au-dessus, sol en dessous. Un cadre `gold` (contour 3 px, coins arrondis 6 px) entoure exactement 2 cycles de do et 3 de sol.

| Frames | Animation |
|---|---|
| 0 → 30 | Titre, ondes tracées. Son `do_sol_long` démarre à 10. |
| 40 → 60 | Le cadre se dessine autour du premier motif. Compteurs au-dessus et en dessous : « 1, 2 » sur le do, « 1, 2, 3 » sur le sol, chaque chiffre apparaît au passage de la crête correspondante. |
| 60 → 160 | Les ondes défilent vers la gauche à vitesse constante (un motif complet par 30 frames). Le cadre reste fixe : à chaque fois qu'un motif entier est passé, le cadre fait un petit tampon (spring `snap`, échelle 1 → 1,04 → 1). |
| 160 → 200 | Annotation serif `muted` en bas : « Sur un piano moderne, la quinte est faussée de 2 cents. Presque rien. » |
| 200 → 210 | Extinction générale. |

## Scène 6 · Outro (1710 → 1860)

**Voix** : « Et la tierce, alors ? Elle, c'est une autre histoire. Prochain épisode. »
**Texte** : PROCHAIN ÉPISODE (mono) puis **LA TIERCE, CE COMPROMIS** (titre)

| Frames | Animation |
|---|---|
| 0 → 30 | Le rond du logo se trace au centre (240 px de diamètre, contour `paper` 10 px), « GHOST-NOTE » apparaît dessous en machine à écrire. |
| 40 → 70 | « PROCHAIN ÉPISODE » puis le titre en révélation sous le logo. |
| 110 → 150 | Fin de bobine : les perforations ralentissent puis s'arrêtent (frames 110 à 130), flash d'exposition à 135, noir complet à 150. |

---

## Sous-titres provisoires

Une réplique par scène, mots répartis uniformément entre la frame 20 et la frame (durée − 20) de la scène. À remplacer par `captions.json` après l'enregistrement de la voix off.

## Sons

Définis dans `audio.config.json`, générés par `node scripts/generate-audio.mjs 01-quinte`. Ids utilisés : `do`, `sol`, `do_sol`, `do_sol_long`, `do_dos`, `h1` à `h8`.

## Références visuelles

Les écrans clés validés (scènes 0, 2, 3, 4) sont dans le canvas « Quinte · écrans clés ». Ils sont à 540 × 960 : doubler toutes les mesures pour le 1080 × 1920.
