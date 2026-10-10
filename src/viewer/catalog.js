// src/viewer/catalog.js
// Catálogo interactivo de componentes core de UniAccess (en español)
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, spacing, radius } from '../theme';

import BotonPrincipal from '../components/BotonPrincipal';
import ChipCategoria from '../components/ChipCategoria';
import CampoBusqueda from '../components/CampoBusqueda';
import SelectorHorario from '../components/SelectorHorario';
import InsigniaEstado from '../components/InsigniaEstado';
import TarjetaInstalacion from '../components/TarjetaInstalacion';

// 1. Demostración para BotonPrincipal
function DemostradorBotonPrincipal() {
  const [conteoClics, setConteoClics] = useState(0);

  return (
    <View style={estilosDemo.contenedor}>
      <Text style={estilosDemo.subtitulo}>
        Eventos onPress recibidos: <Text style={estilosDemo.resaltado}>{conteoClics}</Text>
      </Text>

      <View style={estilosDemo.fila}>
        <BotonPrincipal
          texto="Reservar Espacio (Primario)"
          variante="primario"
          onPress={() => setConteoClics((prev) => prev + 1)}
          style={estilosDemo.elementoBoton}
        />
      </View>

      <View style={estilosDemo.fila}>
        <BotonPrincipal
          texto="Ver Detalles (Borde)"
          variante="borde"
          onPress={() => setConteoClics((prev) => prev + 1)}
          style={estilosDemo.elementoBoton}
        />
      </View>

      <View style={estilosDemo.fila}>
        <BotonPrincipal
          texto="Cancelar Reserva"
          variante="peligro"
          tamano="sm"
          onPress={() => setConteoClics((prev) => prev + 1)}
          style={estilosDemo.elementoBoton}
        />
        <BotonPrincipal
          texto="Bloqueado"
          deshabilitado={true}
          tamano="sm"
          onPress={() => {}}
          style={estilosDemo.elementoBoton}
        />
      </View>
    </View>
  );
}

// 2. Demostración para ChipCategoria
function DemostradorChipCategoria() {
  const [categoriaActiva, setCategoriaActiva] = useState('grass');

  const categorias = [
    { id: 'todos', etiqueta: 'Todos', conteo: 12 },
    { id: 'grass', etiqueta: 'Canchas de Grass', conteo: 3 },
    { id: 'futsal', etiqueta: 'Fútbol Sala', conteo: 2 },
    { id: 'estudio', etiqueta: 'Salas de Estudio', conteo: 7 },
  ];

  return (
    <View style={estilosDemo.contenedor}>
      <Text style={estilosDemo.subtitulo}>
        Filtro activo: <Text style={estilosDemo.resaltado}>{categoriaActiva}</Text>
      </Text>
      <View style={estilosDemo.filaChips}>
        {categorias.map((cat) => (
          <ChipCategoria
            key={cat.id}
            etiqueta={cat.etiqueta}
            conteo={cat.conteo}
            activo={categoriaActiva === cat.id}
            onPress={() => setCategoriaActiva(cat.id)}
            style={estilosDemo.elementoChip}
          />
        ))}
      </View>
    </View>
  );
}

// 3. Demostración para CampoBusqueda
function DemostradorCampoBusqueda() {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [ultimoEnviado, setUltimoEnviado] = useState('');

  return (
    <View style={estilosDemo.contenedor}>
      <CampoBusqueda
        valor={textoBusqueda}
        onChangeText={setTextoBusqueda}
        placeholder="Buscar canchas, salas, laboratorios..."
        onLimpiar={() => setTextoBusqueda('')}
        onSubmit={(texto) => setUltimoEnviado(texto)}
      />

      <View style={estilosDemo.cajaInfo}>
        <Text style={estilosDemo.subtitulo}>
          Valor en vivo (valor): <Text style={estilosDemo.resaltado}>{textoBusqueda || '(vacío)'}</Text>
        </Text>
        {Boolean(ultimoEnviado) && (
          <Text style={estilosDemo.subtitulo}>
            Último valor enviado (onSubmit): <Text style={estilosDemo.resaltado}>{ultimoEnviado}</Text>
          </Text>
        )}
      </View>
    </View>
  );
}

// 4. Demostración para SelectorHorario
function DemostradorSelectorHorario() {
  const [horarioElegido, setHorarioElegido] = useState('16:00');

  // Datos del ejemplo del PDF de UniAccess
  const listaHorarios = [
    { hora: '14:00', disponible: false },
    { hora: '15:00', disponible: true },
    { hora: '16:00', disponible: true },
    { hora: '17:00', disponible: false },
    { hora: '18:00', disponible: true },
    { hora: '19:00', disponible: true },
  ];

  return (
    <View style={estilosDemo.contenedor}>
      <Text style={estilosDemo.subtitulo}>
        Horario seleccionado:{' '}
        <Text style={estilosDemo.resaltado}>{horarioElegido || 'Ninguno'}</Text>
      </Text>

      <SelectorHorario
        horarios={listaHorarios}
        horarioSeleccionado={horarioElegido}
        onChange={(hora) => setHorarioElegido(hora)}
      />
    </View>
  );
}

