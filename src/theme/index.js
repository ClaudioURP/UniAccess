// src/theme/index.js
// Punto de exportación centralizado del tema de UniAccess

export { palette, colors } from './colors';
export { typography, fontSize, fontWeight, lineHeight } from './typography';
export { spacing } from './spacing';
export { radius } from './radius';
export { shadows } from './shadows';

import { palette, colors } from './colors';
import { typography, fontSize, fontWeight, lineHeight } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { shadows } from './shadows';

const theme = {
  palette,
  colors,
  typography,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
  radius,
  shadows,
};

export default theme;
