// src/components/TarjetaReserva.js
// Componente de Contenedor/Dato: Reserva del estudiante con su estado y acciones
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../theme';
import InsigniaEstado from './InsigniaEstado';
import BotonPrincipal from './BotonPrincipal';
import { formatearFechaCorta, rangoHorario, duracionEnHoras } from '../utils/fechas';
import { estadoEfectivo } from '../utils/reservas';

export default function TarjetaReserva({
  reserva,
  ambiente,
  onVerComprobante,
  onCancelar,
  estilo,
}) {
  const estado = estadoEfectivo(reserva);
  const puedeCancelar = estado === 'confirmada' || estado === 'pendiente';

  return (
    <View style={[styles.tarjeta, shadows.sm, estilo]}>
      <View style={styles.cabecera}>
        <View style={styles.textosCabecera}>
          <Text style={styles.codigo}>{reserva.codigo}</Text>
          <Text style={styles.nombre} numberOfLines={1}>
            {ambiente ? ambiente.nombre : 'Ambiente no disponible'}
          </Text>
        </View>
        <InsigniaEstado estado={estado} />
      </View>

      <View style={styles.detalles}>
        <View style={styles.dato}>
          <Ionicons name="calendar-outline" size={15} color={colors.primary} />
          <Text style={styles.textoDato}>{formatearFechaCorta(reserva.fecha)}</Text>
        </View>
        <View style={styles.dato}>
          <Ionicons name="time-outline" size={15} color={colors.primary} />
          <Text style={styles.textoDato}>{rangoHorario(reserva.horas)}</Text>
        </View>
      </View>

      <View style={styles.detalles}>
        <View style={styles.dato}>
          <Ionicons name="location-outline" size={15} color={colors.primary} />
          <Text style={styles.textoDato} numberOfLines={1}>
            {ambiente ? ambiente.ubicacion : '-'}
          </Text>
        </View>
      </View>

      <View style={styles.pie}>
        <View>
          <Text style={styles.monto}>S/ {reserva.monto}</Text>
          <Text style={styles.horas}>
            {duracionEnHoras(reserva.horas)} h · {reserva.personas} personas
          </Text>
        </View>

        <View style={styles.acciones}>
          {puedeCancelar && (
            <BotonPrincipal
              texto="Cancelar"
              variante="borde"
              tamano="sm"
              onPress={onCancelar}
            />
          )}
          <BotonPrincipal
            texto="Comprobante"
            variante="fantasma"
            tamano="sm"
            icono="qr-code-outline"
            onPress={onVerComprobante}
          />
        </View>
      </View>

      {estado === 'cancelada' && Boolean(reserva.motivoCancelacion) && (
        <Text style={styles.motivo}>Motivo: {reserva.motivoCancelacion}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  textosCabecera: {
    flex: 1,
  },
  codigo: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  nombre: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  detalles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  dato: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
  },
  textoDato: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  pie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    gap: spacing.sm,
  },
  monto: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  horas: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  acciones: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  motivo: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.sm,
    fontStyle: 'italic',
  },
});
