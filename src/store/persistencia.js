// src/store/persistencia.js
// Persistencia automática del slice principal en AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE = 'reservas/v1';

export async function cargarReservas() {
  try {
    const json = await AsyncStorage.getItem(CLAVE);
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.warn('No se pudo leer el almacenamiento de reservas', error);
    return null;
  }
}

export function suscribirPersistencia(store) {
  let ultimo = store.getState().reservas.items;

  store.subscribe(() => {
    const actual = store.getState().reservas.items;
    // Solo escribimos en disco si la referencia cambió (gracias a Immer)
    if (actual !== ultimo) {
      ultimo = actual;
      AsyncStorage.setItem(CLAVE, JSON.stringify(actual)).catch((error) => {
        console.warn('No se pudieron persistir las reservas', error);
      });
    }
  });
}

