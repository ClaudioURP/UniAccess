# Bitácora de Desarrollo por Laboratorios - UniAccess URP

En este documento se registran los avances y cambios técnicos realizados en cada laboratorio del proyecto. Quien continúe con el siguiente laboratorio debe agregar su sección al final siguiendo esta misma estructura.

---

## 🧪 Laboratorio 03: Estructura, Navegación y Maquetación de Pantallas

* **Rama:** `lab-03`
* **Objetivo:** Construir el esqueleto navegable completo de la aplicación utilizando Expo Router, maquetar todas las vistas con componentes reutilizables y conectar los flujos mediante paso de parámetros.

### Lo que se hizo:

1. **Configuración de Expo Router:**
   * Se organizó la arquitectura de rutas dentro de la carpeta `src/app`.
   * Se configuró la navegación por pila (`Stack`) en el layout raíz (`src/app/_layout.js`) para manejar pantallas individuales y transiciones (login, detalle de ambiente, nueva reserva, comprobante y catálogo).
   * Se configuró la navegación inferior por pestañas (`Tabs`) en `src/app/(tabs)/_layout.js` con las 4 secciones principales: Inicio, Explorar, Mis reservas y Perfil.

2. **Creación y maquetación de pantallas:**
   * **`src/app/login.js`:** Pantalla de autenticación con campos para código universitario y contraseña, manejo de errores y botón para cargar credenciales de prueba.
   * **`src/app/(tabs)/inicio.js`:** Cabecera con saludo al estudiante, botón de notificaciones, acceso directo al buscador, tarjeta de próxima reserva con badge de estado, accesos rápidos por tipo de deporte y lista de ambientes destacados.
   * **`src/app/(tabs)/explorar.js`:** Listado de ambientes deportivos de CESPAR con barra de búsqueda por texto, barra horizontal de chips por deporte (grass, losa, básquet, vóley, etc.) y filtro de disponibilidad.
   * **`src/app/ambiente/[id].js`:** Vista detallada de la instalación deportiva. Muestra imagen, ficha técnica (aforo, superficie, tarifa por hora, servicios), tira de días (próximos 14 días) y matriz interactiva de horarios por bloques de una hora.
   * **`src/app/reserva/nueva.js`:** Formulario de revisión antes de confirmar la reserva. Permite ajustar el número de personas, agregar observaciones, consultar la tarifa total calculada y validar topes de reservas activas.
   * **`src/app/reserva/[id].js`:** Comprobante digital de la reserva. Genera el código QR dinámico para el acceso en puerta, detalles del turno, badge de estado y opción para cancelar la reserva.
   * **`src/app/(tabs)/reservas.js`:** Vista de Mis Reservas con segmentación por pestañas (Próximas, Historial y Canceladas) con tarjetas interactivas de cada reserva.
   * **`src/app/(tabs)/perfil.js`:** Información académica del estudiante, switches de preferencias, accesos al reglamento y horarios de atención de CESPAR, y botón de cerrar sesión.
   * **`src/app/catalogo.js`:** Vitrina visual con las demostraciones interactivas de los componentes del sistema de diseño (LAB-02).

3. **Flujos de navegación y paso de parámetros:**
   * Se conectaron todas las pantallas usando `router.push()` y `router.replace()`.
   * Se implementó el paso y recepción de parámetros mediante `useLocalSearchParams()`:
     * De Inicio a Explorar pasando la categoría seleccionada.
     * De Explorar al detalle de ambiente mediante ruta dinámica `/ambiente/[id]`.
     * De Ambiente a Nueva Reserva pasando `ambienteId`, `fecha` y los bloques de `horas`.
     * De Nueva Reserva al Comprobante pasando el ID de la reserva generada.

4. **Headers y botones de acción:**
   * Cada pantalla se dotó de títulos claros y al menos un botón de acción (retroceso `arrow-back`, cancelar reserva, filtros o notificaciones).

5. **Manejo inicial de datos:**
   * Se implementó un Context básico (`ReservasContext.js` y `SesionContext.js`) con almacenamiento local en `AsyncStorage` para poder probar el flujo completo de reserva de manera navegable.

---

## 🧪 Laboratorio 04: Estado Global con Redux Toolkit y Persistencia

* **Rama:** `lab-04` (creada a partir de `lab-03`)
* **Objetivo:** Implementar Redux Toolkit como el cerebro y gestor del estado global del proyecto, estructurar un slice completo para la entidad principal (`reservas`), persistir los cambios de forma automática en AsyncStorage y desacoplar la sesión mediante Context API.

### Lo que se hizo:

1. **Instalación de dependencias:**
   * Se instalaron los paquetes oficiales `@reduxjs/toolkit` y `react-redux`.

