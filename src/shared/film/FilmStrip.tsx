import { colors, film, layout } from '../theme';

// Bande de pellicule à gauche. scroll = distance parcourue en px (frame × 2 par défaut).
export const FilmStrip: React.FC<{ scroll: number }> = ({ scroll }) => {
  const { sprocketHeight, sprocketPitch } = film;
  const offset = ((scroll % sprocketPitch) + sprocketPitch) % sprocketPitch;
  const count = Math.ceil(layout.height / sprocketPitch) + 2;
  const holeWidth = 30;
  return (
    <svg
      width={layout.stripWidth}
      height={layout.height}
      style={{ position: 'absolute', left: 0, top: 0 }}
    >
      <rect width={layout.stripWidth} height={layout.height} fill={colors.strip} />
      {Array.from({ length: count }, (_, i) => (
        <rect
          key={i}
          x={(layout.stripWidth - holeWidth) / 2}
          y={i * sprocketPitch - offset - (sprocketPitch - sprocketHeight) / 2}
          width={holeWidth}
          height={sprocketHeight}
          rx={5}
          fill={colors.sprocket}
        />
      ))}
    </svg>
  );
};
