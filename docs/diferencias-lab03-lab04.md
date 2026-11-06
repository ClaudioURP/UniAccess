# Diferencias entre LAB-03 y LAB-04: Cambios Realizados en el Proyecto

Este documento resume de forma directa qué teníamos en el **Laboratorio 03**, qué se implementó en el **Laboratorio 04** y cuáles son las diferencias técnicas y arquitectónicas entre ambos.

---

## 1. Resumen rápido: ¿Qué cambió de fondo?

* **En el LAB-03 (Esqueleto y Navegación):**
  Nos centramos en la estructura de pantallas y en cómo movernos entre ellas: configuramos Expo Router con navegación por pila (`Stack`) y navegación inferior (`Tabs`), maquetamos las vistas con los componentes del sistema de diseño (LAB-02) y conectamos los flujos pasando parámetros (`id`, `categoria`, fechas). Para que no estuviera vacío, manejamos los datos con un `Context` sencillo de React.

* **En el LAB-04 (El Cerebro de la App - Redux Toolkit y Estado Global):**
  Cambiamos la arquitectura de datos. Reemplazamos el Context de reservas por un **Store global de Redux Toolkit**, clasificamos qué dato va en qué lugar (local, Context o Store), conectamos las pantallas con `useSelector` y `useDispatch`, agregamos persistencia automática con `AsyncStorage` (clave versionada `reservas/v1`) y dejamos el `Context` exclusivamente para la sesión del usuario.

---

## 2. Cuadro comparativo

| Aspecto | LAB-03 | LAB-04 |
|---|---|---|
| **Rama de trabajo** | `lab-03` | `lab-04` |
| **Manejo de reservas** | `ReservasContext.js` (React Context) | `reservasSlice.js` (Redux Toolkit) |
| **Librerías añadidas** | Ninguna adicional | `@reduxjs/toolkit` y `react-redux` |
| **Documentación de estado** | No se requería | `docs/estado.md` con mapa detallado de variables |
| **Creación de datos** | Funciones asíncronas sueltas en Context | Reducer `agregarReserva` con función `prepare` (genera ID único, código URP y fechas ISO) |
| **Acciones disponibles** | Solo crear y cancelar | Crear (`prepare`), cambiar estado, cancelar y eliminar del store |
| **Lectura en pantallas** | Hook personalizado `useReservas()` | Hooks oficiales de Redux: `useSelector` con selectores memoizados (`createSelector`) |
| **Despacho de eventos** | Llamadas directas a funciones del Context | `useDispatch()` enviando acciones formales al store |
| **Manejo de sesión** | `SesionContext.js` | Se mantuvo `SesionContext.js`, agregando `estaLogueado` |
| **Persistencia** | Guardado manual dentro de cada función | Suscripción automática con `store.subscribe` en `persistencia.js` (clave `reservas/v1`) |
| **Badge en pestañas** | Cálculo manual dentro del layout | Selector derivado memoizado (`selectReservasActivas`) |

---

## 3. Detalle de cambios por módulo

### 3.1. Documentación del Estado (`docs/estado.md`)
Creamos el documento exigido por la rúbrica donde separamos claramente:
* **Estado local (`useState`):** Textos de búsqueda, filtros seleccionados por chip, fechas/horas marcadas en el calendario y aforo. Datos que mueren al salir de la pantalla.
* **Context (`SesionContext`):** Usuario activo y comprobación de login. Datos globales de baja frecuencia de cambio.
* **Store de Redux (`reservasSlice`):** La entidad principal de la app (canchas reservadas, estados, montos, códigos QR). Datos compartidos por múltiples vistas y con cambios frecuentes.

### 3.2. Nuevo módulo Store (`src/store/`)
Se crearon tres archivos clave:
1. **`src/store/index.js`:** Configuración central del Store con `configureStore()`.
2. **`src/store/reservasSlice.js`:**
   * **3 reservas iniciales de prueba** (confirmada, pendiente y finalizada) para que la app no arranque vacía.
   * **Reducers:** `agregarReserva` (con `prepare` para generar ID con `nanoid` y código `URP-XXXXX`), `cambiarEstado`, `cancelarReserva`, `eliminarReserva` y `reemplazarTodas`.
   * **Selectores memoizados:** Con `createSelector` para evitar renderizados innecesarios (`selectReservas`, `selectReservaPorId`, `selectReservasActivas`, `selectProximaReserva`, `selectEstadisticas`).
3. **`src/store/persistencia.js`:**
   * Función `cargarReservas()` para leer desde `AsyncStorage` al arrancar.
   * Función `suscribirPersistencia(store)` que escucha cambios en el estado y guarda en disco de forma automática cuando cambia la referencia.

### 3.3. Limpieza de Contextos (`src/context/`)
* **Eliminado `src/context/ReservasContext.js`:** Ya no hace falta porque todo su trabajo ahora lo hace Redux de forma más limpia y escalable.
* **Ajustado `src/context/SesionContext.js`:** Se mantiene tal como pide la guía, asegurando que exponga `estaLogueado` y con el valor memoizado mediante `useMemo`.

### 3.4. Layout Principal (`src/app/_layout.js`)
* Envolvemos toda la aplicación con `<Provider store={store}>` por encima de `<SafeAreaProvider>` y `<SesionProvider>`.
* Registramos la persistencia (`suscribirPersistencia`) una sola vez fuera del componente.
* Con un `useEffect` inicial leemos `cargarReservas()` y despachamos `reemplazarTodas(items)` para que los datos sobrevivan al cierre o recarga de la app.

### 3.5. Pantallas conectadas al Store
Todas las pantallas que antes dependían de `useReservas()` se migraron a Redux:
* **`inicio.js`:** Lee la próxima reserva con `selectProximaReserva` y el conteo de avisos con `selectEstadisticas`.
* **`explorar.js`:** Consulta las reservas del store para saber qué canchas tienen horarios ya ocupados por el estudiante.
* **`reservas.js` (Mis reservas):** Consume `selectReservas` y permite cancelar bloques despachando `cancelarReserva`.
* **`perfil.js`:** Muestra las estadísticas acumuladas consumiendo `selectEstadisticas`.
* **`ambiente/[id].js`:** Bloquea en la cuadrícula de horas aquellas que ya fueron reservadas en esa fecha.
* **`reserva/nueva.js`:** Despacha `agregarReserva(...)` con los datos del formulario y redirige al comprobante.
* **`reserva/[id].js`:** Lee los detalles con `selectReservaPorId(id)`, permite cancelar reservas activas y ahora también eliminar registros pasados con `eliminarReserva`.
* **`(tabs)/_layout.js`:** El globito rojo (badge) de la pestaña "Mis reservas" se actualiza solo usando `selectReservasActivas.length`.

---

## 4. ¿Por qué es mejor la arquitectura del LAB-04?

1. **Sin "prop drilling" ni estados duplicados:** Cualquier pantalla puede leer o modificar reservas sin pasarse funciones por props a través de los navegadores.
2. **Rendimiento optimizado:** Con `createSelector`, las pantallas solo se vuelven a dibujar si los datos que realmente consumen cambiaron.
3. **Persistencia desacoplada:** La lógica de guardar en `AsyncStorage` no ensucia las pantallas ni los componentes; ocurre en segundo plano de manera transparente.
4. **Preparado para backend (Semana 11):** En los próximos laboratorios, cuando conectemos una API REST, solo cambiaremos los reducers por `createAsyncThunk`, pero las pantallas y selectores seguirán funcionando exactamente igual.
