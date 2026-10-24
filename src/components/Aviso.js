// src/components/Aviso.js
// Componente de Contenedor/Dato: Mensaje informativo o de advertencia
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

const TONOS = {
  info: {
    fondo: colors.pendingBg,
    borde: colors.pending,
    texto: colors.pendingText,
    icono: 'information-circle',
  },
  exito: {
    fondo: colors.availableBg,
    borde: colors.available,
    texto: colors.availableText,
    icono: 'checkmark-circle',
  },
  alerta: {
    fondo: colors.maintenanceBg,
    borde: colors.maintenance,
    texto: colors.maintenanceText,
    icono: 'alert-circle',
  },
  error: {
    fondo: colors.occupiedBg,
    borde: colors.occupied,
    texto: colors.occupiedText,
    icono: 'close-circle',
  },
};

export default function Aviso({ titulo, texto, tono = 'info', children, style }) {
  const config = TONOS[tono] || TONOS.info;

  return (
    <View style={[styles.contenedor, { backgroundColor: config.fondo, borderColor: config.borde }, style]}>
      <Ionicons name={config.icono} size={20} color={config.texto} style={styles.icono} />
      <View style={styles.textos}>
        {Boolean(titulo) && <Text style={[styles.titulo, { color: config.texto }]}>{titulo}</Text>}
        {Boolean(texto) && <Text style={[styles.texto, { color: config.texto }]}>{texto}</Text>}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  icono: {
    marginRight: spacing.sm,
    marginTop: 1,
  },
  textos: {
    flex: 1,
  },
  titulo: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    marginBottom: 2,
  },
  texto: {
    fontSize: fontSize.sm,
    lineHeight: 19,
  },
});
