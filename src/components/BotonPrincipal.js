// src/components/BotonPrincipal.js
// Componente de Acción: Botón reutilizable para acciones principales y secundarias
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function BotonPrincipal({
  texto,
  onPress,
  variante = 'primario', // 'primario' | 'secundario' | 'borde' | 'peligro'
  tamano = 'md',          // 'sm' | 'md' | 'lg'
  deshabilitado = false,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        styles[`tamano_${tamano}`],
        styles[`variante_${variante}`],
        pressed && !deshabilitado && styles[`presionado_${variante}`],
        deshabilitado && styles.deshabilitado,
        style,
      ]}
    >
      <Text
        style={[
          styles.textoBase,
          styles[`textoTamano_${tamano}`],
          styles[`textoVariante_${variante}`],
          deshabilitado && styles.textoDeshabilitado,
        ]}
      >
        {texto}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // Tamaños
  tamano_sm: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },
  tamano_md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  tamano_lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  // Variantes de color
  variante_primario: {
    backgroundColor: colors.primary,
  },
  variante_secundario: {
    backgroundColor: colors.secondary,
  },
  variante_borde: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  variante_peligro: {
    backgroundColor: colors.occupied,
  },
  // Estados al presionar
  presionado_primario: {
    backgroundColor: colors.primaryDark,
    opacity: 0.9,
  },
  presionado_secundario: {
    opacity: 0.85,
  },
  presionado_borde: {
    backgroundColor: colors.primaryLight,
  },
  presionado_peligro: {
    opacity: 0.85,
  },
  // Estado deshabilitado
  deshabilitado: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
    opacity: 0.6,
  },
  // Textos
  textoBase: {
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
  },
  textoTamano_sm: {
    fontSize: fontSize.sm,
  },
  textoTamano_md: {
    fontSize: fontSize.md,
  },
  textoTamano_lg: {
    fontSize: fontSize.lg,
  },
  textoVariante_primario: {
    color: colors.textInverted,
  },
  textoVariante_secundario: {
    color: colors.textInverted,
  },
  textoVariante_borde: {
    color: colors.primary,
  },
  textoVariante_peligro: {
    color: colors.textInverted,
  },
  textoDeshabilitado: {
    color: colors.disabledText,
  },
});
