// src/components/ElementoInfo.js
// Componente de Contenedor/Dato: Dato etiquetado con icono (ficha del ambiente)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function ElementoInfo({
  icono,
  etiqueta,
  valor,
  direccion = 'fila', // 'fila' | 'columna'
  style,
}) {
  const esColumna = direccion === 'columna';

  return (
    <View style={[styles.contenedor, esColumna && styles.contenedorColumna, style]}>
      <View style={styles.iconoContenedor}>
        <Ionicons name={icono} size={16} color={colors.primary} />
      </View>
      <View style={esColumna ? styles.textosColumna : styles.textos}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>
        <Text style={styles.valor} numberOfLines={esColumna ? 2 : 1}>
          {valor}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  contenedorColumna: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing.xs,
    flex: 1,
  },
  iconoContenedor: {
    width: 30,
    height: 30,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: {
    flex: 1,
  },
  textosColumna: {
    width: '100%',
  },
  etiqueta: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  valor: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: fontWeight.semibold,
    marginTop: 1,
  },
});
