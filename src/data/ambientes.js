// src/data/ambientes.js
// Catálogo de ambientes administrados por CESPAR URP (Centro de Servicios para
// Actividades Recreativas y Deportivas de la Universidad Ricardo Palma)

export const CATEGORIAS = [
  { id: 'todos', etiqueta: 'Todos', icono: 'apps-outline' },
  { id: 'futbol-grass', etiqueta: 'Fútbol grass', icono: 'football-outline' },
  { id: 'futbol-losa', etiqueta: 'Fútbol losa', icono: 'football-outline' },
  { id: 'basquet', etiqueta: 'Básquet', icono: 'basketball-outline' },
  { id: 'voley', etiqueta: 'Vóley', icono: 'tennisball-outline' },
  { id: 'multideporte', etiqueta: 'Polideportivo', icono: 'trophy-outline' },
];

export const AMBIENTES = [
  {
    id: 'grass-1',
    nombre: 'Cancha de Grass Sintético N° 1',
    categoria: 'futbol-grass',
    deporte: 'Fútbol 7',
    superficie: 'Grass sintético',
    capacidad: 14,
    ubicacion: 'Zona Deportiva Norte · Campus URP',
    descripcion:
      'Cancha principal de grass sintético de última generación, con iluminación LED para partidos nocturnos y arcos reglamentarios. Requiere calzado de terreno sintético o chimpunes.',
    tarifaPorHora: 40,
    servicios: ['Iluminación LED', 'Vestuarios y duchas', 'Arcos reglamentarios', 'Tribuna lateral'],
    imagen: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&auto=format&fit=crop&q=80',
    destacado: true,
  },
  {
    id: 'grass-2',
    nombre: 'Cancha de Grass Sintético N° 2',
    categoria: 'futbol-grass',
    deporte: 'Fútbol 7',
    superficie: 'Grass sintético',
    capacidad: 14,
    ubicacion: 'Zona Deportiva Norte · Campus URP',
    descripcion:
      'Cancha secundaria de grass sintético, ideal para campeonatos internos por facultades y entrenamientos de selecciones URP.',
    tarifaPorHora: 40,
    servicios: ['Iluminación LED', 'Vestuarios y duchas', 'Bloques de entrenamiento'],
    imagen: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'losa-1',
    nombre: 'Cancha de Losa (Futsal) N° 1',
    categoria: 'futbol-losa',
    deporte: 'Fútbol sala',
    superficie: 'Losa deportiva',
    capacidad: 12,
    ubicacion: 'Pabellón Deportivo Central · Campus URP',
    descripcion:
      'Losa de cemento pulido con cerco perimetral y arcos de futsal. Recomendada para fútbol sala recreativo y torneos de facultades.',
    tarifaPorHora: 30,
    servicios: ['Cerco perimetral', 'Iluminación LED', 'Arcos de futsal'],
    imagen: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80',
    destacado: true,
  },
  {
    id: 'losa-2',
    nombre: 'Cancha de Losa N° 2',
    categoria: 'futbol-losa',
    deporte: 'Fútbol sala',
    superficie: 'Losa deportiva',
    capacidad: 10,
    ubicacion: 'Pabellón Deportivo Central · Campus URP',
    descripcion:
      'Losa de uso múltiple para futsal y básquet recreativo. Cuenta con tableros desmontables y mallas de protección.',
    tarifaPorHora: 28,
    servicios: ['Mallas de protección', 'Tableros desmontables', 'Iluminación'],
    imagen: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'basquet-1',
    nombre: 'Cancha de Básquet Techada',
    categoria: 'basquet',
    deporte: 'Básquetbol',
    superficie: 'Losa acrílica',
    capacidad: 10,
    ubicacion: 'Coliseo CESPAR · Campus URP',
    descripcion:
      'Cancha techada con piso acrílico profesional, aros con tablero de vidrio y marcado reglamentario FIBA. Se reserva por bloques de una hora.',
    tarifaPorHora: 25,
    servicios: ['Techada', 'Tableros profesionales', 'Marcado FIBA', 'Graderías'],
    imagen: 'https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=800&auto=format&fit=crop&q=80',
    destacado: true,
  },
  {
    id: 'voley-1',
    nombre: 'Cancha de Vóley',
    categoria: 'voley',
    deporte: 'Vóleibol',
    superficie: 'Losa deportiva',
    capacidad: 12,
    ubicacion: 'Zona Deportiva Sur · Campus URP',
    descripcion:
      'Cancha de vóley con red reglamentaria ajustable y líneas pintadas. Disponible para vóley mixto y femenino.',
    tarifaPorHora: 25,
    servicios: ['Red ajustable', 'Líneas reglamentarias', 'Iluminación'],
    imagen: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'poli-1',
    nombre: 'Coliseo Polideportivo CESPAR',
    categoria: 'multideporte',
    deporte: 'Multideporte',
    superficie: 'Losa acrílica techada',
    capacidad: 30,
    ubicacion: 'Coliseo CESPAR · Campus URP',
    descripcion:
      'Recinto techado de usos múltiples para básquet, vóley y eventos deportivos institucionales. Requiere autorización de CESPAR para eventos masivos.',
    tarifaPorHora: 60,
    servicios: ['Techado completo', 'Graderías', 'Sonido', 'Vestuarios'],
    imagen: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'grass-3',
    nombre: 'Cancha de Grass Sintético N° 3 (en mantenimiento)',
    categoria: 'futbol-grass',
    deporte: 'Fútbol 5',
    superficie: 'Grass sintético',
    capacidad: 10,
    ubicacion: 'Zona Deportiva Norte · Campus URP',
    descripcion:
      'Cancha de fútbol 5 cerrada temporalmente por resiembra del grass sintético y mantenimiento de luminarias.',
    tarifaPorHora: 35,
    servicios: ['Iluminación LED', 'Cerco perimetral'],
    imagen: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    mantenimiento: true,
  },
];

export const DEPORTES_DESTACADOS = ['Fútbol 7', 'Fútbol sala', 'Básquetbol', 'Vóleibol'];

export function obtenerAmbiente(id) {
  return AMBIENTES.find((ambiente) => ambiente.id === id) || null;
}

export function obtenerCategoria(id) {
  return CATEGORIAS.find((categoria) => categoria.id === id) || CATEGORIAS[0];
}

export function ambientesPorCategoria(categoriaId) {
  if (!categoriaId || categoriaId === 'todos') return AMBIENTES;
  return AMBIENTES.filter((ambiente) => ambiente.categoria === categoriaId);
}

export function contarAmbientesPorCategoria() {
  const conteos = {};
  CATEGORIAS.forEach((categoria) => {
    conteos[categoria.id] = ambientesPorCategoria(categoria.id).length;
  });
  return conteos;
}

export function buscarAmbientes(texto, categoriaId = 'todos') {
  const termino = (texto || '').trim().toLowerCase();
  return ambientesPorCategoria(categoriaId).filter((ambiente) => {
    if (!termino) return true;
    return [ambiente.nombre, ambiente.deporte, ambiente.ubicacion, ambiente.superficie]
      .join(' ')
      .toLowerCase()
      .includes(termino);
  });
}
