// src/components/TarjetaInstalacion.js
// Componente de Contenedor/Dato: Tarjeta de instalación o espacio deportivo
import React from 'react';
import { Pressable, View, Text, Image, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../theme';
import InsigniaEstado from './InsigniaEstado';

export default function TarjetaInstalacion({
  titulo,
  categoria,
  ubicacion,
  capacidad,
  urlImagen,
  estado = 'disponible',
  onPress,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.tarjeta,
        shadows.sm,
        pressed && styles.presionado,
        style,
      ]}
    >
      <View style={styles.contenedorImagen}>
        <Image
          source={{ uri: urlImagen }}
          style={styles.imagen}
          resizeMode="cover"
        />
        <View style={styles.posicionInsignia}>
          <InsigniaEstado estado={estado} />
        </View>
      </View>

      <View style={styles.contenido}>
        <Text style={styles.categoria}>{categoria}</Text>
        <Text style={styles.titulo} numberOfLines={1}>
          {titulo}
        </Text>

        <View style={styles.filaInfo}>
          <Text style={styles.textoInfo}>📍 {ubicacion}</Text>
          <Text style={styles.textoInfo}>👥 {capacidad}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  presionado: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  contenedorImagen: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surfaceSubtle,
    position: 'relative',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  posicionInsignia: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  contenido: {
    padding: spacing.md,
  },
  categoria: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  titulo: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs + 2,
  },
  filaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  textoInfo: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
});
