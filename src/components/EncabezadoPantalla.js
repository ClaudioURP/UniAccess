// src/components/EncabezadoPantalla.js
// Componente de Contenedor: Encabezado estándar de las secciones de la app
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, spacing } from '../theme';
import BotonIcono from './BotonIcono';

export default function EncabezadoPantalla({
  titulo,
  subtitulo,
  mostrarVolver = false,
  onVolver,
  acciones,
  children,
  style,
}) {
  return (
    <View style={[styles.encabezado, style]}>
      <View style={styles.fila}>
        {mostrarVolver && (
          <BotonIcono
            icono="arrow-back"
            onPress={onVolver}
            accessibilityLabel="Volver"
            style={styles.volver}
          />
        )}
        <View style={styles.textos}>
          <Text style={styles.titulo} numberOfLines={1}>
            {titulo}
          </Text>
          {Boolean(subtitulo) && <Text style={styles.subtitulo}>{subtitulo}</Text>}
        </View>
        {Boolean(acciones) && <View style={styles.acciones}>{acciones}</View>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  volver: {
    marginRight: spacing.md,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subtitulo: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: spacing.sm,
  },
});
