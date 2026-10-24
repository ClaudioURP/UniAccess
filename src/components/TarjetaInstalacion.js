// src/components/TarjetaInstalacion.js
// Componente de Contenedor/Dato: Tarjeta de un ambiente deportivo de CESPAR URP
import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../theme';
import InsigniaEstado from './InsigniaEstado';
import ImagenAmbiente from './ImagenAmbiente';

export default function TarjetaInstalacion({
  titulo,
  categoria,
  ubicacion,
  capacidad,
  urlImagen,
  icono = 'football-outline',
  estado = 'disponible',
  deporte,
  precio,
  nota,
  onPress,
  style,
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.tarjeta, shadows.sm, pressed && styles.presionado, style]}
    >
      <ImagenAmbiente url={urlImagen} icono={icono} altura={148}>
        <View style={styles.posicionInsignia}>
          <InsigniaEstado estado={estado} />
        </View>
        {Boolean(deporte) && (
          <View style={styles.posicionDeporte}>
            <Text style={styles.textoDeporte}>{deporte}</Text>
          </View>
        )}
      </ImagenAmbiente>

      <View style={styles.contenido}>
        <Text style={styles.categoria}>{categoria}</Text>
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
        </Text>

        <View style={styles.filaInfo}>
          <View style={styles.dato}>
            <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.textoInfo} numberOfLines={1}>
              {ubicacion}
            </Text>
          </View>
          <View style={styles.dato}>
            <Ionicons name="people-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.textoInfo}>{capacidad}</Text>
          </View>
        </View>

        {(Boolean(precio) || Boolean(nota)) && (
          <View style={styles.pie}>
            {Boolean(precio) && (
              <Text style={styles.precio}>
                {precio}
                <Text style={styles.precioSufijo}> / hora</Text>
              </Text>
            )}
            {Boolean(nota) && (
              <Text style={styles.nota} numberOfLines={1}>
                {nota}
              </Text>
            )}
          </View>
        )}
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
    opacity: 0.94,
    transform: [{ scale: 0.995 }],
  },
  posicionInsignia: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
  posicionDeporte: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.overlay,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  textoDeporte: {
    color: colors.textInverted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
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
    marginBottom: spacing.sm,
  },
  filaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dato: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  textoInfo: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  pie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  precio: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primaryDark,
  },
  precioSufijo: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
  },
  nota: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    flexShrink: 1,
    textAlign: 'right',
  },
});
