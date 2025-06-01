
export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
  direccion?: string;
}

export interface Bicicleta {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  serial: string;
  color: string;
  tipo: 'montaña' | 'ruta' | 'urbana' | 'bmx' | 'electrica' | 'otros';
  año?: number;
}

export interface Repuesto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
}

export interface RepuestoOrden {
  repuestoId: string;
  repuesto: Repuesto;
  cantidad: number;
  precioUnitario: number;
}

export interface ServicioMano {
  id: string;
  descripcion: string;
  precio: number;
}

export interface OrdenTrabajo {
  id: string;
  numero: string;
  cliente: Cliente;
  bicicleta: Bicicleta;
  fechaIngreso: Date;
  fechaEstimadaEntrega: Date;
  fechaEntrega?: Date;
  problemas: string[];
  diagnostico: string;
  repuestos: RepuestoOrden[];
  servicios: ServicioMano[];
  observaciones: string[];
  estado: 'recibida' | 'diagnostico' | 'esperando_repuestos' | 'en_reparacion' | 'finalizada' | 'entregada';
  costoTotal: number;
  adelanto?: number;
  saldo: number;
}

export interface Factura {
  id: string;
  numero: string;
  ordenTrabajoId: string;
  cliente: Cliente;
  fecha: Date;
  items: {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    total: number;
  }[];
  subtotal: number;
  iva: number;
  total: number;
}
