// src/app/(tabs)/inicio.js
// Sección Inicio: saludo, próxima reserva, accesos por deporte y ambientes destacados
import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../../theme';
import { useSesion } from '../../context/SesionContext';
import { selectProximaReserva, selectEstadisticas } from '../../store/reservasSlice';
import { AMBIENTES, CATEGORIAS, obtenerAmbiente, contarAmbientesPorCategoria } from '../../data/ambientes';
import { HORARIO_ATENCION_CESPAR } from '../../data/usuario';
import { estadoAmbiente } from '../../utils/disponibilidad';
import { formatearFechaCorta, rangoHorario } from '../../utils/fechas';
import { estadoEfectivo } from '../../utils/reservas';
import ContenedorPantalla from '../../components/ContenedorPantalla';
import EncabezadoSeccion from '../../components/EncabezadoSeccion';
import TarjetaDestacada from '../../components/TarjetaDestacada';
import BotonPrincipal from '../../components/BotonPrincipal';
import BotonIcono from '../../components/BotonIcono';
import Aviso from '../../components/Aviso';
import InsigniaEstado from '../../components/InsigniaEstado';

const PASOS = [
  {
    icono: 'search-outline',
    titulo: 'Elige tu ambiente',
    texto: 'Canchas de grass, losa, básquet o vóley del CESPAR.',
  },
  {
    icono: 'time-outline',
    titulo: 'Selecciona el horario',
    texto: 'Marca uno o más bloques de una hora según disponibilidad.',
  },
  {
    icono: 'qr-code-outline',
    titulo: 'Presenta tu QR',
    texto: 'Muéstralo en la entrada del ambiente junto a tu carnet URP.',
  },
];

