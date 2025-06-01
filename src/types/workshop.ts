
export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaRegistro: Date;
  ordenesAnteriores?: OrdenTrabajo[];
}

export interface Bicicleta {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  serial: string;
  color: string;
  tipo: 'montaña' | 'ruta' | 'urbana' | 'electrica' | 'infantil';
  año: number;
  observacionesIniciales?: string;
  fotos?: string[];
  historialReparaciones?: OrdenTrabajo[];
}

export interface RepuestoCatalogo {
  id: string;
  nombre: string;
  precio: number;
  categoria: 'frenos' | 'transmision' | 'suspension' | 'ruedas' | 'accesorios' | 'otros';
  descripcion?: string;
}

export interface RepuestoOrden {
  repuestoId: string;
  repuesto: RepuestoCatalogo;
  cantidad: number;
  precioUnitario: number;
}

export interface ServicioMano {
  id: string;
  descripcion: string;
  precio: number;
  tiempoEstimado?: number; // en minutos
}

export interface TareaReparacion {
  id: string;
  descripcion: string;
  completada: boolean;
  tecnicoAsignado?: string;
  fechaCompletada?: Date;
  observaciones?: string;
}

export interface FotoReparacion {
  id: string;
  url: string;
  tipo: 'antes' | 'durante' | 'despues';
  descripcion?: string;
  fecha: Date;
}

export interface NotificacionCliente {
  id: string;
  tipo: 'sms' | 'email' | 'whatsapp';
  mensaje: string;
  enviado: boolean;
  fechaEnvio?: Date;
}

export interface OrdenTrabajo {
  id: string;
  numero: string;
  cliente: Cliente;
  bicicleta: Bicicleta;
  fechaIngreso: Date;
  fechaEstimadaEntrega: Date;
  fechaEntregaReal?: Date;
  problemas: string[];
  diagnostico: string;
  observacionesIniciales: string;
  observacionesTecnico: string;
  repuestos: RepuestoOrden[];
  servicios: ServicioMano[];
  tareas: TareaReparacion[];
  fotos: FotoReparacion[];
  observaciones: string[];
  notificaciones: NotificacionCliente[];
  estado: 'recibida' | 'diagnostico' | 'esperando_repuestos' | 'en_reparacion' | 'control_calidad' | 'finalizada' | 'entregada';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  tecnicoAsignado?: string;
  costoTotal: number;
  adelanto: number;
  saldo: number;
  metodoPago?: string;
  firmaEntrega?: string;
  fechaFirma?: Date;
}

export interface Tecnico {
  id: string;
  nombre: string;
  especialidad: string[];
  activo: boolean;
}

// Interfaz para orden de entrega (reemplaza Factura)
export interface OrdenEntregaDocument {
  id: string;
  numero: string;
  ordenTrabajoId: string;
  cliente: Cliente;
  fechaEntrega: Date;
  tecnicoEntrega: string;
  trabajosRealizados: string[];
  repuestosUtilizados: RepuestoOrden[];
  observacionesEntrega: string;
  garantiaDias: number;
  proximoMantenimiento?: Date;
  firmaCliente?: string;
  firmaTecnico?: string;
}
