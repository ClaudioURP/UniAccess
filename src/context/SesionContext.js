// src/context/SesionContext.js
// Sesión del estudiante URP: login, persistencia y cierre de sesión.

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USUARIO_DEMO } from '../data/usuario';

const CLAVE_SESION = 'uniaccess:sesion';

const SesionContext = createContext(null);

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Restaura la sesión guardada al abrir la aplicación
  useEffect(() => {
    let activo = true;

    (async () => {
      try {
        const guardada = await AsyncStorage.getItem(CLAVE_SESION);
        if (activo && guardada) setUsuario(JSON.parse(guardada));
      } catch (error) {
        console.warn('No se pudo restaurar la sesión', error);
      } finally {
        if (activo) setCargando(false);
      }
    })();

    return () => {
      activo = false;
    };
  }, []);

  const iniciarSesion = async ({ codigo, contrasena }) => {
    if (!codigo || !contrasena) {
      return { ok: false, mensaje: 'Ingresa tu código URP y tu contraseña.' };
    }
    if (contrasena.length < 4) {
      return { ok: false, mensaje: 'La contraseña debe tener al menos 4 caracteres.' };
    }

    const perfil = { ...USUARIO_DEMO, codigo: codigo.trim() };
    setUsuario(perfil);
    try {
      await AsyncStorage.setItem(CLAVE_SESION, JSON.stringify(perfil));
    } catch (error) {
      console.warn('No se pudo guardar la sesión', error);
    }
    return { ok: true };
  };

  const cerrarSesion = async () => {
    setUsuario(null);
    try {
      await AsyncStorage.removeItem(CLAVE_SESION);
    } catch (error) {
      console.warn('No se pudo cerrar la sesión', error);
    }
  };

  const valor = useMemo(
    () => ({ usuario, cargando, iniciarSesion, cerrarSesion }),
    [usuario, cargando],
  );

  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) throw new Error('useSesion debe usarse dentro de SesionProvider');
  return contexto;
}