export default function PantallaInicio() {
  const { usuario } = useSesion();
  const proximaReserva = useSelector(selectProximaReserva);
  const estadisticas = useSelector(selectEstadisticas);

  const conteos = contarAmbientesPorCategoria();
  const categoriasVisibles = CATEGORIAS.filter((categoria) => categoria.id !== 'todos');
  const destacados = AMBIENTES.filter((ambiente) => ambiente.destacado);
  const primerNombre = usuario ? usuario.nombre.split(' ')[0] : 'estudiante';
  const ambienteProximo = proximaReserva ? obtenerAmbiente(proximaReserva.ambienteId) : null;

  const abrirNotificaciones = () => {
    Alert.alert(
      'Notificaciones',
      estadisticas.activas > 0
        ? `Tienes ${estadisticas.activas} reserva(s) activa(s). Te recordaremos 1 hora antes del inicio.`
        : 'No tienes avisos pendientes. Tus confirmaciones aparecerán aquí.',
    );
  };

  return (
    <ContenedorPantalla edges={['top']} contentContainerStyle={styles.contenido}>
      <View style={styles.encabezado}>
        <View style={styles.filaEncabezado}>
          <View style={styles.textosEncabezado}>
            <Text style={styles.saludo}>Hola, {primerNombre}</Text>
            <Text style={styles.subSaludo} numberOfLines={1}>
              {usuario?.escuela} · {usuario?.ciclo}
            </Text>
          </View>

          <View style={styles.accionesEncabezado}>
            <BotonIcono
              icono="notifications-outline"
              onPress={abrirNotificaciones}
              insignia={estadisticas.activas}
              accessibilityLabel="Notificaciones"
            />
            <View style={styles.avatar}>
              <Text style={styles.textoAvatar}>{usuario?.iniciales}</Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/explorar')}
          accessibilityRole="search"
          style={({ pressed }) => [styles.buscador, pressed && styles.buscadorPresionado]}
        >
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <Text style={styles.textoBuscador}>Buscar cancha, losa, básquet, vóley...</Text>
        </Pressable>
      </View>

      <View style={styles.cuerpo}>
        {ambienteProximo ? (
          <View style={styles.tarjetaProxima}>
            <View style={styles.cabeceraProxima}>
              <View style={styles.etiquetaProxima}>
                <Ionicons name="alarm-outline" size={13} color={colors.primaryDark} />
                <Text style={styles.textoEtiquetaProxima}>Tu próxima reserva</Text>
              </View>
              <InsigniaEstado estado={estadoEfectivo(proximaReserva)} />
            </View>

            <Text style={styles.nombreProxima}>{ambienteProximo.nombre}</Text>
            <Text style={styles.detalleProxima}>
              {formatearFechaCorta(proximaReserva.fecha)} · {rangoHorario(proximaReserva.horas)}
            </Text>
            <Text style={styles.codigoProxima}>Código {proximaReserva.codigo}</Text>

            <BotonPrincipal
              texto="Ver comprobante QR"
              icono="qr-code-outline"
              variante="borde"
              tamano="sm"
              onPress={() => router.push(`/reserva/${proximaReserva.id}`)}
              style={styles.botonProxima}
            />
          </View>
        ) : (
          <View style={styles.bloqueVacio}>
            <Aviso
              tono="info"
              titulo="Aún no tienes reservas activas"
              texto="Reserva tu primera cancha en menos de un minuto y presenta el QR al ingresar."
            />
            <BotonPrincipal
              texto="Reservar ahora"
              icono="add-circle-outline"
              onPress={() => router.push('/explorar')}
              style={styles.botonVacio}
            />
          </View>
        )}

        <View style={styles.seccion}>
          <EncabezadoSeccion
            titulo="Explora por deporte"
            subtitulo="Ambientes administrados por el CESPAR"
          />
          <View style={styles.cuadriculaCategorias}>
            {categoriasVisibles.map((categoria) => (
              <Pressable
                key={categoria.id}
                onPress={() => router.push(`/explorar?categoria=${categoria.id}`)}
                accessibilityRole="button"
                style={({ pressed }) => [styles.tileCategoria, shadows.sm, pressed && styles.tilePresionado]}
              >
                <View style={styles.iconoTile}>
                  <Ionicons name={categoria.icono} size={20} color={colors.primary} />
                </View>
                <Text style={styles.nombreTile} numberOfLines={1}>
                  {categoria.etiqueta}
                </Text>
                <Text style={styles.conteoTile}>
                  {conteos[categoria.id]} {conteos[categoria.id] === 1 ? 'ambiente' : 'ambientes'}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.seccion}>
          <EncabezadoSeccion
            titulo="Ambientes destacados"
            accionTexto="Ver todos"
            onAccion={() => router.push('/explorar')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carrusel}
          >
            {destacados.map((ambiente) => (
              <TarjetaDestacada
                key={ambiente.id}
                titulo={ambiente.nombre}
                categoria={ambiente.deporte}
                ubicacion={ambiente.ubicacion}
                urlImagen={ambiente.imagen}
                estado={estadoAmbiente(ambiente)}
                precio={`S/ ${ambiente.tarifaPorHora}`}
                onPress={() => router.push(`/ambiente/${ambiente.id}`)}
                style={styles.tarjetaCarrusel}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.seccion}>
          <EncabezadoSeccion titulo="¿Cómo funciona?" />
          {PASOS.map((paso, indice) => (
            <View key={paso.titulo} style={styles.filaPaso}>
              <View style={styles.numeroPaso}>
                <Ionicons name={paso.icono} size={17} color={colors.primary} />
              </View>
              <View style={styles.textosPaso}>
                <Text style={styles.tituloPaso}>
                  {indice + 1}. {paso.titulo}
                </Text>
                <Text style={styles.textoPaso}>{paso.texto}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.seccion}>
          <EncabezadoSeccion titulo="Horario de atención CESPAR" />
          <View style={[styles.tarjetaHorario, shadows.sm]}>
            {HORARIO_ATENCION_CESPAR.map((fila, indice) => (
              <View
                key={fila.dia}
                style={[styles.filaHorario, indice > 0 && styles.filaHorarioBorde]}
              >
                <Text style={styles.diaHorario}>{fila.dia}</Text>
                <Text style={styles.horaHorario}>{fila.horario}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ContenedorPantalla>
  );
}

const styles = StyleSheet.create({
  contenido: {
    padding: 0,
    paddingBottom: spacing.xxl,
  },
  encabezado: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filaEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  textosEncabezado: {
    flex: 1,
  },
  saludo: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subSaludo: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  accionesEncabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginLeft: spacing.sm,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoAvatar: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.primaryDark,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    height: 46,
  },
  buscadorPresionado: {
    backgroundColor: colors.primaryLight,
  },
  textoBuscador: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  cuerpo: {
    padding: spacing.lg,
  },
  tarjetaProxima: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderColor: colors.primary,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.sm,
  },
  cabeceraProxima: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  etiquetaProxima: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  textoEtiquetaProxima: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.primaryDark,
  },
  nombreProxima: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  detalleProxima: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontWeight: fontWeight.medium,
  },
  codigoProxima: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  botonProxima: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
  bloqueVacio: {
    marginBottom: spacing.xl,
  },
  botonVacio: {
    marginTop: spacing.md,
  },
  seccion: {
    marginBottom: spacing.xl,
  },
  cuadriculaCategorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tileCategoria: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  tilePresionado: {
    backgroundColor: colors.surfaceHighlight,
  },
  iconoTile: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceHighlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  nombreTile: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  conteoTile: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  carrusel: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  tarjetaCarrusel: {
    marginBottom: 0,
  },
  filaPaso: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  numeroPaso: {
    width: 34,
    height: 34,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textosPaso: {
    flex: 1,
  },
  tituloPaso: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  textoPaso: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 19,
  },
  tarjetaHorario: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  filaHorario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  filaHorarioBorde: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  diaHorario: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  horaHorario: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
});
