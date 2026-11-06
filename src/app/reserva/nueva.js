// src/app/reserva/nueva.js
// Paso final del flujo: revisión de datos, aforo y confirmación de la reserva
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';

import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../../theme';
import { useSesion } from '../../context/SesionContext';
import { agregarReserva, selectEstadisticas } from '../../store/reservasSlice';
import { obtenerAmbiente, obtenerCategoria } from '../../data/ambientes';
import { formatearFechaLarga, rangoHorario, ordenarHoras } from '../../utils/fechas';
import { requiereAprobacion, MAX_RESERVAS_ACTIVAS } from '../../utils/reservas';
import ContenedorPantalla from '../../components/ContenedorPantalla';
import EncabezadoPantalla from '../../components/EncabezadoPantalla';
import EncabezadoSeccion from '../../components/EncabezadoSeccion';
import ImagenAmbiente from '../../components/ImagenAmbiente';
import ElementoInfo from '../../components/ElementoInfo';
import SelectorCantidad from '../../components/SelectorCantidad';
import CampoTexto from '../../components/CampoTexto';
import BotonPrincipal from '../../components/BotonPrincipal';
import Aviso from '../../components/Aviso';
import EstadoVacio from '../../components/EstadoVacio';

export default function PantallaNuevaReserva() {
  const { ambienteId, fecha, horas } = useLocalSearchParams();
  const dispatch = useDispatch();
  const estadisticas = useSelector(selectEstadisticas);
  const { usuario } = useSesion();

  const ambiente = obtenerAmbiente(ambienteId);
  const listaHoras = typeof horas === 'string' && horas.length ? ordenarHoras(horas.split(',')) : [];

  const [personas, setPersonas] = useState(ambiente ? Math.min(10, ambiente.capacidad) : 1);
  const [observaciones, setObservaciones] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (!ambiente || listaHoras.length === 0) {
    return (
      <ContenedorPantalla edges={['top']}>
        <EncabezadoPantalla
          titulo="Nueva reserva"
          mostrarVolver
          onVolver={() => router.back()}
        />
        <View style={styles.sinDatos}>
          <EstadoVacio
            icono="alert-circle-outline"
            titulo="Selección incompleta"
            texto="Necesitas elegir un ambiente y al menos un bloque horario para continuar."
            accionTexto="Elegir horario"
            onAccion={() => router.replace('/explorar')}
          />
        </View>
      </ContenedorPantalla>
    );
  }

  const categoria = obtenerCategoria(ambiente.categoria);
  const total = ambiente.tarifaPorHora * listaHoras.length;
  const limiteAlcanzado = estadisticas.activas >= MAX_RESERVAS_ACTIVAS;
  const esperaAprobacion = requiereAprobacion(ambiente);

  const confirmar = () => {
    setEnviando(true);
    const accion = agregarReserva({
      ambienteId: ambiente.id,
      fecha,
      horas: listaHoras,
      personas,
      observaciones,
      tarifaPorHora: ambiente.tarifaPorHora,
      requiereAprobacion: esperaAprobacion,
    });
    dispatch(accion);
    setEnviando(false);
    router.replace(`/reserva/${accion.payload.id}`);
  };

  return (
    <ContenedorPantalla edges={['top']}>
      <EncabezadoPantalla
        titulo="Confirmar reserva"
        subtitulo="Revisa los datos antes de solicitar tu bloque"
        mostrarVolver
        onVolver={() => router.back()}
      />

      <View style={styles.tarjetaAmbiente}>
        <ImagenAmbiente
          url={ambiente.imagen}
          icono={categoria.icono}
          altura={120}
          style={styles.imagenAmbiente}
        />
        <View style={styles.datosAmbiente}>
          <Text style={styles.nombreAmbiente}>{ambiente.nombre}</Text>
          <ElementoInfo icono="location-outline" etiqueta="Ubicación" valor={ambiente.ubicacion} />
        </View>
      </View>

      <View style={styles.seccion}>
        <EncabezadoSeccion titulo="Detalle del bloque" />
        <View style={[styles.tarjetaResumen, shadows.sm]}>
          <FilaResumen etiqueta="Fecha" valor={formatearFechaLarga(fecha)} />
          <FilaResumen etiqueta="Horario" valor={rangoHorario(listaHoras)} />
          <FilaResumen
            etiqueta="Duración"
            valor={`${listaHoras.length} ${listaHoras.length === 1 ? 'hora' : 'horas'}`}
          />
          <FilaResumen etiqueta="Tarifa por hora" valor={`S/ ${ambiente.tarifaPorHora}`} />
          <FilaResumen etiqueta="Total" valor={`S/ ${total}`} destacado conBorde={false} />
        </View>
      </View>

      {esperaAprobacion && (
        <Aviso
          tono="alerta"
          titulo="Sujeta a aprobación"
          texto="Un coordinador del CESPAR revisará tu solicitud antes de emitir el comprobante definitivo."
          style={styles.aviso}
        />
      )}

      {limiteAlcanzado && (
        <Aviso
          tono="error"
          titulo="Límite de reservas activas"
          texto={`Ya tienes ${estadisticas.activas} reservas activas. Cancela una para poder solicitar una nueva.`}
          style={styles.aviso}
        />
      )}

      <View style={styles.seccion}>
        <EncabezadoSeccion titulo="Datos del grupo" />
        <SelectorCantidad
          etiqueta="Número de jugadores"
          valor={personas}
          onChange={setPersonas}
          minimo={1}
          maximo={ambiente.capacidad}
          sufijo="personas"
        />

        <CampoTexto
          etiqueta="Observaciones para CESPAR (opcional)"
          valor={observaciones}
          onChangeText={setObservaciones}
          placeholder="Ej. Campeonato interno de Ingeniería, requerimos arcos adicionales."
          icono="create-outline"
          multiline
          maxLength={180}
          ayuda={`Solicitante: ${usuario?.nombre} · ${usuario?.codigo}`}
          style={styles.campoObservaciones}
        />
      </View>

      <BotonPrincipal
        texto={esperaAprobacion ? 'Enviar solicitud' : 'Confirmar reserva'}
        icono="checkmark-circle-outline"
        tamano="lg"
        cargando={enviando}
        deshabilitado={limiteAlcanzado}
        onPress={confirmar}
      />

      <Text style={styles.avisoCancelacion}>
        Puedes cancelar sin costo hasta 4 horas antes del inicio del bloque.
      </Text>
    </ContenedorPantalla>
  );
}

function FilaResumen({ etiqueta, valor, destacado = false, conBorde = true }) {
  return (
    <View style={[styles.filaResumen, conBorde && styles.filaResumenBorde]}>
      <Text style={styles.etiquetaResumen}>{etiqueta}</Text>
      <Text style={[styles.valorResumen, destacado && styles.valorResumenDestacado]}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sinDatos: {
    marginTop: spacing.xl,
  },
  tarjetaAmbiente: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  imagenAmbiente: {
    height: 120,
  },
  datosAmbiente: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  nombreAmbiente: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  seccion: {
    marginBottom: spacing.lg,
  },
  tarjetaResumen: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  filaResumen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  filaResumenBorde: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  etiquetaResumen: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  valorResumen: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  valorResumenDestacado: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.primaryDark,
  },
  aviso: {
    marginBottom: spacing.lg,
  },
  campoObservaciones: {
    marginTop: spacing.md,
  },
  avisoCancelacion: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
