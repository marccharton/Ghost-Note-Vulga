import { StepLabel } from '../../../shared/text/StepLabel';
import { Title, type TitleSegment } from '../../../shared/text/Title';
import { layout } from '../../../shared/theme';

// Étiquette d'étape + titre, en haut de la zone de contenu
export const SceneHeader: React.FC<{
  label: string;
  title: TitleSegment[][];
  labelStart?: number;
  titleStart?: number;
  titleFontSize?: number;
  style?: React.CSSProperties;
}> = ({ label, title, labelStart = 0, titleStart = 4, titleFontSize, style }) => (
  <div style={{ position: 'absolute', left: layout.padLeft, right: layout.padRight, top: layout.padTop, ...style }}>
    <StepLabel text={label} start={labelStart} />
    <Title lines={title} start={titleStart} fontSize={titleFontSize} style={{ marginTop: 28 }} />
  </div>
);
