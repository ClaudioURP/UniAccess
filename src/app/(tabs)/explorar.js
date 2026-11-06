// src/app/(tabs)/explorar.js
// Sección Explorar: buscador, filtros por deporte y listado de ambientes CESPAR
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';

import { colors, fontSize, fontWeight, spacing } from '../../theme';
import { selectReservas } from '../../store/reservasSlice';
import { estadoEfectivo } from '../../utils/reservas';
import {
  AMBIENTES,
  CATEGORIAS,
  obtenerCategoria,
  contarAmbientesPorCategoria,
  buscarAmbientes,
} from '../../data/ambientes';
import { estadoAmbiente, libresEnProximosDias } from '../../utils/disponibilidad';
import { hoyISO } from '../../utils/fechas';
import ContenedorPantalla from '../../components/ContenedorPantalla';
import EncabezadoPantalla from '../../components/EncabezadoPantalla';
import CampoBusqueda from '../../components/CampoBusqueda';
import ChipCategoria from '../../components/ChipCategoria';
import TarjetaInstalacion from '../../components/TarjetaInstalacion';
import EstadoVacio from '../../components/EstadoVacio';

// Ordena primero los ambientes con horarios libres y deja al final los que están en mantenimiento
const ORDEN_ESTADO = { disponible: 0, ocupado: 1, mantenimiento: 2 };

export default function PantallaExplorar() {
  const { categoria: categoriaParam } = useLocalSearchParams();
  const reservas = useSelector(selectReservas);

  const horasReservadasPorMi = (ambienteId, fecha) => {
    const conjunto = new Set();
    reservas
      .filter(
        (r) =>
          r.ambienteId === ambienteId &&
          r.fecha === fecha &&
          estadoEfectivo(r) !== 'cancelada',
      )
      .forEach((r) => r.horas.forEach((h) => conjunto.add(h)));
    return conjunto;
  };

  const [texto, setTexto] = useState('');
  const [categoria, setCategoria] = useState(categoriaParam || 'todos');
  const [soloDisponibles, setSoloDisponibles] = useState(false);

  // Permite llegar desde Inicio con una categoría preseleccionada
  useEffect(() => {
    if (categoriaParam) setCategoria(categoriaParam);
  }, [categoriaParam]);

  const conteos = contarAmbientesPorCategoria();

  const resultados = useMemo(() => {
    const base = buscarAmbientes(texto, categoria);
    return base
      .filter((ambiente) => !soloDisponibles || estadoAmbiente(ambiente) === 'disponible')
      .sort((a, b) => ORDEN_ESTADO[estadoAmbiente(a)] - ORDEN_ESTADO[estadoAmbiente(b)]);
  }, [texto, categoria, soloDisponibles]);

  const limpiarFiltros = () => {
    setTexto('');
    setCategoria('todos');
    setSoloDisponibles(false);
  };

  return (
    <ContenedorPantalla edges={['top']}>
      <EncabezadoPantalla
        titulo="Explorar ambientes"
        subtitulo={`${AMBIENTES.length} ambientes CESPAR disponibles para reservar`}
      />

      <View style={styles.filtros}>
        <CampoBusqueda
          valor={texto}
          onChangeText={setTexto}
          placeholder="Buscar por nombre, deporte o zona"
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filaChips}
        >
          {CATEGORIAS.map((item) => (
            <ChipCategoria
              key={item.id}
              etiqueta={item.etiqueta}
              conteo={conteos[item.id]}
              activo={categoria === item.id}
              onPress={() => setCategoria(item.id)}
            />
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filaChips}
        >
          <ChipCategoria
            etiqueta="Solo con horarios libres"
            activo={soloDisponibles}
            onPress={() => setSoloDisponibles((valor) => !valor)}
          />
        </ScrollView>
      </View>

      <View style={styles.resumen}>
        <Text style={styles.textoResumen}>
          {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
        </Text>
        {(texto || categoria !== 'todos' || soloDisponibles) && (
          <Text style={styles.limpiar} onPress={limpiarFiltros}>
            Limpiar filtros
          </Text>
        )}
      </View>

      {resultados.length === 0 ? (
        <EstadoVacio
          icono="search-outline"
          titulo="Sin resultados"
          texto="No encontramos ambientes con esos criterios. Prueba con otro deporte o limpia los filtros."
          accionTexto="Limpiar filtros"
          onAccion={limpiarFiltros}
        />
      ) : (
        resultados.map((ambiente) => {
          const libres = libresEnProximosDias(ambiente.id, 3);
          const misBloquesHoy = horasReservadasPorMi(ambiente.id, hoyISO());
          return (
            <TarjetaInstalacion
              key={ambiente.id}
              titulo={ambiente.nombre}
              categoria={obtenerCategoria(ambiente.categoria).etiqueta}
              ubicacion={ambiente.ubicacion}
              capacidad={`${ambiente.capacidad} personas`}
              urlImagen={ambiente.imagen}
              icono={obtenerCategoria(ambiente.categoria).icono}
              deporte={ambiente.deporte}
              estado={estadoAmbiente(ambiente)}
              precio={`S/ ${ambiente.tarifaPorHora}`}
              nota={misBloquesHoy.size > 0 ? 'Ya reservaste hoy' : `${libres} horarios libres`}
              onPress={() => router.push(`/ambiente/${ambiente.id}`)}
            />
          );
        })
      )}
    </ContenedorPantalla>
  );
}

const styles = StyleSheet.create({
  filtros: {
    marginBottom: spacing.md,
  },
  filaChips: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  resumen: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  textoResumen: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  limpiar: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
});
