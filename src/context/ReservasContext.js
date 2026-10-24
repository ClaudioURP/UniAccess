// src/context/ReservasContext.js
// Motor de reservas de CESPAR URP: creación, cancelación, persistencia y
// cálculo del estado real de cada reserva según la fecha y hora.

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { obtenerAmbiente } from '../data/ambientes';
import { horaAMinutos } from '../utils/fechas';
import { estadoEfectivo, requiereAprobacion } from '../utils/reservas';

const CLAVE_RESERVAS = 'uniaccess:reservas';
const CARACTERES_CODIGO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const ReservasContext = createContext(null);

function generarCodigo() {
  let sufijo = '';
  for (let i = 0; i < 5; i += 1) {
    sufijo += CARACTERES_CODIGO[Math.floor(Math.random() * CARACTERES_CODIGO.length)];
  }
  return `URP-${sufijo}`;
}

export function ReservasProvider({ children }) {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    (async () => {
      try {
        const guardadas = await AsyncStorage.getItem(CLAVE_RESERVAS);
        if (activo && guardadas) setReservas(JSON.parse(guardadas));
      } catch (error) {
        console.warn('No se pudieron restaurar las reservas', error);
      } finally {
        if (activo) setCargando(false);
      }
    })();

    return () => {
      activo = false;
    };
  }, []);

  const persistir = async (siguientes) => {
    setReservas(siguientes);
    try {
      await AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(siguientes));
    } catch (error) {
      console.warn('No se pudieron guardar las reservas', error);
    }
  };

  const crearReserva = async ({ ambienteId, fecha, horas, personas, observaciones }) => {
    const ambiente = obtenerAmbiente(ambienteId);
    const nueva = {
      id: `${Date.now()}`,
      codigo: generarCodigo(),
      ambienteId,
      fecha,
      horas: [...horas].sort((a, b) => horaAMinutos(a) - horaAMinutos(b)),
      personas,
      observaciones: observaciones || '',
      estado: requiereAprobacion(ambiente) ? 'pendiente' : 'confirmada',
      creadaEn: new Date().toISOString(),
      monto: (ambiente?.tarifaPorHora || 0) * horas.length,
    };

    await persistir([nueva, ...reservas]);
    return nueva;
  };

  const cancelarReserva = async (id, motivo) => {
    const siguientes = reservas.map((reserva) =>
      reserva.id === id
        ? {
            ...reserva,
            estado: 'cancelada',
            motivoCancelacion: motivo || 'Cancelada por el estudiante',
            canceladaEn: new Date().toISOString(),
          }
        : reserva,
    );
    await persistir(siguientes);
  };

  const obtenerReserva = (id) => reservas.find((reserva) => reserva.id === id) || null;

  // Bloques que el propio estudiante ya reservó (para bloquearlos en el selector)
  const horasReservadasPorMi = (ambienteId, fecha) => {
    const conjunto = new Set();
    reservas
      .filter(
        (reserva) =>
          reserva.ambienteId === ambienteId &&
          reserva.fecha === fecha &&
          estadoEfectivo(reserva) !== 'cancelada',
      )
      .forEach((reserva) => reserva.horas.forEach((hora) => conjunto.add(hora)));
    return conjunto;
  };

  // Reserva futura más cercana, se muestra destacada en el Inicio
  const proximaReserva = useMemo(() => {
    const activas = reservas
      .filter((reserva) => {
        const estado = estadoEfectivo(reserva);
        return estado === 'confirmada' || estado === 'pendiente';
      })
      .sort((a, b) => {
        if (a.fecha !== b.fecha) return a.fecha < b.fecha ? -1 : 1;
        return horaAMinutos(a.horas[0]) - horaAMinutos(b.horas[0]);
      });
    return activas[0] || null;
  }, [reservas]);

  const estadisticas = useMemo(() => {
    const conEstado = reservas.map((reserva) => ({ ...reserva, estadoReal: estadoEfectivo(reserva) }));
    return {
      activas: conEstado.filter(
        (reserva) => reserva.estadoReal === 'confirmada' || reserva.estadoReal === 'pendiente',
      ).length,
      finalizadas: conEstado.filter((reserva) => reserva.estadoReal === 'finalizada').length,
      canceladas: conEstado.filter((reserva) => reserva.estadoReal === 'cancelada').length,
      horasReservadas: conEstado
        .filter((reserva) => reserva.estadoReal !== 'cancelada')
        .reduce((total, reserva) => total + reserva.horas.length, 0),
    };
  }, [reservas]);

  const valor = useMemo(
    () => ({
      reservas,
      cargando,
      crearReserva,
      cancelarReserva,
      obtenerReserva,
      horasReservadasPorMi,
      proximaReserva,
      estadisticas,
    }),
    [reservas, cargando, proximaReserva, estadisticas],
  );

  return <ReservasContext.Provider value={valor}>{children}</ReservasContext.Provider>;
}

export function useReservas() {
  const contexto = useContext(ReservasContext);
  if (!contexto) throw new Error('useReservas debe usarse dentro de ReservasProvider');
  return contexto;
}
