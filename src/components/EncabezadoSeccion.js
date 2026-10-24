// src/components/EncabezadoSeccion.js
// Componente de Contenedor: Título de sección con acción opcional ("Ver todo")
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, spacing } from '../theme';

export default function EncabezadoSeccion({ titulo, subtitulo, accionTexto, onAccion, style }) {
  return (
    <View style={[styles.contenedor, style]}>
      <View style={styles.textos}>
        <Text style={styles.titulo}>{titulo}</Text>
        {Boolean(subtitulo) && <Text style={styles.subtitulo}>{subtitulo}</Text>}
      </View>

      {Boolean(accionTexto) && (
        <Pressable
          onPress={onAccion}
          accessibilityRole="button"
          hitSlop={8}
          style={({ pressed }) => [styles.accion, pressed && styles.accionPresionada]}
        >
          <Text style={styles.textoAccion}>{accionTexto}</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subtitulo: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  accion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  accionPresionada: {
    opacity: 0.6,
  },
  textoAccion: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
});
