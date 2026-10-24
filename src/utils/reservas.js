// src/utils/reservas.js
// Reglas de negocio de las reservas de CESPAR URP

import { esHoy, horaAMinutos, horaActualEnMinutos, aISO } from './fechas';

// Un ambiente de gran aforo (coliseo) requiere aprobación previa de CESPAR
export function requiereAprobacion(ambiente) {
  return Boolean(ambiente) && ambiente.capacidad >= 30;
}

// Máximo de reservas activas simultáneas permitidas por estudiante
export const MAX_RESERVAS_ACTIVAS = 3;

// Estado real de la reserva: una reserva confirmada cuya última hora ya pasó
// se considera finalizada aunque nadie haya modificado el registro.
export function estadoEfectivo(reserva) {
  if (reserva.estado === 'cancelada') return 'cancelada';

  const hoy = aISO(new Date());
  if (reserva.fecha < hoy) return 'finalizada';

  if (esHoy(reserva.fecha)) {
    const ultimaHora = reserva.horas[reserva.horas.length - 1];
    if (horaAMinutos(ultimaHora) + 60 <= horaActualEnMinutos()) return 'finalizada';
  }

  return reserva.estado;
}

export function estaActiva(reserva) {
  const estado = estadoEfectivo(reserva);
  return estado === 'confirmada' || estado === 'pendiente';
}

export function esReservaFutura(reserva) {
  return reserva.fecha >= aISO(new Date());
}
