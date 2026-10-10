// src/components/InsigniaEstado.js
// Componente de Contenedor/Dato: Indicador visual de estado de servicio o reserva
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

const CONFIGURACION_ESTADOS = {
  disponible: {
    etiqueta: 'Disponible',
    fondo: colors.availableBg,
    texto: colors.availableText,
    punto: colors.available,
  },
  ocupado: {
    etiqueta: 'Ocupado',
    fondo: colors.occupiedBg,
    texto: colors.occupiedText,
    punto: colors.occupied,
  },
  mantenimiento: {
    etiqueta: 'Mantenimiento',
    fondo: colors.maintenanceBg,
    texto: colors.maintenanceText,
    punto: colors.maintenance,
  },
  pendiente: {
    etiqueta: 'Pendiente',
    fondo: colors.pendingBg,
    texto: colors.pendingText,
    punto: colors.pending,
  },
};

export default function InsigniaEstado({
  estado = 'disponible', // 'disponible' | 'ocupado' | 'mantenimiento' | 'pendiente'
  etiqueta,
  style,
}) {
  const config = CONFIGURACION_ESTADOS[estado] || CONFIGURACION_ESTADOS.disponible;
  const textoAMostrar = etiqueta || config.etiqueta;

  return (
    <View style={[styles.insignia, { backgroundColor: config.fondo }, style]}>
      <View style={[styles.punto, { backgroundColor: config.punto }]} />
      <Text style={[styles.texto, { color: config.texto }]}>
        {textoAMostrar}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  insignia: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    borderRadius: radius.full,
    alignSelf: 'flex-start',
  },
  punto: {
    width: 6,
    height: 6,
    borderRadius: radius.full,
    marginRight: spacing.xs + 2,
  },
  texto: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
});
