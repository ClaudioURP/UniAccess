# Mapa de Estado - UniAccess URP

Sistema de Gestión y Reserva de Ambientes Deportivos del CESPAR (Universidad Ricardo Palma).

---

## 1. Clasificación del Estado

| Dato | Tipo | Dónde vive | Quién lo lee | Quién lo modifica |
|------|------|------------|--------------|-------------------|
| **Texto de búsqueda** | Local | `useState` en `explorar.js` | `explorar.js` (filtrado de ambientes) | `CampoBusqueda` en `explorar.js` |
| **Categoría seleccionada** | Local | `useState` en `explorar.js` | `explorar.js` (filtrado de catálogo) | Chips de categoría en `explorar.js` o navegación desde `inicio.js` |
| **Solo disponibles** | Local | `useState` en `explorar.js` | `explorar.js` (filtro booleano) | Chip de filtro en `explorar.js` |
| **Fecha seleccionada** | Local | `useState` en `ambiente/[id].js` | Selector y matriz de horarios | `SelectorFecha` en `ambiente/[id].js` |
| **Horas seleccionadas** | Local | `useState` en `ambiente/[id].js` | Matriz de bloques y botón continuar | `SelectorHorario` en `ambiente/[id].js` |
| **Cantidad de personas** | Local | `useState` en `reserva/nueva.js` | Resumen de aforo | `SelectorCantidad` en `reserva/nueva.js` |
| **Observaciones** | Local | `useState` en `reserva/nueva.js` | Formulario de confirmación | `CampoTexto` en `reserva/nueva.js` |
| **Filtro de historial (tabs)** | Local | `useState` en `reservas.js` | Lista de Mis Reservas | Chips (Próximas, Historial, Canceladas) |
| **Usuario / Sesión** | Context | `SesionContext` (`src/context/`) | `_layout.js`, `inicio.js`, `perfil.js`, tabs | `login.js` (`iniciarSesion`), `perfil.js` (`cerrarSesion`) |
| **Reservas (Entidad principal)** | Store | Slice `reservas` (`src/store/`) | `inicio.js`, `explorar.js`, `reservas.js`, `perfil.js`, `reserva/[id].js`, `ambiente/[id].js`, `(tabs)/_layout.js` | `reserva/nueva.js` (`agregarReserva`), `reservas.js` / `reserva/[id].js` (`cancelarReserva`, `eliminarReserva`), hidratación (`reemplazarTodas`) |

---

## 2. Forma del Store

```json
{
  "reservas": {
    "items": [
      {
        "id": "res-1",
        "codigo": "URP-7K9M2",
        "ambienteId": "grass-1",
        "fecha": "2026-11-07",
        "horas": ["18:00", "19:00"],
        "personas": 12,
        "observaciones": "Entrenamiento interfacultades",
        "estado": "confirmada",
        "monto": 80,
        "creadaEn": "2026-11-06T10:00:00.000Z",
        "motivoCancelacion": null,
        "canceladaEn": null
      }
    ]
  }
}
```

---

## 3. Acciones del Slice `reservas`

| Acción | Payload | Efecto |
|--------|---------|--------|
| `agregarReserva` | `{ ambienteId, fecha, horas, personas, observaciones, tarifaPorHora, requiereAprobacion }` | Genera `id`, `codigo` URP, `creadaEn`, calcula monto y estado inicial (`confirmada` o `pendiente`), y lo inserta al inicio de `items` con Immer. |
| `cambiarEstado` | `{ id, estado }` | Actualiza el campo `estado` de la reserva identificada por `id`. |
| `cancelarReserva` | `{ id, motivo }` | Cambia el estado a `'cancelada'`, registra `motivoCancelacion` y `canceladaEn`. |
| `eliminarReserva` | `id` | Elimina permanentemente la reserva del arreglo `items`. |
| `reemplazarTodas` | `items[]` | Hidrata el estado del store con los datos cargados desde `AsyncStorage`. |

---

## 4. Selectores

* **`selectReservas`**: Retorna el arreglo completo de reservas (`state.reservas.items`).
* **`selectReservaPorId(id)`**: Retorna la reserva específica cuyo `id` coincide con el parámetro.
* **`selectReservasActivas`**: Selector derivado que filtra las reservas en estado `'confirmada'` o `'pendiente'`.
* **`selectHorasReservadasPorMi(ambienteId, fecha)`**: Selector derivado que calcula las horas bloqueadas para un ambiente y fecha dados.
* **`selectProximaReserva`**: Selector derivado que obtiene la reserva activa más próxima cronológicamente para mostrarla en el Inicio.
* **`selectEstadisticas`**: Selector derivado que calcula el total de reservas activas, historial, canceladas y horas totales reservadas (usado en Inicio, Perfil y badges).
