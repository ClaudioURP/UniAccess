// src/app/reserva/[id].js
// Comprobante de la reserva: código QR de ingreso, detalle y cancelación
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';

import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../../theme';
import { useReservas } from '../../context/ReservasContext';
import { obtenerAmbiente, obtenerCategoria } from '../../data/ambientes';
import { REGLAMENTO_CESPAR } from '../../data/usuario';
import { formatearFechaLarga, rangoHorario } from '../../utils/fechas';
import { estadoEfectivo } from '../../utils/reservas';
import ContenedorPantalla from '../../components/ContenedorPantalla';
import EncabezadoPantalla from '../../components/EncabezadoPantalla';
import EncabezadoSeccion from '../../components/EncabezadoSeccion';
import InsigniaEstado from '../../components/InsigniaEstado';
import BotonPrincipal from '../../components/BotonPrincipal';
import Aviso from '../../components/Aviso';
import EstadoVacio from '../../components/EstadoVacio';
import ElementoInfo from '../../components/ElementoInfo';

export default function PantallaComprobante() {
  const { id } = useLocalSearchParams();
  const { obtenerReserva, cancelarReserva } = useReservas();

  const reserva = obtenerReserva(id);

  if (!reserva) {
    return (
      <ContenedorPantalla edges={['top']}>
        <EncabezadoPantalla titulo="Comprobante" mostrarVolver onVolver={() => router.back()} />
        <View style={styles.sinReserva}>
          <EstadoVacio
            icono="alert-circle-outline"
            titulo="Reserva no encontrada"
            texto="No pudimos ubicar esta reserva. Puede haber sido eliminada del dispositivo."
            accionTexto="Ver mis reservas"
            onAccion={() => router.replace('/reservas')}
          />
        </View>
      </ContenedorPantalla>
    );
  }

  const ambiente = obtenerAmbiente(reserva.ambienteId);
  const categoria = ambiente ? obtenerCategoria(ambiente.categoria) : null;
  const estado = estadoEfectivo(reserva);
  const activa = estado === 'confirmada' || estado === 'pendiente';

  const contenidoQR = [
    'URP-CESPAR',
    reserva.codigo,
    reserva.ambienteId,
    reserva.fecha,
    reserva.horas.join('|'),
  ].join(';');

  const confirmarCancelacion = () => {
    Alert.alert(
      'Cancelar reserva',
      `Se anulará el bloque ${rangoHorario(reserva.horas)} del ${formatearFechaLarga(reserva.fecha)}.`,
      [
        { text: 'Mantener', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: async () => {
            await cancelarReserva(reserva.id, 'Cancelada por el estudiante');
            Alert.alert('Reserva cancelada', 'El bloque quedó liberado para otros estudiantes.');
          },
        },
      ],
    );
  };

  return (
    <ContenedorPantalla edges={['top']}>
      <EncabezadoPantalla
        titulo="Comprobante de reserva"
        subtitulo={reserva.codigo}
        mostrarVolver
        onVolver={() => router.back()}
        acciones={<InsigniaEstado estado={estado} />}
      />

      {estado === 'pendiente' && (
        <Aviso
          tono="alerta"
          titulo="Pendiente de aprobación"
          texto="Un coordinador del CESPAR validará tu solicitud. Recibirás la confirmación en tu correo URP."
          style={styles.aviso}
        />
      )}
      {estado === 'cancelada' && (
        <Aviso
          tono="error"
          titulo="Reserva cancelada"
          texto={reserva.motivoCancelacion || 'Esta reserva ya no es válida para el ingreso.'}
          style={styles.aviso}
        />
      )}
      {estado === 'finalizada' && (
        <Aviso
          tono="info"
          titulo="Reserva cumplida"
          texto="Este bloque ya pasó. Puedes reservar un nuevo horario cuando quieras."
          style={styles.aviso}
        />
      )}
      {estado === 'confirmada' && (
        <Aviso
          tono="exito"
          titulo="Reserva confirmada"
          texto="Muestra este código QR en la entrada del ambiente junto a tu carnet universitario."
          style={styles.aviso}
        />
      )}

      <View style={[styles.tarjetaQR, shadows.md]}>
        {estado === 'cancelada' ? (
          <View style={styles.qrInactivo}>
            <Ionicons name="close-circle" size={64} color={colors.textMuted} />
            <Text style={styles.textoQRInactivo}>QR no válido</Text>
          </View>
        ) : (
          <>
            <QRCode
              value={contenidoQR}
              size={186}
              color={colors.text}
              backgroundColor={colors.surface}
            />
            <Text style={styles.codigo}>{reserva.codigo}</Text>
            <Text style={styles.ayudaQR}>Código de ingreso CESPAR</Text>
          </>
        )}
      </View>

      <View style={styles.seccion}>
        <EncabezadoSeccion titulo="Detalle de la reserva" />
        <View style={[styles.tarjetaDetalle, shadows.sm]}>
          <ElementoInfo
            icono={categoria ? categoria.icono : 'football-outline'}
            etiqueta="Ambiente"
            valor={ambiente ? ambiente.nombre : 'No disponible'}
          />
          <ElementoInfo
            icono="calendar-outline"
            etiqueta="Fecha"
            valor={formatearFechaLarga(reserva.fecha)}
            style={styles.itemDetalle}
          />
          <ElementoInfo
            icono="time-outline"
            etiqueta="Horario"
            valor={`${rangoHorario(reserva.horas)} · ${reserva.horas.length} h`}
            style={styles.itemDetalle}
          />
          <ElementoInfo
            icono="people-outline"
            etiqueta="Jugadores"
            valor={`${reserva.personas} personas`}
            style={styles.itemDetalle}
          />
          <ElementoInfo
            icono="location-outline"
            etiqueta="Ubicación"
            valor={ambiente ? ambiente.ubicacion : '-'}
            style={styles.itemDetalle}
          />
          <ElementoInfo
            icono="cash-outline"
            etiqueta="Total"
            valor={`S/ ${reserva.monto}`}
            style={styles.itemDetalle}
          />
          {Boolean(reserva.observaciones) && (
            <ElementoInfo
              icono="create-outline"
              etiqueta="Observaciones"
              valor={reserva.observaciones}
              style={styles.itemDetalle}
            />
          )}
        </View>
      </View>

      <View style={styles.seccion}>
        <EncabezadoSeccion titulo="Antes de tu ingreso" />
        <View style={styles.listaNormas}>
          {REGLAMENTO_CESPAR.slice(0, 3).map((norma) => (
            <View key={norma} style={styles.filaNorma}>
              <Ionicons name="ellipse" size={6} color={colors.primary} style={styles.vineta} />
              <Text style={styles.textoNorma}>{norma}</Text>
            </View>
          ))}
        </View>
      </View>

      {activa && (
        <BotonPrincipal
          texto="Cancelar esta reserva"
          icono="close-circle-outline"
          variante="borde"
          onPress={confirmarCancelacion}
          style={styles.accion}
        />
      )}

      <BotonPrincipal
        texto="Reservar otro horario"
        icono="add-circle-outline"
        variante="fantasma"
        onPress={() =>
          ambiente ? router.push(`/ambiente/${ambiente.id}`) : router.push('/explorar')
        }
        style={styles.accion}
      />

      <BotonPrincipal
        texto="Volver al inicio"
        icono="home-outline"
        onPress={() => router.replace('/inicio')}
        style={styles.accion}
      />
    </ContenedorPantalla>
  );
}

const styles = StyleSheet.create({
  sinReserva: {
    marginTop: spacing.xl,
  },
  aviso: {
    marginBottom: spacing.lg,
  },
  tarjetaQR: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  qrInactivo: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  textoQRInactivo: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  codigo: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    letterSpacing: 2,
    marginTop: spacing.lg,
  },
  ayudaQR: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  seccion: {
    marginBottom: spacing.xl,
  },
  tarjetaDetalle: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  itemDetalle: {
    marginTop: spacing.md,
  },
  listaNormas: {
    gap: spacing.sm,
  },
  filaNorma: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  vineta: {
    marginTop: 6,
  },
  textoNorma: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  accion: {
    marginBottom: spacing.md,
  },
});
