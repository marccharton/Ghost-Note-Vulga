// Tokens de la charte Ghost-Note Vulga. Source : charte/CHARTE.md
// Aucune scène ne doit utiliser de couleur ou de police en dur : tout passe par ici.

export const colors = {
  ink: '#0E0B09',
  inkGlow: '#2B1E15',
  strip: '#050403',
  sprocket: '#2E231B',
  paper: '#F1E6D2',
  gold: '#E0B35A',
  ember: '#D9772E',
  emberLight: '#F0A060',
  umber: '#6B4426',
  muted: '#9C8670',
  keyIvory: '#EFE3CC',
  keyEbony: '#15100C',
} as const;

// Rôles des notes dans un épisode
export const noteRoles = {
  reference: colors.gold,
  compared: colors.ember,
  intruder: colors.paper,
  link: colors.paper,
} as const;

// Les familles sont chargées dans shared/fonts.ts via @remotion/google-fonts
export const fonts = {
  display: '"Big Shoulders", "Big Shoulders Display", "Arial Narrow", sans-serif',
  body: '"Instrument Sans", system-ui, sans-serif',
  serif: '"Instrument Serif", Georgia, serif',
  mono: '"IBM Plex Mono", ui-monospace, monospace',
} as const;

export const type = {
  title: { fontFamily: fonts.display, fontWeight: 800, fontSize: 136, lineHeight: 0.94, textTransform: 'uppercase' as const },
  caption: { fontFamily: fonts.body, fontWeight: 600, fontSize: 50, lineHeight: 1.3 },
  note: { fontFamily: fonts.serif, fontStyle: 'italic' as const, fontSize: 56 },
  label: { fontFamily: fonts.mono, fontWeight: 500, fontSize: 24, letterSpacing: '0.2em', textTransform: 'uppercase' as const },
  data: { fontFamily: fonts.mono, fontWeight: 500, fontSize: 26 },
};

export const layout = {
  width: 1080,
  height: 1920,
  stripWidth: 72,
  padTop: 144,
  padRight: 88,
  padBottom: 120,
  padLeft: 136,
  captionZone: 240,
} as const;

export const springs = {
  soft: { damping: 200 },
  snap: { damping: 14, stiffness: 180 },
} as const;

// Durées de la grammaire d'animation, en frames à 30 fps
export const durations = {
  projectorOn: 18,
  reveal: 14,
  revealStagger: 5,
  develop: 20,
  draw: 24,
  lightLeak: 14,
  pulse: 12,
  fadeOut: 10,
} as const;

export const film = {
  grainOpacity: 0.09,
  grainEveryFrames: 2,
  weaveMaxPx: 1.5,
  weaveEveryFrames: 3,
  sprocketHeight: 28,
  sprocketPitch: 52,
  sprocketSpeedPx: 2,
} as const;

// Volume des sons synthétiques : 0,6 quand la voix off parle, 1 sinon
export const audio = {
  underVoice: 0.6,
  solo: 1,
} as const;
