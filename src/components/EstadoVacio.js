// src/components/EstadoVacio.js
// Componente de Contenedor/Dato: Mensaje para listas sin resultados o sin datos
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';
import BotonPrincipal from './BotonPrincipal';

export default function EstadoVacio({
  icono = 'search-outline',
  titulo,
  texto,
  accionTexto,
  onAccion,
  style,
}) {
  return (
    <View style={[styles.contenedor, style]}>
      <View style={styles.circulo}>
        <Ionicons name={icono} size={30} color={colors.primary} />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      {Boolean(texto) && <Text style={styles.texto}>{texto}</Text>}
      {Boolean(accionTexto) && (
        <BotonPrincipal
          texto={accionTexto}
          onPress={onAccion}
          variante="borde"
          tamano="sm"
          style={styles.accion}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  circulo: {
    width: 62,
    height: 62,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  titulo: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
    textAlign: 'center',
  },
  texto: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  accion: {
    marginTop: spacing.lg,
  },
});
