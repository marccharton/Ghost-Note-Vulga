// Ajoute une opacité à une couleur hexadécimale du thème (#RRGGBB → rgba)
export const withAlpha = (hex: string, alpha: number): string => {
  const v = parseInt(hex.slice(1), 16);
  return `rgba(${(v >> 16) & 255}, ${(v >> 8) & 255}, ${v & 255}, ${alpha})`;
};
