
import { OrdenTrabajo, RepuestoOrden, ServicioMano } from '@/types/workshop';

export const calcularCostoTotal = (repuestos: RepuestoOrden[], servicios: ServicioMano[]): number => {
  const costoRepuestos = repuestos.reduce((total, item) => total + (item.cantidad * item.precioUnitario), 0);
  const costoServicios = servicios.reduce((total, servicio) => total + servicio.precio, 0);
  return costoRepuestos + costoServicios;
};

export const formatearPrecio = (precio: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(precio);
};

export const generarNumeroOrden = (): string => {
  const fecha = new Date();
  const año = fecha.getFullYear().toString().slice(-2);
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const dia = fecha.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `OT${año}${mes}${dia}-${random}`;
};

export const obtenerColorEstado = (estado: OrdenTrabajo['estado']): string => {
  const colores = {
    'recibida': 'bg-blue-100 text-blue-800',
    'diagnostico': 'bg-yellow-100 text-yellow-800',
    'esperando_repuestos': 'bg-orange-100 text-orange-800',
    'en_reparacion': 'bg-purple-100 text-purple-800',
    'finalizada': 'bg-green-100 text-green-800',
    'entregada': 'bg-gray-100 text-gray-800'
  };
  return colores[estado];
};

export const obtenerTextoEstado = (estado: OrdenTrabajo['estado']): string => {
  const textos = {
    'recibida': 'Recibida',
    'diagnostico': 'En Diagnóstico',
    'esperando_repuestos': 'Esperando Repuestos',
    'en_reparacion': 'En Reparación',
    'finalizada': 'Finalizada',
    'entregada': 'Entregada'
  };
  return textos[estado];
};
