
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Tag, Wrench, FileText, DollarSign } from 'lucide-react';
import { OrdenTrabajo } from '@/types/workshop';
import { formatearPrecio, obtenerColorEstado, obtenerTextoEstado } from '@/utils/workshop';
import TallerHeader from './TallerHeader';

interface DetalleOrdenProps {
  orden?: OrdenTrabajo;
}

const DetalleOrden = ({ orden }: DetalleOrdenProps) => {
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
      tipo: 'montaña',
      año: 2023
    },
    fechaIngreso: new Date('2024-12-01'),
    fechaEstimadaEntrega: new Date('2024-12-05'),
    problemas: ['Frenos chirriantes', 'Cambios desajustados', 'Ruido en pedalier'],
    diagnostico: 'La bicicleta requiere cambio de pastillas de freno, ajuste completo de cambios y limpieza del pedalier. Se detectó desgaste en la cadena que podría requerir reemplazo pronto.',
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
        descripcion: 'Limpieza y lubricación',
        precio: 12000
      }
    ],
    observaciones: [
      'Cliente solicita revisión completa - 01/12/2024',
      'Iniciado diagnóstico - pastillas muy desgastadas - 01/12/2024',
      'Esperando aprobación del cliente para repuestos adicionales - 02/12/2024',
      'Cliente aprueba todos los trabajos - 02/12/2024'
    ],
    estado: 'en_reparacion',
    costoTotal: 88000,
    adelanto: 40000,
    saldo: 48000
  };

  const ordenActual = orden || ordenEjemplo;
  const [estadoLocal, setEstadoLocal] = useState(ordenActual.estado);
  const [nuevaObservacion, setNuevaObservacion] = useState('');
  const [observaciones, setObservaciones] = useState(ordenActual.observaciones);

  const agregarObservacion = () => {
    if (nuevaObservacion.trim()) {
      const fecha = new Date().toLocaleDateString('es-CO');
      const observacionConFecha = `${nuevaObservacion.trim()} - ${fecha}`;
      setObservaciones([...observaciones, observacionConFecha]);
      setNuevaObservacion('');
    }
  };

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calcularSubtotales = () => {
    const costoRepuestos = ordenActual.repuestos.reduce((total, item) => 
      total + (item.cantidad * item.precioUnitario), 0);
    const costoServicios = ordenActual.servicios.reduce((total, servicio) => 
      total + servicio.precio, 0);
    return { costoRepuestos, costoServicios };
  };

  const { costoRepuestos, costoServicios } = calcularSubtotales();

  return (
    <div className="space-y-6">
      <TallerHeader 
        titulo={`Orden ${ordenActual.numero}`}
        descripcion={`Cliente: ${ordenActual.cliente.nombre}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Estado y Fechas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Estado de la Orden</span>
                <Badge className={obtenerColorEstado(estadoLocal)}>
                  {obtenerTextoEstado(estadoLocal)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Cambiar Estado</Label>
                  <Select value={estadoLocal} onValueChange={setEstadoLocal}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recibida">Recibida</SelectItem>
                      <SelectItem value="diagnostico">En Diagnóstico</SelectItem>
                      <SelectItem value="esperando_repuestos">Esperando Repuestos</SelectItem>
                      <SelectItem value="en_reparacion">En Reparación</SelectItem>
                      <SelectItem value="finalizada">Finalizada</SelectItem>
                      <SelectItem value="entregada">Entregada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Ingreso:</span>
                    <span className="font-medium">{formatearFecha(ordenActual.fechaIngreso)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Entrega estimada:</span>
                    <span className="font-medium">{formatearFecha(ordenActual.fechaEstimadaEntrega)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problemas y Diagnóstico */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Diagnóstico Técnico
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Problemas Reportados:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ordenActual.problemas.map((problema, index) => (
                    <Badge key={index} variant="outline">
                      {problema}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Diagnóstico:</Label>
                <p className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                  {ordenActual.diagnostico}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Repuestos y Servicios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Detalle de Trabajos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Repuestos */}
              <div>
                <h4 className="font-medium mb-3">Repuestos</h4>
                <div className="space-y-2">
                  {ordenActual.repuestos.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{item.repuesto.nombre}</p>
                        <p className="text-sm text-gray-600">
                          Cantidad: {item.cantidad} × {formatearPrecio(item.precioUnitario)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatearPrecio(item.cantidad * item.precioUnitario)}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium">Subtotal Repuestos:</span>
                    <span className="font-medium">{formatearPrecio(costoRepuestos)}</span>
                  </div>
                </div>
              </div>

              {/* Servicios */}
              <div>
                <h4 className="font-medium mb-3">Servicios y Mano de Obra</h4>
                <div className="space-y-2">
                  {ordenActual.servicios.map((servicio, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <p className="font-medium">{servicio.descripcion}</p>
                      <p className="font-medium">{formatearPrecio(servicio.precio)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium">Subtotal Servicios:</span>
                    <span className="font-medium">{formatearPrecio(costoServicios)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardHeader>
              <CardTitle>Observaciones del Proceso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {observaciones.map((observacion, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-md border-l-4 border-blue-400">
                    <p className="text-sm">{observacion}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Textarea
                  value={nuevaObservacion}
                  onChange={(e) => setNuevaObservacion(e.target.value)}
                  placeholder="Agregar nueva observación..."
                  rows={2}
                />
                <Button onClick={agregarObservacion}>
                  Agregar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Información del Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-gray-500">NOMBRE</Label>
                <p className="font-medium">{ordenActual.cliente.nombre}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">TELÉFONO</Label>
                <p className="font-medium">{ordenActual.cliente.telefono}</p>
              </div>
              {ordenActual.cliente.email && (
                <div>
                  <Label className="text-xs text-gray-500">EMAIL</Label>
                  <p className="font-medium">{ordenActual.cliente.email}</p>
                </div>
              )}
              {ordenActual.cliente.direccion && (
                <div>
                  <Label className="text-xs text-gray-500">DIRECCIÓN</Label>
                  <p className="font-medium text-sm">{ordenActual.cliente.direccion}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información de la Bicicleta */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bicicleta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-gray-500">MARCA Y MODELO</Label>
                <p className="font-medium">{ordenActual.bicicleta.marca} {ordenActual.bicicleta.modelo}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">SERIAL</Label>
                <p className="font-medium font-mono">{ordenActual.bicicleta.serial}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">TIPO</Label>
                <p className="font-medium capitalize">{ordenActual.bicicleta.tipo}</p>
              </div>
              <div>
                <Label className="text-xs text-gray-500">COLOR</Label>
                <p className="font-medium">{ordenActual.bicicleta.color}</p>
              </div>
              {ordenActual.bicicleta.año && (
                <div>
                  <Label className="text-xs text-gray-500">AÑO</Label>
                  <p className="font-medium">{ordenActual.bicicleta.año}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumen Financiero */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resumen Financiero
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Repuestos:</span>
                  <span>{formatearPrecio(costoRepuestos)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Servicios:</span>
                  <span>{formatearPrecio(costoServicios)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">{formatearPrecio(ordenActual.costoTotal)}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Adelanto:</span>
                  <span>{formatearPrecio(ordenActual.adelanto || 0)}</span>
                </div>
                <div className="flex justify-between font-medium border-t pt-2">
                  <span>Saldo:</span>
                  <span className="text-orange-600">{formatearPrecio(ordenActual.saldo)}</span>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Generar Factura
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          Imprimir Orden
        </Button>
        <Button>
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
};

export default DetalleOrden;
