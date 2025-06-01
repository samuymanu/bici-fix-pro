
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Printer, Download } from 'lucide-react';
import { OrdenTrabajo, Factura } from '@/types/workshop';
import { formatearPrecio } from '@/utils/workshop';
import TallerHeader from './TallerHeader';

interface GenerarFacturaProps {
  orden?: OrdenTrabajo;
}

const GenerarFactura = ({ orden }: GenerarFacturaProps) => {
  // Datos de ejemplo si no se proporciona una orden
  const ordenEjemplo: OrdenTrabajo = {
    id: '1',
    numero: 'OT241201-001',
    cliente: {
      id: '1',
      nombre: 'Juan Carlos Pérez',
      telefono: '3001234567',
      email: 'juan@email.com',
      direccion: 'Calle 123 #45-67, Bogotá'
    },
    bicicleta: {
      id: '1',
      clienteId: '1',
      marca: 'Trek',
      modelo: 'X-Caliber 8',
      serial: 'TK2024001',
      color: 'Azul',
      tipo: 'montaña'
    },
    fechaIngreso: new Date('2024-12-01'),
    fechaEstimadaEntrega: new Date('2024-12-05'),
    fechaEntrega: new Date('2024-12-05'),
    problemas: ['Frenos chirriantes', 'Cambios desajustados'],
    diagnostico: 'Reparación completa de sistema de frenos y transmisión',
    repuestos: [
      {
        repuestoId: '1',
        repuesto: {
          id: '1',
          nombre: 'Pastillas de freno Shimano',
          precio: 25000,
          categoria: 'Frenos',
          stock: 10
        },
        cantidad: 2,
        precioUnitario: 25000
      },
      {
        repuestoId: '2',
        repuesto: {
          id: '2',
          nombre: 'Cable de cambios',
          precio: 8000,
          categoria: 'Transmisión',
          stock: 15
        },
        cantidad: 1,
        precioUnitario: 8000
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
      },
      {
        id: '3',
        descripcion: 'Limpieza y lubricación general',
        precio: 12000
      }
    ],
    observaciones: [],
    estado: 'entregada',
    costoTotal: 88000,
    adelanto: 40000,
    saldo: 48000
  };

  const ordenActual = orden || ordenEjemplo;
  const [numeroFactura, setNumeroFactura] = useState(`FAC-${Date.now()}`);
  const [porcentajeIva, setPorcentajeIva] = useState(19);

  const generarItemsFactura = () => {
    const items = [];
    
    // Agregar repuestos
    ordenActual.repuestos.forEach(repuesto => {
      items.push({
        descripcion: repuesto.repuesto.nombre,
        cantidad: repuesto.cantidad,
        precioUnitario: repuesto.precioUnitario,
        total: repuesto.cantidad * repuesto.precioUnitario
      });
    });

    // Agregar servicios
    ordenActual.servicios.forEach(servicio => {
      items.push({
        descripcion: servicio.descripcion,
        cantidad: 1,
        precioUnitario: servicio.precio,
        total: servicio.precio
      });
    });

    return items;
  };

  const items = generarItemsFactura();
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const iva = (subtotal * porcentajeIva) / 100;
  const total = subtotal + iva;

  const factura: Factura = {
    id: `factura_${Date.now()}`,
    numero: numeroFactura,
    ordenTrabajoId: ordenActual.id,
    cliente: ordenActual.cliente,
    fecha: new Date(),
    items,
    subtotal,
    iva,
    total
  };

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const imprimirFactura = () => {
    window.print();
  };

  const descargarFactura = () => {
    alert('Función de descarga no implementada en esta demo');
  };

  const confirmarFactura = () => {
    console.log('Factura generada:', factura);
    alert('Factura generada exitosamente!');
  };

  return (
    <div className="space-y-6">
      <div className="no-print">
        <TallerHeader 
          titulo="Generar Factura"
          descripcion={`Orden de trabajo: ${ordenActual.numero}`}
        />
      </div>

      {/* Configuración de Factura - Solo visible en pantalla */}
      <Card className="no-print">
        <CardHeader>
          <CardTitle>Configuración de Factura</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="numeroFactura">Número de Factura</Label>
            <Input
              id="numeroFactura"
              value={numeroFactura}
              onChange={(e) => setNumeroFactura(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="iva">IVA (%)</Label>
            <Input
              id="iva"
              type="number"
              value={porcentajeIva}
              onChange={(e) => setPorcentajeIva(parseFloat(e.target.value) || 0)}
              min="0"
              max="100"
            />
          </div>
        </CardContent>
      </Card>

      {/* Factura - Diseño para imprimir */}
      <Card className="factura-impresion">
        <CardContent className="p-8">
          {/* Encabezado de la Empresa */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Taller de Bicicletas BikeShop</h1>
            <p className="text-gray-600">Reparación y Mantenimiento de Bicicletas</p>
            <p className="text-sm text-gray-500">
              Carrera 15 #123-45, Bogotá | Tel: 601-234-5678 | email@bikeshop.com
            </p>
          </div>

          <Separator className="my-6" />

          {/* Información de la Factura */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Información del Cliente</h3>
              <div className="space-y-2">
                <p><strong>Nombre:</strong> {ordenActual.cliente.nombre}</p>
                <p><strong>Teléfono:</strong> {ordenActual.cliente.telefono}</p>
                {ordenActual.cliente.email && (
                  <p><strong>Email:</strong> {ordenActual.cliente.email}</p>
                )}
                {ordenActual.cliente.direccion && (
                  <p><strong>Dirección:</strong> {ordenActual.cliente.direccion}</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Datos de la Factura</h3>
              <div className="space-y-2">
                <p><strong>Factura N°:</strong> {numeroFactura}</p>
                <p><strong>Fecha:</strong> {formatearFecha(factura.fecha)}</p>
                <p><strong>Orden de Trabajo:</strong> {ordenActual.numero}</p>
                <Badge className="bg-green-100 text-green-800">
                  Trabajo Completado
                </Badge>
              </div>
            </div>
          </div>

          {/* Información de la Bicicleta */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Bicicleta Reparada</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <strong>Marca:</strong> {ordenActual.bicicleta.marca}
                </div>
                <div>
                  <strong>Modelo:</strong> {ordenActual.bicicleta.modelo}
                </div>
                <div>
                  <strong>Serial:</strong> {ordenActual.bicicleta.serial}
                </div>
                <div>
                  <strong>Color:</strong> {ordenActual.bicicleta.color}
                </div>
              </div>
            </div>
          </div>

          {/* Detalle de Trabajos */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Detalle de Trabajos Realizados</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Cant.</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Precio Unit.</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 px-4 py-2">{item.descripcion}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item.cantidad}</td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {formatearPrecio(item.precioUnitario)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {formatearPrecio(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totales */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-1/2">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatearPrecio(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA ({porcentajeIva}%):</span>
                  <span>{formatearPrecio(iva)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-green-600">{formatearPrecio(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Información de Pagos */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Estado de Pagos</h3>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <strong>Total Facturado:</strong>
                  <p className="text-lg text-green-600">{formatearPrecio(total)}</p>
                </div>
                <div>
                  <strong>Adelanto Recibido:</strong>
                  <p className="text-lg">{formatearPrecio(ordenActual.adelanto || 0)}</p>
                </div>
                <div>
                  <strong>Saldo a Pagar:</strong>
                  <p className="text-lg text-orange-600">
                    {formatearPrecio(total - (ordenActual.adelanto || 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fechas de Servicio */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-4">Fechas del Servicio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Fecha de Ingreso:</strong> {formatearFecha(ordenActual.fechaIngreso)}
              </div>
              <div>
                <strong>Fecha de Entrega:</strong> {formatearFecha(ordenActual.fechaEntrega || ordenActual.fechaEstimadaEntrega)}
              </div>
            </div>
          </div>

          {/* Garantía y Términos */}
          <Separator className="my-6" />
          <div className="text-center text-sm text-gray-600">
            <p className="font-medium mb-2">GARANTÍA Y TÉRMINOS DE SERVICIO</p>
            <p>Los trabajos realizados tienen garantía de 30 días sobre mano de obra.</p>
            <p>Los repuestos tienen la garantía del fabricante.</p>
            <p className="mt-4">¡Gracias por confiar en nosotros!</p>
          </div>
        </CardContent>
      </Card>

      {/* Botones de Acción - Solo visible en pantalla */}
      <div className="flex justify-end gap-4 no-print">
        <Button variant="outline" onClick={descargarFactura}>
          <Download className="h-4 w-4 mr-2" />
          Descargar PDF
        </Button>
        <Button variant="outline" onClick={imprimirFactura}>
          <Printer className="h-4 w-4 mr-2" />
          Imprimir
        </Button>
        <Button onClick={confirmarFactura} className="bg-green-600 hover:bg-green-700">
          <FileText className="h-4 w-4 mr-2" />
          Confirmar Factura
        </Button>
      </div>
    </div>
  );
};

export default GenerarFactura;