// 5. Demostración para InsigniaEstado
function DemostradorInsigniaEstado() {
  return (
    <View style={estilosDemo.contenedor}>
      <Text style={estilosDemo.subtitulo}>Estados de servicios y reservas de UniAccess:</Text>
      <View style={estilosDemo.cuadriculaInsignias}>
        <InsigniaEstado estado="disponible" etiqueta="Cancha Libre" />
        <InsigniaEstado estado="ocupado" etiqueta="En Uso / Ocupado" />
        <InsigniaEstado estado="mantenimiento" etiqueta="Mantenimiento" />
        <InsigniaEstado estado="pendiente" etiqueta="Reserva Pendiente" />
      </View>
    </View>
  );
}

// 6. Demostración para TarjetaInstalacion
function DemostradorTarjetaInstalacion() {
  const [mensajeInteraccion, setMensajeInteraccion] = useState('');

  return (
    <View style={estilosDemo.contenedor}>
      {Boolean(mensajeInteraccion) && (
        <View style={estilosDemo.cajaInfo}>
          <Text style={estilosDemo.resaltado}>{mensajeInteraccion}</Text>
        </View>
      )}

      <TarjetaInstalacion
        titulo="Cancha de Grass Sintético Nº 1"
        categoria="Deportes Campus"
        ubicacion="Torre Central - Espacio Deportivo"
        capacidad="14 jugadores"
        urlImagen="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=600&auto=format&fit=crop&q=80"
        estado="disponible"
        onPress={() => setMensajeInteraccion('Seleccionaste: Cancha de Grass Sintético Nº 1')}
      />

      <TarjetaInstalacion
        titulo="Cancha Polideportiva Techada"
        categoria="Fútbol Sala / Básquet"
        ubicacion="Pabellón Deportivo Norte"
        capacidad="10 jugadores"
        urlImagen="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop&q=80"
        estado="ocupado"
        onPress={() => setMensajeInteraccion('Seleccionaste: Cancha Polideportiva Techada')}
      />
    </View>
  );
}

const estilosDemo = StyleSheet.create({
  contenedor: {
    gap: spacing.md,
  },
  subtitulo: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  resaltado: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
  fila: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  elementoBoton: {
    flex: 1,
  },
  filaChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  elementoChip: {
    marginBottom: spacing.xs,
  },
  cajaInfo: {
    backgroundColor: colors.surfaceHighlight,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  cuadriculaInsignias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});

// Estructura oficial del catálogo con nombres en español
export const CATALOGO = [
  {
    id: 'boton-principal',
    name: 'BotonPrincipal',
    category: 'Acción',
    description: 'Botón con soporte de variantes (primario, borde, peligro), estados presionado/deshabilitado y evento onPress.',
    Demo: DemostradorBotonPrincipal,
  },
  {
    id: 'chip-categoria',
    name: 'ChipCategoria',
    category: 'Acción',
    description: 'Chip interactivo para filtrar categorías de instalaciones universitarias. Controlado mediante activo y onPress.',
    Demo: DemostradorChipCategoria,
  },
  {
    id: 'campo-busqueda',
    name: 'CampoBusqueda',
    category: 'Entrada',
    description: 'Buscador controlado con icono, botón de limpieza táctil, y eventos onChangeText, onLimpiar y onSubmit.',
    Demo: DemostradorCampoBusqueda,
  },
  {
    id: 'selector-horario',
    name: 'SelectorHorario',
    category: 'Entrada',
    description: 'Selector de bloques horarios (ej. reserva de cancha según PDF). Controlado mediante horarioSeleccionado y onChange.',
    Demo: DemostradorSelectorHorario,
  },
  {
    id: 'insignia-estado',
    name: 'InsigniaEstado',
    category: 'Contenedor / Dato',
    description: 'Indicador visual de estado (disponible, ocupado, mantenimiento, pendiente) con roles cromáticos del tema.',
    Demo: DemostradorInsigniaEstado,
  },
  {
    id: 'tarjeta-instalacion',
    name: 'TarjetaInstalacion',
    category: 'Contenedor / Dato',
    description: 'Tarjeta de instalación deportiva que integra Image, View, Text, Pressable, InsigniaEstado y tokens del tema.',
    Demo: DemostradorTarjetaInstalacion,
  },
];

export const CATALOG = CATALOGO;
export default CATALOG;
