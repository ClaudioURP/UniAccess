// src/utils/fechas.js
// Utilidades de fecha y hora para el flujo de reservas de CESPAR URP

const NOMBRES_DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const NOMBRES_DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const NOMBRES_MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre',
];
const NOMBRES_MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];

// Convierte un objeto Date a "AAAA-MM-DD"
export function aISO(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

// Convierte "AAAA-MM-DD" a un Date local (evita el desfase de zona horaria de new Date(iso))
export function desdeISO(iso) {
  const [anio, mes, dia] = iso.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

export function hoyISO() {
  return aISO(new Date());
}

export function sumarDias(fecha, dias) {
  const copia = new Date(fecha);
  copia.setDate(copia.getDate() + dias);
  return copia;
}

// Genera la tira de días del selector de fecha
export function generarDias(cantidad = 14) {
  const base = new Date();
  return Array.from({ length: cantidad }, (_, indice) => {
    const fecha = sumarDias(base, indice);
    const iso = aISO(fecha);
    return {
      iso,
      diaSemana: NOMBRES_DIAS_CORTOS[fecha.getDay()],
      diaNumero: fecha.getDate(),
      mesCorto: NOMBRES_MESES_CORTOS[fecha.getMonth()],
      esHoy: indice === 0,
    };
  });
}

export function formatearFechaCorta(iso) {
  const fecha = desdeISO(iso);
  return `${NOMBRES_DIAS_CORTOS[fecha.getDay()]} ${fecha.getDate()} ${NOMBRES_MESES_CORTOS[fecha.getMonth()]}`;
}

export function formatearFechaLarga(iso) {
  const fecha = desdeISO(iso);
  const dia = NOMBRES_DIAS[fecha.getDay()];
  return `${dia.charAt(0).toUpperCase()}${dia.slice(1)} ${fecha.getDate()} de ${NOMBRES_MESES[fecha.getMonth()]}`;
}

export function esHoy(iso) {
  return iso === hoyISO();
}

export function esFechaPasada(iso) {
  return desdeISO(iso).getTime() < desdeISO(hoyISO()).getTime();
}

export function horaAMinutos(hora) {
  const [horas, minutos] = hora.split(':').map(Number);
  return horas * 60 + minutos;
}

export function minutosAHora(minutos) {
  const horas = String(Math.floor(minutos / 60)).padStart(2, '0');
  const restantes = String(minutos % 60).padStart(2, '0');
  return `${horas}:${restantes}`;
}

export function horaActualEnMinutos() {
  const ahora = new Date();
  return ahora.getHours() * 60 + ahora.getMinutes();
}

export function ordenarHoras(horas) {
  return [...horas].sort((a, b) => horaAMinutos(a) - horaAMinutos(b));
}

// "16:00 - 18:00" a partir de los bloques seleccionados
export function rangoHorario(horas) {
  if (!horas || horas.length === 0) return '';
  const ordenadas = ordenarHoras(horas);
  const inicio = ordenadas[0];
  const fin = minutosAHora(horaAMinutos(ordenadas[ordenadas.length - 1]) + 60);
  return `${inicio} - ${fin}`;
}

export function duracionEnHoras(horas) {
  return horas ? horas.length : 0;
}
