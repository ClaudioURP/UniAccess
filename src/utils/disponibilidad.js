// src/utils/disponibilidad.js
// Cálculo de bloques horarios disponibles de cada ambiente de CESPAR URP.
// La disponibilidad se deriva de una función determinista, por lo que es estable
// entre renders y navegaciones (no cambia aleatoriamente cada vez que se entra).

import { esHoy, horaAMinutos, horaActualEnMinutos } from './fechas';

export const BLOQUES_HORARIOS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
];

function hashCadena(texto) {
  let acumulado = 0;
  for (let i = 0; i < texto.length; i += 1) {
    acumulado = (acumulado * 31 + texto.charCodeAt(i)) % 1000000007;
  }
  return acumulado;
}

// Un bloque está ocupado si su hash supera el umbral de ocupación de su franja horaria
export function bloqueDisponible(ambienteId, fechaISO, hora) {
  if (esHoy(fechaISO) && horaAMinutos(hora) <= horaActualEnMinutos()) return false;

  const esHoraPunta = horaAMinutos(hora) >= 17 * 60;
  const umbralOcupacion = esHoraPunta ? 62 : 38;
  const semilla = hashCadena(`${ambienteId}|${fechaISO}|${hora}`) % 100;

  return semilla >= umbralOcupacion;
}

export function bloquesDelDia(ambienteId, fechaISO) {
  return BLOQUES_HORARIOS.map((hora) => ({
    hora,
    disponible: bloqueDisponible(ambienteId, fechaISO, hora),
  }));
}

export function resumenDelDia(ambienteId, fechaISO) {
  const bloques = bloquesDelDia(ambienteId, fechaISO);
  const libres = bloques.filter((bloque) => bloque.disponible).length;
  return { total: bloques.length, libres, ocupados: bloques.length - libres };
}

// Se usa en las tarjetas del listado para mostrar "x horarios libres"
export function libresEnProximosDias(ambienteId, dias = 3) {
  const hoy = new Date();
  let total = 0;
  for (let i = 0; i < dias; i += 1) {
    const fecha = new Date(hoy);
    fecha.setDate(fecha.getDate() + i);
    const iso = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
    total += resumenDelDia(ambienteId, iso).libres;
  }
  return total;
}

// Estado que se muestra en la tarjeta del ambiente
export function estadoAmbiente(ambiente) {
  if (ambiente.mantenimiento) return 'mantenimiento';
  const hoy = new Date();
  const iso = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
  return resumenDelDia(ambiente.id, iso).libres > 0 ? 'disponible' : 'ocupado';
}
