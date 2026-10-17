import { colors, type } from '../theme';

// Logo Ghost-Note : rond crème + « GHOST-NOTE » en mono
export const LogoMark: React.FC<{ style?: React.CSSProperties; size?: number }> = ({ style, size = 36 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, ...style }}>
    <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: colors.paper }} />
    <span style={{ ...type.label, color: colors.paper }}>GHOST-NOTE</span>
  </div>
);
