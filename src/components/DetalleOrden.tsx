import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Wrench, Package, DollarSign, FileText, Camera, CheckSquare } from 'lucide-react';
import { OrdenTrabajo } from '@/types/workshop';
import { obtenerColorEstado, obtenerTextoEstado, formatearPrecio } from '@/utils/workshop';
import TallerHeader from './TallerHeader';

interface DetalleOrdenProps {
  orden?: OrdenTrabajo | null;
}

const DetalleOrden = ({ orden: ordenProp }: DetalleOrdenProps) => {
  // Datos de ejemplo si no se proporciona una orden
  const [orden, setOrden] = useState<OrdenTrabajo>(ordenProp || {
    id: 'orden_1',
    numero: 'OT241201-001',
    cliente: {
      id: 'cliente_1',
      nombre: 'Juan Carlos Pérez',
      telefono: '3001234567',
      email: 'juan.perez@email.com',
      direccion: 'Calle 123 #45-67',
      fechaRegistro: new Date('2024-01-15')
    },
    bicicleta: {
      id: 'bici_1',
      clienteId: 'cliente_1',
      marca: 'Trek',
      modelo: 'X-Caliber 8',
      serial: 'TR2024001',
      color: 'Azul',
      tipo: 'montaña',
      año: 2023
    },
    fechaIngreso: new Date('2024-12-01'),
    fechaEstimadaEntrega: new Date('2024-12-05'),
    problemas: ['Cadena se sale', 'Frenos traseros no funcionan', 'Rueda delantera desalineada'],
    diagnostico: 'La cadena necesita tensión y el cassette está desgastado. Los frenos requieren cambio de pastillas. La rueda necesita centrado.',
    observacionesIniciales: 'Bicicleta recibida en buen estado general, sin rayones visibles.',
    observacionesTecnico: 'Se requiere ajuste completo de transmisión y frenos.',
    repuestos: [
      {
        repuestoId: 'rep_1',
        repuesto: {
          id: 'rep_1',
          nombre: 'Pastillas de freno Shimano',
          precio: 25000,
          categoria: 'frenos'
        },
        cantidad: 1,
        precioUnitario: 25000
      }
    ],
    servicios: [
      {
        id: 'serv_1',
        descripcion: 'Centrado de rueda',
        precio: 15000,
        tiempoEstimado: 30
      },
      {
        id: 'serv_2',
        descripcion: 'Ajuste de frenos',
        precio: 20000,
        tiempoEstimado: 45
      }
    ],
    tareas: [
      {
        id: 'tarea_1',
        descripcion: 'Revisar tensión de cadena',
        completada: true,
        tecnicoAsignado: 'Carlos García',
        fechaCompletada: new Date()
      },
      {
        id: 'tarea_2',
        descripcion: 'Cambiar pastillas de freno',
        completada: false,
        tecnicoAsignado: 'Carlos García'
      }
    ],
    fotos: [
      {
        id: 'foto_1',
        url: '/placeholder-bike-before.jpg',
        tipo: 'antes',
        descripcion: 'Estado inicial de la bicicleta',
        fecha: new Date()
      }
    ],
    observaciones: [
      'Bicicleta recibida en buen estado general',
      'Cliente reporta problemas desde hace 2 semanas',
      'Se inició reparación de frenos'
    ],
    notificaciones: [],
    estado: 'en_reparacion',
    prioridad: 'media',
    tecnicoAsignado: 'Carlos García',
    costoTotal: 60000,
    adelanto: 30000,
    saldo: 30000
  });

  const [nuevaObservacion, setNuevaObservacion] = useState('');

  const agregarObservacion = () => {
    if (nuevaObservacion.trim()) {
      setOrden({
        ...orden,
        observaciones: [...orden.observaciones, nuevaObservacion.trim()]
      });
      setNuevaObservacion('');
    }
  };

  const actualizarEstado = (nuevoEstado: OrdenTrabajo['estado']) => {
    setOrden({
      ...orden,
      estado: nuevoEstado
    });
  };

  const toggleTarea = (tareaId: string) => {
    setOrden({
      ...orden,
      tareas: orden.tareas.map(tarea =>
        tarea.id === tareaId
          ? { ...tarea, completada: !tarea.completada, fechaCompletada: !tarea.completada ? new Date() : undefined }
          : tarea
      )
    });
  };

  return (
    <div className="space-y-6">
      <TallerHeader 
        titulo={`Orden ${orden.numero}`}
        descripcion={`Estado: ${obtenerTextoEstado(orden.estado)} - ${orden.cliente.nombre}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información del Cliente y Bicicleta */}
        <div className="lg:col-span-2 space-y-6">
          {/* Datos del Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Cliente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Nombre</Label>
                  <p className="font-medium">{orden.cliente.nombre}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Teléfono</Label>
                  <p className="font-medium">{orden.cliente.telefono}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Email</Label>
                  <p className="font-medium">{orden.cliente.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Dirección</Label>
                  <p className="font-medium">{orden.cliente.direccion}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datos de la Bicicleta */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Información de la Bicicleta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Marca</Label>
                  <p className="font-medium">{orden.bicicleta.marca}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Modelo</Label>
                  <p className="font-medium">{orden.bicicleta.modelo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Serial</Label>
                  <p className="font-medium">{orden.bicicleta.serial}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Tipo</Label>
                  <p className="font-medium capitalize">{orden.bicicleta.tipo}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Color</Label>
                  <p className="font-medium">{orden.bicicleta.color}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Año</Label>
                  <p className="font-medium">{orden.bicicleta.año}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problemas y Diagnóstico */}
          <Card>
            <CardHeader>
              <CardTitle>Problemas y Diagnóstico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Problemas Reportados</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {orden.problemas.map((problema, index) => (
                    <Badge key={index} variant="outline">
                      {problema}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Diagnóstico Técnico</Label>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg">{orden.diagnostico}</p>
              </div>
            </CardContent>
          </Card>

          {/* Repuestos y Servicios */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Repuestos y Servicios
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orden.repuestos.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-2 block">Repuestos</Label>
                  <div className="space-y-2">
                    {orden.repuestos.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.repuesto.nombre}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
                        </div>
                        <p className="font-medium">{formatearPrecio(item.cantidad * item.precioUnitario)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {orden.servicios.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-600 mb-2 block">Servicios</Label>
                  <div className="space-y-2">
                    {orden.servicios.map((servicio, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{servicio.descripcion}</p>
                        <p className="font-medium">{formatearPrecio(servicio.precio)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tareas de Reparación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Lista de Tareas ({orden.tareas.filter(t => t.completada).length}/{orden.tareas.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {orden.tareas.map((tarea) => (
                <div key={tarea.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <input
                    type="checkbox"
                    checked={tarea.completada}
                    onChange={() => toggleTarea(tarea.id)}
                    className="h-4 w-4"
                  />
                  <div className="flex-1">
                    <p className={`font-medium ${tarea.completada ? 'line-through text-gray-500' : ''}`}>
                      {tarea.descripcion}
                    </p>
                    {tarea.tecnicoAsignado && (
                      <p className="text-sm text-gray-600">Asignado: {tarea.tecnicoAsignado}</p>
                    )}
                  </div>
                  {tarea.completada && tarea.fechaCompletada && (
                    <Badge variant="outline" className="text-green-600">
                      Completada
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Fotos de la Reparación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Fotos de la Reparación ({orden.fotos.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orden.fotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {orden.fotos.map((foto) => (
                    <div key={foto.id} className="space-y-2">
                      <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <Badge variant="outline">{foto.tipo}</Badge>
                        <p className="text-xs text-gray-600 mt-1">{foto.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Camera className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No hay fotos agregadas</p>
                  <Button variant="outline" className="mt-2">
                    Agregar Foto
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral - Estado y Observaciones */}
        <div className="space-y-6">
          {/* Estado y Fechas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Estado y Fechas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="estado">Estado Actual</Label>
                <Select value={orden.estado} onValueChange={actualizarEstado}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recibida">Recibida</SelectItem>
                    <SelectItem value="diagnostico">En Diagnóstico</SelectItem>
                    <SelectItem value="esperando_repuestos">Esperando Repuestos</SelectItem>
                    <SelectItem value="en_reparacion">En Reparación</SelectItem>
                    <SelectItem value="control_calidad">Control de Calidad</SelectItem>
                    <SelectItem value="finalizada">Finalizada</SelectItem>
                    <SelectItem value="entregada">Entregada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prioridad">Prioridad</Label>
                <Select value={orden.prioridad} onValueChange={(value: OrdenTrabajo['prioridad']) => 
                  setOrden({...orden, prioridad: value})
                }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Técnico Asignado</Label>
                <p className="font-medium">{orden.tecnicoAsignado || 'Sin asignar'}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Fecha de Ingreso</Label>
                <p className="font-medium">{orden.fechaIngreso.toLocaleDateString()}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Fecha Estimada de Entrega</Label>
                <p className="font-medium">{orden.fechaEstimadaEntrega.toLocaleDateString()}</p>
              </div>

              <Badge className={obtenerColorEstado(orden.estado)}>
                {obtenerTextoEstado(orden.estado)}
              </Badge>
            </CardContent>
          </Card>

          {/* Resumen de Costos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resumen de Costos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Costo Total:</span>
                <span className="font-bold text-green-600">{formatearPrecio(orden.costoTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Adelanto:</span>
                <span className="font-medium">{formatearPrecio(orden.adelanto || 0)}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-medium">Saldo:</span>
                <span className="font-bold text-orange-600">{formatearPrecio(orden.saldo)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Observaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Observaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {orden.observaciones.map((obs, index) => (
                  <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                    {obs}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Textarea
                  value={nuevaObservacion}
                  onChange={(e) => setNuevaObservacion(e.target.value)}
                  placeholder="Agregar nueva observación..."
                  rows={3}
                />
                <Button onClick={agregarObservacion} className="w-full">
                  Agregar Observación
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetalleOrden;
