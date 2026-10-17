import { AbsoluteFill } from 'remotion';
import { LogoMark } from '../text/LogoMark';
import { colors, layout, type } from '../theme';
import { FilmStrip } from './FilmStrip';
import { GateWeave } from './GateWeave';
import { Grain } from './Grain';
import { Vignette } from './Vignette';

type FilmFrameProps = {
  children: React.ReactNode;
  sceneNumber: number; // marquage GHOST-NOTE ▸ 400 ▸ NNA
  scroll: number; // défilement des perforations en px
  exposure?: number; // 0 = noir complet, 1 = image pleine (allumage projecteur, fin de bobine)
  vignette?: number;
  logoOpacity?: number;
};

// Cadre permanent présent sur toutes les frames de tous les épisodes
export const FilmFrame: React.FC<FilmFrameProps> = ({
  children,
  sceneNumber,
  scroll,
  exposure = 1,
  vignette = 1,
  logoOpacity = 1,
}) => {
  const marking = `GHOST-NOTE ▸ 400 ▸ ${String(sceneNumber).padStart(2, '0')}A`;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, overflow: 'hidden' }}>
      <GateWeave>
        <Vignette intensity={vignette} />
        {children}
        <FilmStrip scroll={scroll} />
        <div
          style={{
            position: 'absolute',
            right: 26,
            top: 0,
            height: layout.height,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ ...type.label, fontSize: 20, color: colors.umber, writingMode: 'vertical-rl' }}>{marking}</span>
        </div>
        <LogoMark style={{ position: 'absolute', top: 56, right: layout.padRight, opacity: logoOpacity }} />
      </GateWeave>
      <Grain />
      <AbsoluteFill style={{ backgroundColor: colors.strip, opacity: 1 - exposure, pointerEvents: 'none' }} />
    </AbsoluteFill>
  );
};
