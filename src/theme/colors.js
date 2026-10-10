// src/theme/colors.js
// Identidad visual de UniAccess (Servicios universitarios y reservas de campus)

export const palette = {
  // Primario: Verde universitario deportivo (fresco, atlético e institucional)
  primary: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
  // Secundario / Acento: Azul institucional tecnológico
  secondary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  // Escala neutra para fondos, tarjetas, textos y bordes
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  // Estados funcionales (Disponibilidad, advertencia, errores)
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#22C55E',
    700: '#15803D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    700: '#B45309',
  },
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    700: '#B91C1C',
  },
  white: '#FFFFFF',
  black: '#000000',
};

// Roles semánticos del tema de UniAccess
export const colors = {
  // Roles de marca
  primary: palette.primary[600],
  primaryLight: palette.primary[100],
  primaryDark: palette.primary[800],
  secondary: palette.secondary[600],
  secondaryLight: palette.secondary[100],

  // Superficies y fondos
  background: palette.neutral[50],
  surface: palette.white,
  surfaceSubtle: palette.neutral[100],
  surfaceHighlight: palette.primary[50],

  // Tipografía
  text: palette.neutral[900],
  textSecondary: palette.neutral[600],
  textMuted: palette.neutral[400],
  textInverted: palette.white,
  textPrimary: palette.primary[700],

  // Bordes y separadores
  border: palette.neutral[200],
  borderFocus: palette.primary[500],
  borderSubtle: palette.neutral[100],

  // Estados de reserva e instalaciones
  available: palette.success[500],
  availableBg: palette.success[50],
  availableText: palette.success[700],

  occupied: palette.danger[500],
  occupiedBg: palette.danger[50],
  occupiedText: palette.danger[700],

  maintenance: palette.warning[500],
  maintenanceBg: palette.warning[50],
  maintenanceText: palette.warning[700],

  pending: palette.secondary[500],
  pendingBg: palette.secondary[50],
  pendingText: palette.secondary[700],

  // Estados interactivos
  ripple: palette.neutral[200],
  disabled: palette.neutral[300],
  disabledText: palette.neutral[400],
};
