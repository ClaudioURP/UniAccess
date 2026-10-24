// src/components/TarjetaDestacada.js
// Componente de Contenedor/Dato: Tarjeta compacta horizontal para el carrusel de Inicio
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../theme';
import InsigniaEstado from './InsigniaEstado';
import ImagenAmbiente from './ImagenAmbiente';

export default function TarjetaDestacada({
  titulo,
  categoria,
  ubicacion,
  urlImagen,
  icono = 'football-outline',
  estado = 'disponible',
  precio,
  onPress,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tarjeta, shadows.sm, pressed && styles.presionado, style]}
    >
      <ImagenAmbiente url={urlImagen} icono={icono} altura={104}>
        <View style={styles.posicionInsignia}>
          <InsigniaEstado estado={estado} />
        </View>
      </ImagenAmbiente>

      <View style={styles.contenido}>
        <Text style={styles.categoria} numberOfLines={1}>
          {categoria}
        </Text>
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
        </Text>

        <View style={styles.dato}>
          <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
          <Text style={styles.ubicacion} numberOfLines={1}>
            {ubicacion}
          </Text>
        </View>

        {Boolean(precio) && (
          <Text style={styles.precio}>
            {precio}
            <Text style={styles.precioSufijo}> / hora</Text>
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    width: 216,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  presionado: {
    opacity: 0.94,
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
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  titulo: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
    minHeight: 40,
  },
  dato: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  ubicacion: {
    flex: 1,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
  precio: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.primaryDark,
    marginTop: spacing.sm,
  },
  precioSufijo: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
  },
});
