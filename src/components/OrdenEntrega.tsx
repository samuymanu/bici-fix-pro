
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Printer, Download, CheckCircle, AlertTriangle } from 'lucide-react';
import { OrdenTrabajo } from '@/types/workshop';
import { formatearPrecio } from '@/utils/workshop';
import TallerHeader from './TallerHeader';

interface OrdenEntregaProps {
  orden?: OrdenTrabajo;
}

const OrdenEntrega = ({ orden }: OrdenEntregaProps) => {
  const ordenEjemplo: OrdenTrabajo = {
    id: '1',
    numero: 'OT241201-001',
    cliente: {
      id: '1',
      nombre: 'Juan Carlos Pérez',
      telefono: '3001234567',
      email: 'juan@email.com',
      direccion: 'Calle 123 #45-67, Bogotá',
      fechaRegistro: new Date('2024-01-01')
    },
    bicicleta: {
      id: '1',
      clienteId: '1',
      marca: 'Trek',
      modelo: 'X-Caliber 8',
      serial: 'TK2024001',
      color: 'Azul',
      tipo: 'montaña',
      año: 2023
    },
    fechaIngreso: new Date('2024-12-01'),
    fechaEstimadaEntrega: new Date('2024-12-05'),
    fechaEntregaReal: new Date('2024-12-05'),
    problemas: ['Frenos chirriantes', 'Cambios desajustados'],
    diagnostico: 'Reparación completa de sistema de frenos y transmisión',
    observacionesIniciales: 'Bicicleta en buen estado general',
    observacionesTecnico: 'Trabajo completado satisfactoriamente',
    repuestos: [
      {
        repuestoId: '1',
        repuesto: {
          id: '1',
          nombre: 'Pastillas de freno Shimano',
          precio: 25000,
          categoria: 'frenos'
        },
        cantidad: 2,
        precioUnitario: 25000
      }
    ],
    servicios: [
      {
        id: '1',
        descripcion: 'Ajuste completo de frenos',
        precio: 20000
      },
      {
        id: '2',
        descripcion: 'Ajuste de cambios',
        precio: 15000
      }
    ],
    tareas: [],
    fotos: [],
    observaciones: [],
    notificaciones: [],
    estado: 'finalizada',
    prioridad: 'media',
    costoTotal: 88000,
    adelanto: 40000,
    saldo: 48000,
    tecnicoAsignado: 'Carlos García'
  };

  const ordenActual = orden || ordenEjemplo;
  const [numeroOrden, setNumeroOrden] = useState(`ENT-${Date.now()}`);

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const imprimirOrden = () => {
    window.print();
  };

  const descargarOrden = () => {
    alert('Descarga de PDF implementada en versión completa');
  };

  const confirmarEntrega = () => {
    console.log('Orden de entrega confirmada:', numeroOrden);
    alert('¡Bicicleta lista para entrega!');
  };

  return (
    <div className="space-y-6">
      <div className="no-print">
        <TallerHeader 
          titulo="Orden de Entrega"
          descripcion={`Trabajo completado - ${ordenActual.numero}`}
        />
      </div>

      <Card className="no-print">
        <CardHeader>
          <CardTitle>Configuración de Entrega</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="numeroOrden">Número de Orden de Entrega</Label>
            <Input
              id="numeroOrden"
              value={numeroOrden}
              onChange={(e) => setNumeroOrden(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-600 font-medium">Trabajo Completado</span>
          </div>
        </CardContent>
      </Card>

      <Card className="orden-entrega-impresion">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Taller de Bicicletas BikeShop</h1>
            <p className="text-gray-600">ORDEN DE ENTREGA</p>
            <p className="text-sm text-gray-500">
              Carrera 15 #123-45, Bogotá | Tel: 601-234-5678
            </p>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Cliente</h3>
              <div className="space-y-2">
                <p><strong>Nombre:</strong> {ordenActual.cliente.nombre}</p>
                <p><strong>Teléfono:</strong> {ordenActual.cliente.telefono}</p>
                <p><strong>Email:</strong> {ordenActual.cliente.email}</p>
                <p><strong>Dirección:</strong> {ordenActual.cliente.direccion}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Información de Entrega</h3>
              <div className="space-y-2">
                <p><strong>Orden N°:</strong> {numeroOrden}</p>
                <p><strong>Fecha de Entrega:</strong> {formatearFecha(new Date())}</p>
                <p><strong>Trabajo N°:</strong> {ordenActual.numero}</p>
                <p><strong>Técnico:</strong> {ordenActual.tecnicoAsignado}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Bicicleta Entregada</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><strong>Marca:</strong> {ordenActual.bicicleta.marca}</div>
                <div><strong>Modelo:</strong> {ordenActual.bicicleta.modelo}</div>
                <div><strong>Serial:</strong> {ordenActual.bicicleta.serial}</div>
                <div><strong>Color:</strong> {ordenActual.bicicleta.color}</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Trabajos Realizados</h3>
            <div className="space-y-2">
              {ordenActual.servicios.map((servicio, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{servicio.descripcion}</span>
                  <span className="font-medium">{formatearPrecio(servicio.precio)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Repuestos Utilizados</h3>
            <div className="space-y-2">
              {ordenActual.repuestos.map((repuesto, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>{repuesto.repuesto.nombre} (x{repuesto.cantidad})</span>
                  <span className="font-medium">{formatearPrecio(repuesto.cantidad * repuesto.precioUnitario)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Garantía y Recomendaciones
            </h3>
            <div className="space-y-2 text-sm">
              <p>• <strong>Garantía:</strong> 30 días en mano de obra, repuestos según fabricante</p>
              <p>• <strong>Próximo mantenimiento:</strong> Recomendado en 6 meses</p>
              <p>• <strong>Recomendaciones:</strong> Lubricar cadena cada 200km, revisar presión de llantas semanalmente</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Resumen Económico</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg">
                <span>Total del Trabajo:</span>
                <span className="font-bold text-green-600">{formatearPrecio(ordenActual.costoTotal)}</span>
              </div>
            </div>
          </div>

          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <p><strong>Firma del Cliente:</strong></p>
              <div className="border-b border-gray-300 mt-8 mb-2"></div>
              <p className="text-center text-gray-500">Firma y Cédula</p>
            </div>
            <div>
              <p><strong>Firma del Técnico:</strong></p>
              <div className="border-b border-gray-300 mt-8 mb-2"></div>
              <p className="text-center text-gray-500">{ordenActual.tecnicoAsignado}</p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-8">
            <p>¡Gracias por confiar en BikeShop! - www.bikeshop.com</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4 no-print">
        <Button variant="outline" onClick={descargarOrden}>
          <Download className="h-4 w-4 mr-2" />
          Descargar PDF
        </Button>
        <Button variant="outline" onClick={imprimirOrden}>
          <Printer className="h-4 w-4 mr-2" />
          Imprimir
        </Button>
        <Button onClick={confirmarEntrega} className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirmar Entrega
        </Button>
      </div>
    </div>
  );
};

export default OrdenEntrega;
