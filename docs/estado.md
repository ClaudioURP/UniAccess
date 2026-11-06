# Mapa de estado - UniAccess URP

## Clasificación

| Dato                 | Tipo    | Dónde vive             | Quién lo lee                                   | Quién lo modifica            |
|----------------------|---------|------------------------|------------------------------------------------|------------------------------|
| Texto del buscador   | Local   | `useState` en Explorar | Explorar                                       | Explorar                     |
| Filtro de categoría  | Local   | `useState` en Explorar | Explorar                                       | Explorar, Inicio             |
| Selección de horario | Local   | `useState` en Ambiente | Ambiente                                       | Ambiente                     |
| Usuario logueado     | Context | `SesionContext`        | Perfil, Inicio, Stack raíz                     | Login, Perfil (cerrar sesión)|
| Reservas             | Store   | slice `reservas`       | Inicio, Explorar, Mis Reservas, Perfil, Detalle | Nueva Reserva, Mis Reservas  |

## Forma del store

```json
{
  "reservas": {
    "items": [
      {
        "id": "res-1",
        "codigo": "URP-8F2K4",
        "ambienteId": "grass-1",
        "fecha": "2026-11-07",
        "horas": ["18:00", "19:00"],
        "personas": 14,
        "observaciones": "Entrenamiento de Ingeniería",
        "estado": "confirmada",
        "monto": 80,
        "creadaEn": "2026-11-06T10:00:00.000Z"
      }
    ]
  }
}
```

## Acciones del slice `reservas`

| Acción            | Payload                                        | Efecto                                                |
|-------------------|------------------------------------------------|-------------------------------------------------------|
| `agregarReserva`  | `{ ambienteId, fecha, horas, personas, ... }` | Agrega al inicio con id, código URP y fecha generados |
| `cambiarEstado`   | `{ id, estado }`                               | Cambia el estado de una reserva                       |
| `cancelarReserva` | `{ id, motivo }`                               | Marca la reserva como cancelada con motivo y fecha    |
| `eliminarReserva` | `id`                                           | Quita la reserva de la lista permanentemente          |
| `reemplazarTodas` | `items[]`                                      | Hidrata el store desde AsyncStorage al iniciar        |

## Selectores

* `selectReservas`: Lista completa de reservas en el store.
* `selectReservaPorId(id)`: Obtiene una reserva específica por su ID.
* `selectReservasActivas`: Filtra las reservas en estado pendiente o confirmada.
* `selectProximaReserva`: La reserva activa más próxima cronológicamente.
* `selectEstadisticas`: Conteo global de activas, historial, canceladas y horas totales.