2. **Documentación del mapa de estado (`docs/estado.md`):**
   * Se elaboró el documento donde se clasificó formalmente cada dato de la aplicación:
     * **Estado local (`useState`):** Textos de campos de búsqueda, filtros seleccionados temporalmente en pantalla, fecha/hora seleccionadas en el selector y aforo.
     * **Context (`SesionContext`):** Estado de autenticación del usuario (`usuario`, `estaLogueado`).
     * **Store de Redux (`reservas`):** La entidad de negocio principal que se comparte entre múltiples pantallas.
   * Se documentó la forma del store, la lista de acciones y los selectores disponibles.

3. **Creación del Store centralizado (`src/store/index.js`):**
   * Se configuró el Store global con `configureStore()` integrando el reducer de reservas.

4. **Creación del Slice de reservas (`src/store/reservasSlice.js`):**
   * **Datos iniciales:** Se definieron 3 reservas de prueba en `initialState` (confirmada, pendiente y finalizada) para que la aplicación muestre información desde el primer arranque.
   * **Reducers con Immer y `prepare`:**
     * `agregarReserva`: Usa `prepare` para generar automáticamente un ID único (`nanoid()`), código institucional (`URP-XXXXX`), fecha ISO y cálculo de tarifa total. Inserta el nuevo registro al inicio del arreglo.
     * `cambiarEstado`: Permite modificar el estado de cualquier reserva identificada por ID.
     * `cancelarReserva`: Actualiza el estado a `'cancelada'`, registra la fecha de cancelación y el motivo.
     * `eliminarReserva`: Permite borrar un registro de la lista mediante filtrado inmutable.
     * `reemplazarTodas`: Hidrata el arreglo de reservas cuando se leen los datos persistidos en disco.
   * **Selectores memoizados con `createSelector`:**
     * `selectReservas`: Devuelve toda la lista de reservas.
     * `selectReservaPorId(id)`: Busca y devuelve una reserva específica por su ID.
     * `selectReservasActivas`: Filtra en tiempo real solo las reservas confirmadas o pendientes.
     * `selectHorasReservadasPorMi(ambienteId, fecha)`: Devuelve los horarios bloqueados para una fecha y cancha específica.
     * `selectProximaReserva`: Ordena cronológicamente y obtiene la reserva activa más cercana.
     * `selectEstadisticas`: Calcula el total de reservas, activas, cumplidas, canceladas y cantidad de horas reservadas.

5. **Módulo de persistencia automática (`src/store/persistencia.js`):**
   * Se configuró el guardado con la clave versionada `'reservas/v1'` en `AsyncStorage`.
   * Se implementó `suscribirPersistencia(store)` usando `store.subscribe()` con validación por referencia (`actual !== ultimo`), guardando automáticamente solo cuando hay cambios reales en las reservas.
   * Se creó `cargarReservas()` para recuperar la información al iniciar la app.

6. **Integración en el Layout raíz (`src/app/_layout.js`):**
   * Se envolvió la navegación dentro de `<Provider store={store}>` como nivel superior.
   * Se registró la suscripción de persistencia fuera del ciclo de vida del componente para evitar duplicidad.
   * Se ejecutó un `useEffect` que carga los datos de `AsyncStorage` y despacha `reemplazarTodas(items)` al store.

7. **Migración de todas las pantallas a Redux (`useSelector` y `useDispatch`):**
   * Se eliminó el antiguo archivo `src/context/ReservasContext.js`.
   * **`inicio.js`:** Se conectó a `selectProximaReserva` y `selectEstadisticas` con `useSelector`.
   * **`explorar.js`:** Lee las reservas del store con `useSelector` para marcar canchas con turnos reservados.
   * **`reservas.js`:** Lee la lista completa con `useSelector` y despacha `cancelarReserva` con `useDispatch`.
   * **`perfil.js`:** Muestra las métricas globales del estudiante consumiendo `selectEstadisticas`.
   * **`(tabs)/_layout.js`:** El badge de la pestaña "Mis reservas" lee directamente `selectReservasActivas.length`.
   * **`ambiente/[id].js`:** Consulta las reservas del store para deshabilitar las horas ya tomadas por el alumno.
   * **`reserva/nueva.js`:** Despacha `agregarReserva` mediante `useDispatch` y redirige al comprobante con el ID generado.
   * **`reserva/[id].js`:** Lee los datos con `selectReservaPorId(id)`, permite cancelar reservas activas y despachar `eliminarReserva` para limpiar el historial de comprobantes pasados.

8. **Ajuste del Context de sesión (`src/context/SesionContext.js`):**
   * Se conservó como Context independiente para la autenticación, exponiendo `estaLogueado` y con el valor memoizado en `useMemo`.

---

## 🧪 Laboratorio 05: [Título del siguiente laboratorio]

* **Rama:** `lab-05`
* **Objetivo:** *(Describir aquí el objetivo central del siguiente laboratorio)*

### Lo que se hizo:

1. *(Detallar aquí los pasos, componentes, librerías o pantallas agregadas en el Lab 05)*
2. *(...)*
