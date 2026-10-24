// src/components/BotonIcono.js
// Componente de Acción: Botón circular con icono, usado en encabezados y acciones rápidas
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../theme';

export default function BotonIcono({
  icono,
  onPress,
  variante = 'claro', // 'claro' | 'solido' | 'sobreImagen'
  insignia,
  size = 22,
  deshabilitado = false,
  accessibilityLabel,
  style,
}) {
  const config = {
    claro: {
      fondo: colors.surfaceSubtle,
      color: colors.textSecondary,
      borde: colors.border,
    },
    solido: {
      fondo: colors.primary,
      color: colors.textInverted,
      borde: colors.primary,
    },
    sobreImagen: {
      fondo: colors.surface,
      color: colors.text,
      borde: 'transparent',
    },
  }[variante];

  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={6}
      style={({ pressed }) => [
        styles.boton,
        {
          backgroundColor: config.fondo,
          borderColor: config.borde,
          opacity: deshabilitado ? 0.5 : 1,
        },
        variante === 'sobreImagen' && shadows.sm,
        pressed && styles.presionado,
        style,
      ]}
    >
      <Ionicons name={icono} size={size} color={config.color} />
      {Boolean(insignia) && (
        <View style={styles.insignia}>
          <Text style={styles.textoInsignia}>{insignia > 9 ? '9+' : insignia}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  presionado: {
    opacity: 0.7,
  },
  insignia: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: radius.full,
    backgroundColor: colors.occupied,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoInsignia: {
    color: colors.textInverted,
    fontSize: fontSize.xs - 2,
    fontWeight: fontWeight.bold,
  },
});
