// App.js
// Catálogo navegable de componentes de UniAccess y pantalla borrador de uso real (LAB-02)
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';

import { colors, fontSize, fontWeight, spacing, radius, shadows } from './src/theme';
import { CATALOG } from './src/viewer/catalog';

// Componentes core propios con nombres en español (Requisito 6)
import CampoBusqueda from './src/components/CampoBusqueda';
import ChipCategoria from './src/components/ChipCategoria';
import TarjetaInstalacion from './src/components/TarjetaInstalacion';
import SelectorHorario from './src/components/SelectorHorario';
import BotonPrincipal from './src/components/BotonPrincipal';

export default function App() {
  const [pestanaActiva, setPestanaActiva] = useState('catalogo'); // 'catalogo' | 'pantalla-real'
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');
  const [idComponenteActivo, setIdComponenteActivo] = useState(CATALOG[0].id);

  // Estados para la pantalla de uso real (Reserva UniAccess)
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [categoriaInstalacion, setCategoriaInstalacion] = useState('canchas');
  const [horarioElegido, setHorarioElegido] = useState('16:00');
  const [reservaConfirmada, setReservaConfirmada] = useState(false);

  // Filtros del catálogo
  const categorias = ['Todas', 'Acción', 'Entrada', 'Contenedor / Dato'];
  const catalogoFiltrado = categoriaSeleccionada === 'Todas'
    ? CATALOG
    : CATALOG.filter((item) => item.category === categoriaSeleccionada);

  const componenteActivo = CATALOG.find((c) => c.id === idComponenteActivo) || CATALOG[0];

  const manejarConfirmarReserva = () => {
    setReservaConfirmada(true);
    Alert.alert(
      '¡Reserva Registrada!',
      `Has reservado la Cancha de Grass Sintético para las ${horarioElegido}. Se ha generado el código QR en el sistema.`,
      [{ text: 'Aceptar', onPress: () => {} }]
    );
  };

  return (
    <SafeAreaView style={styles.areaSegura}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Header Principal con Identidad UniAccess */}
      <View style={styles.encabezado}>
        <View>
          <Text style={styles.tituloApp}>UniAccess</Text>
          <Text style={styles.subtituloApp}>LAB-02: Librería de Componentes Core (React Native)</Text>
        </View>

        {/* Selector de Vista: Catálogo vs Pantalla Real */}
        <View style={styles.barraPestanas}>
          <Pressable
            onPress={() => setPestanaActiva('catalogo')}
            style={[styles.botonPestana, pestanaActiva === 'catalogo' && styles.botonPestanaActiva]}
          >
            <Text style={[styles.textoPestana, pestanaActiva === 'catalogo' && styles.textoPestanaActiva]}>
              Catálogo
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setPestanaActiva('pantalla-real')}
            style={[styles.botonPestana, pestanaActiva === 'pantalla-real' && styles.botonPestanaActiva]}
          >
            <Text style={[styles.textoPestana, pestanaActiva === 'pantalla-real' && styles.textoPestanaActiva]}>
              Pantalla Real
            </Text>
          </Pressable>
        </View>
      </View>

      {/* VISTA 1: CATÁLOGO NAVEGABLE (Requisito 5) */}
      {pestanaActiva === 'catalogo' && (
        <ScrollView style={styles.scrollContenedor} contentContainerStyle={styles.contenidoScroll}>
          {/* Filtros por Categoría */}
          <Text style={styles.tituloSeccion}>Filtrar por Tipo</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollFiltros}>
            <View style={styles.filaFiltros}>
              {categorias.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => setCategoriaSeleccionada(cat)}
                  style={[
                    styles.filtroCategoria,
                    categoriaSeleccionada === cat && styles.filtroCategoriaActivo,
                  ]}
                >
                  <Text
                    style={[
                      styles.textoFiltroCategoria,
                      categoriaSeleccionada === cat && styles.textoFiltroCategoriaActivo,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* Selector de Componentes en Lista Horizontal */}
          <Text style={styles.tituloSeccion}>Componentes ({catalogoFiltrado.length})</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollChips}>
            <View style={styles.filaFiltros}>
              {catalogoFiltrado.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => setIdComponenteActivo(item.id)}
                  style={[
                    styles.chipComponente,
                    idComponenteActivo === item.id && styles.chipComponenteActivo,
                  ]}
                >
                  <Text
                    style={[
                      styles.textoChipComponente,
                      idComponenteActivo === item.id && styles.textoChipComponenteActivo,
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* Tarjeta de Demostración del Componente Seleccionado */}
          <View style={[styles.tarjetaDemo, shadows.sm]}>
            <View style={styles.cabeceraTarjetaDemo}>
              <View>
                <Text style={styles.nombreComponente}>{componenteActivo.name}</Text>
                <View style={styles.insigniaCategoria}>
                  <Text style={styles.textoInsigniaCategoria}>{componenteActivo.category}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.descripcionComponente}>{componenteActivo.description}</Text>

            <View style={styles.divisor} />

            <Text style={styles.tituloDemo}>Demostración interactiva (eventos y estados):</Text>
            <View style={styles.cajaDemo}>
              <componenteActivo.Demo />
            </View>
          </View>
        </ScrollView>
      )}

      {/* VISTA 2: PANTALLA REAL DE RESERVAS UNIACCESS (Requisito 6) */}
      {pestanaActiva === 'pantalla-real' && (
        <ScrollView style={styles.scrollContenedor} contentContainerStyle={styles.contenidoScroll}>
          <View style={styles.cabeceraPreview}>
            <Text style={styles.tituloPreview}>Reserva de Espacios</Text>
            <Text style={styles.subtituloPreview}>
              Borrador funcional de UniAccess utilizando los componentes core reutilizables creados.
            </Text>
          </View>

          {/* 1. Componente CampoBusqueda */}
          <CampoBusqueda
            valor={textoBusqueda}
            onChangeText={setTextoBusqueda}
            placeholder="Buscar canchas de fútbol, básquet..."
            style={styles.busquedaReal}
          />

          {/* 2. Componente ChipCategoria */}
          <Text style={styles.subtituloSeccion}>Instalaciones disponibles</Text>
          <View style={styles.filaChipsCategoria}>
            <ChipCategoria
              etiqueta="Canchas de Grass"
              conteo={3}
              activo={categoriaInstalacion === 'canchas'}
              onPress={() => setCategoriaInstalacion('canchas')}
            />
            <ChipCategoria
              etiqueta="Gimnasio"
              conteo={1}
              activo={categoriaInstalacion === 'gimnasio'}
              onPress={() => setCategoriaInstalacion('gimnasio')}
            />
            <ChipCategoria
              etiqueta="Salas de Estudio"
              conteo={5}
              activo={categoriaInstalacion === 'salas'}
              onPress={() => setCategoriaInstalacion('salas')}
            />
          </View>

          {/* 3. Componente TarjetaInstalacion (usa Image, Text, InsigniaEstado, Pressable) */}
          <TarjetaInstalacion
            titulo="Cancha de Grass Sintético Nº 1"
            categoria="Espacio Deportivo Principal"
            ubicacion="Torre Central - Campus Universitario"
            capacidad="14 jugadores"
            urlImagen="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&auto=format&fit=crop&q=80"
            estado="disponible"
            onPress={() => {}}
          />

          {/* 4. Componente SelectorHorario (Entrada / Selector controlado) */}
          <View style={styles.seccionHorarios}>
            <Text style={styles.subtituloSeccion}>Horarios del día (Viernes):</Text>
            <SelectorHorario
              horarios={[
                { hora: '14:00', disponible: false },
                { hora: '15:00', disponible: true },
                { hora: '16:00', disponible: true },
                { hora: '17:00', disponible: false },
                { hora: '18:00', disponible: true },
              ]}
              horarioSeleccionado={horarioElegido}
              onChange={(hora) => setHorarioElegido(hora)}
            />
          </View>

          {/* 5. Componente BotonPrincipal (Acción de Confirmación) */}
          <View style={styles.seccionAccion}>
            <BotonPrincipal
              texto={`Solicitar Reserva para las ${horarioElegido}`}
              variante="primario"
              tamano="lg"
              onPress={manejarConfirmarReserva}
            />
            {reservaConfirmada && (
              <View style={styles.alertaConfirmacion}>
                <Text style={styles.textoAlertaConfirmacion}>
                  ✓ Reserva procesada con éxito. Código QR generado para ingreso a la cancha.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: colors.background,
  },
  encabezado: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tituloApp: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  subtituloApp: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  barraPestanas: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.md,
    padding: spacing.xs,
  },
  botonPestana: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  botonPestanaActiva: {
    backgroundColor: colors.surface,
    ...shadows.sm,
  },
  textoPestana: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  textoPestanaActiva: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
  scrollContenedor: {
    flex: 1,
  },
  contenidoScroll: {
    padding: spacing.lg,
  },
  tituloSeccion: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  scrollFiltros: {
    marginBottom: spacing.md,
  },
  scrollChips: {
    marginBottom: spacing.lg,
  },
  filaFiltros: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filtroCategoria: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  filtroCategoriaActivo: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  textoFiltroCategoria: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: fontWeight.medium,
  },
  textoFiltroCategoriaActivo: {
    color: colors.primaryDark,
    fontWeight: fontWeight.bold,
  },
  chipComponente: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipComponenteActivo: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  textoChipComponente: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: fontWeight.medium,
  },
  textoChipComponenteActivo: {
    color: colors.textInverted,
    fontWeight: fontWeight.bold,
  },
  tarjetaDemo: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cabeceraTarjetaDemo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  nombreComponente: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  insigniaCategoria: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
  textoInsigniaCategoria: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
  descripcionComponente: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 20,
  },
  divisor: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  tituloDemo: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  cajaDemo: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  cabeceraPreview: {
    marginBottom: spacing.md,
  },
  tituloPreview: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  subtituloPreview: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  busquedaReal: {
    marginBottom: spacing.md,
  },
  subtituloSeccion: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  filaChipsCategoria: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  seccionHorarios: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  seccionAccion: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  alertaConfirmacion: {
    backgroundColor: colors.availableBg,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.available,
  },
  textoAlertaConfirmacion: {
    color: colors.availableText,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
});
