// src/data/usuario.js
// Perfil del estudiante de la Universidad Ricardo Palma que usa UniAccess.
// En una versión productiva estos datos provendrían del directorio académico URP.

export const USUARIO_DEMO = {
  codigo: '2022101234',
  contrasena: 'urp2026',
  nombre: 'María Fernanda Quispe Rojas',
  iniciales: 'MQ',
  escuela: 'Ingeniería Industrial',
  facultad: 'Facultad de Ingeniería',
  ciclo: 'VIII ciclo',
  correo: 'maria.quispe@urp.edu.pe',
  carnetVigente: true,
};

export const REGLAMENTO_CESPAR = [
  'Presenta tu carnet universitario o el código QR de la reserva al ingresar al ambiente.',
  'Llega con 10 minutos de anticipación; la tolerancia máxima de ingreso es de 15 minutos.',
  'Solo pueden reservar estudiantes matriculados en el semestre vigente.',
  'Cada estudiante puede mantener hasta 3 reservas activas simultáneamente.',
  'Cancela con al menos 4 horas de anticipación para evitar suspensiones.',
  'El uso de chimpunes es obligatorio en las canchas de grass sintético.',
];

export const HORARIO_ATENCION_CESPAR = [
  { dia: 'Lunes a viernes', horario: '07:00 - 22:00' },
  { dia: 'Sábados', horario: '07:00 - 18:00' },
  { dia: 'Domingos y feriados', horario: '08:00 - 14:00' },
];
