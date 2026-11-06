// src/app/(tabs)/reservas.js
// Sección Mis reservas: control de reservas activas, historial y cancelaciones
import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

import { colors, fontSize, fontWeight, spacing } from '../../theme';
import {
  selectReservas,
  selectEstadisticas,
  cancelarReserva,
} from '../../store/reservasSlice';
import { obtenerAmbiente } from '../../data/ambientes';
import { horaAMinutos } from '../../utils/fechas';
import { estadoEfectivo, estaActiva } from '../../utils/reservas';
import ContenedorPantalla from '../../components/ContenedorPantalla';
import EncabezadoPantalla from '../../components/EncabezadoPantalla';
import ChipCategoria from '../../components/ChipCategoria';
import TarjetaReserva from '../../components/TarjetaReserva';
import EstadoVacio from '../../components/EstadoVacio';

const FILTROS = [
  { id: 'proximas', etiqueta: 'Próximas' },
  { id: 'historial', etiqueta: 'Historial' },
  { id: 'canceladas', etiqueta: 'Canceladas' },
];

const ORDEN_DESC = (a, b) => (a.fecha === b.fecha ? horaAMinutos(b.horas[0]) - horaAMinutos(a.horas[0]) : a.fecha < b.fecha ? 1 : -1);
const ORDEN_ASC = (a, b) => (a.fecha === b.fecha ? horaAMinutos(a.horas[0]) - horaAMinutos(b.horas[0]) : a.fecha < b.fecha ? -1 : 1);

export default function PantallaReservas() {
  const dispatch = useDispatch();
  const reservas = useSelector(selectReservas);
  const estadisticas = useSelector(selectEstadisticas);
  const [filtro, setFiltro] = useState('proximas');

  const grupos = useMemo(
    () => ({
      proximas: reservas.filter(estaActiva).sort(ORDEN_ASC),
      historial: reservas.filter((reserva) => estadoEfectivo(reserva) === 'finalizada').sort(ORDEN_DESC),
      canceladas: reservas.filter((reserva) => estadoEfectivo(reserva) === 'cancelada').sort(ORDEN_DESC),
    }),
    [reservas],
  );

  const visibles = grupos[filtro];

  const confirmarCancelacion = (reserva) => {
    const ambiente = obtenerAmbiente(reserva.ambienteId);
    Alert.alert(
      'Cancelar reserva',
      `¿Seguro que deseas cancelar tu reserva en ${ambiente ? ambiente.nombre : 'este ambiente'}? El bloque quedará libre para otros estudiantes.`,
      [
        { text: 'Mantener reserva', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: () => {
            dispatch(cancelarReserva({ id: reserva.id, motivo: 'Cancelada por el estudiante' }));
            Alert.alert('Reserva cancelada', 'Tu reserva fue anulada correctamente.');
          },
        },
      ],
    );
  };

  return (
    <ContenedorPantalla edges={['top']}>
      <EncabezadoPantalla
        titulo="Mis reservas"
        subtitulo={`${estadisticas.activas} activas · ${estadisticas.horasReservadas} horas reservadas`}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filaFiltros}
      >
        {FILTROS.map((item) => (
          <ChipCategoria
            key={item.id}
            etiqueta={item.etiqueta}
            conteo={grupos[item.id].length}
            activo={filtro === item.id}
            onPress={() => setFiltro(item.id)}
          />
        ))}
      </ScrollView>

      {visibles.length === 0 ? (
        <EstadoVacio
          icono={filtro === 'canceladas' ? 'close-circle-outline' : 'calendar-outline'}
          titulo={
            filtro === 'proximas'
              ? 'No tienes reservas activas'
              : filtro === 'historial'
                ? 'Aún no hay reservas cumplidas'
                : 'No registras cancelaciones'
          }
          texto={
            filtro === 'proximas'
              ? 'Explora los ambientes del CESPAR y reserva tu primer horario.'
              : 'Cuando se completen tus reservas aparecerán en esta pestaña.'
          }
          accionTexto={filtro === 'proximas' ? 'Explorar ambientes' : undefined}
          onAccion={() => router.push('/explorar')}
        />
      ) : (
        visibles.map((reserva) => (
          <TarjetaReserva
            key={reserva.id}
            reserva={reserva}
            ambiente={obtenerAmbiente(reserva.ambienteId)}
            onVerComprobante={() => router.push(`/reserva/${reserva.id}`)}
            onCancelar={() => confirmarCancelacion(reserva)}
          />
        ))
      )}

      {Boolean(visibles.length) && (
        <Text style={styles.pie}>
          Recuerda presentar tu carnet URP o el QR de la reserva al ingresar al ambiente.
        </Text>
      )}
    </ContenedorPantalla>
  );
}

const styles = StyleSheet.create({
  filaFiltros: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  pie: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 17,
  },
});
