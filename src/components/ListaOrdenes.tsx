
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Tag, Wrench } from 'lucide-react';
import { OrdenTrabajo } from '@/types/workshop';
import { formatearPrecio, obtenerColorEstado, obtenerTextoEstado } from '@/utils/workshop';
import TallerHeader from './TallerHeader';

// Datos de ejemplo
const ordenesEjemplo: OrdenTrabajo[] = [
  {
    id: '1',
    numero: 'OT241201-001',
    cliente: {
      id: '1',
      nombre: 'Juan Carlos Pérez',
      telefono: '3001234567',
      email: 'juan@email.com'
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
    problemas: ['Frenos chirriantes', 'Cambios desajustados'],
    diagnostico: 'Requiere cambio de pastillas de freno y ajuste de cable de cambios',
    repuestos: [],
    servicios: [],
    observaciones: ['Cliente solicita revisión completa'],
    estado: 'en_reparacion',
    costoTotal: 85000,
    adelanto: 40000,
    saldo: 45000
  },
  {
    id: '2',
    numero: 'OT241201-002',
    cliente: {
      id: '2',
      nombre: 'María García',
      telefono: '3009876543',
      email: 'maria@email.com'
    },
    bicicleta: {
      id: '2',
      clienteId: '2',
      marca: 'Giant',
      modelo: 'Escape 3',
      serial: 'GT2024002',
      color: 'Negro',
      tipo: 'urbana'
    },
    fechaIngreso: new Date('2024-12-01'),
    fechaEstimadaEntrega: new Date('2024-12-03'),
    problemas: ['Llanta pinchada', 'Cadena suelta'],
    diagnostico: 'Reparación de llanta y tensión de cadena',
    repuestos: [],
    servicios: [],
    observaciones: [],
    estado: 'finalizada',
    costoTotal: 25000,
    adelanto: 0,
    saldo: 25000
  }
];

const ListaOrdenes = () => {
  const [ordenes, setOrdenes] = useState<OrdenTrabajo[]>(ordenesEjemplo);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState('');

  const ordenesFiltradas = ordenes.filter(orden => {
    const cumpleBusqueda = 
      orden.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      orden.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      orden.bicicleta.marca.toLowerCase().includes(busqueda.toLowerCase());
    
    const cumpleEstado = filtroEstado === 'todas' || orden.estado === filtroEstado;
    
    return cumpleBusqueda && cumpleEstado;
  });

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const diasRestantes = (fechaEntrega: Date) => {
    const hoy = new Date();
    const diferencia = fechaEntrega.getTime() - hoy.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    return dias;
  };

  return (
    <div className="space-y-6">
      <TallerHeader 
        titulo="Órdenes de Trabajo"
        descripcion="Gestiona todas las reparaciones en curso"
      />

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por número, cliente o marca..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las órdenes</SelectItem>
            <SelectItem value="recibida">Recibidas</SelectItem>
            <SelectItem value="diagnostico">En Diagnóstico</SelectItem>
            <SelectItem value="esperando_repuestos">Esperando Repuestos</SelectItem>
            <SelectItem value="en_reparacion">En Reparación</SelectItem>
            <SelectItem value="finalizada">Finalizadas</SelectItem>
            <SelectItem value="entregada">Entregadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Órdenes */}
      <div className="grid gap-4">
        {ordenesFiltradas.map((orden) => (
          <Card key={orden.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Wrench className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{orden.numero}</CardTitle>
                    <p className="text-sm text-gray-600">{orden.cliente.nombre}</p>
                  </div>
                </div>
                <Badge className={obtenerColorEstado(orden.estado)}>
                  {obtenerTextoEstado(orden.estado)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Información de la Bicicleta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Bicicleta:</span>
                  <p className="font-medium">{orden.bicicleta.marca} {orden.bicicleta.modelo}</p>
                </div>
                <div>
                  <span className="text-gray-500">Serial:</span>
                  <p className="font-medium">{orden.bicicleta.serial}</p>
                </div>
                <div>
                  <span className="text-gray-500">Tipo:</span>
                  <p className="font-medium capitalize">{orden.bicicleta.tipo}</p>
                </div>
                <div>
                  <span className="text-gray-500">Color:</span>
                  <p className="font-medium">{orden.bicicleta.color}</p>
                </div>
              </div>

              {/* Fechas y Costos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-gray-500">Ingreso:</span>
                    <p className="font-medium">{formatearFecha(orden.fechaIngreso)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div>
                    <span className="text-gray-500">Entrega:</span>
                    <p className="font-medium">{formatearFecha(orden.fechaEstimadaEntrega)}</p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Costo Total:</span>
                  <p className="font-medium text-green-600">{formatearPrecio(orden.costoTotal)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Saldo:</span>
                  <p className="font-medium text-orange-600">{formatearPrecio(orden.saldo)}</p>
                </div>
              </div>

              {/* Problemas */}
              <div>
                <span className="text-gray-500 text-sm">Problemas:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {orden.problemas.map((problema, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {problema}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Indicador de Tiempo */}
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-sm">
                  {diasRestantes(orden.fechaEstimadaEntrega) > 0 ? (
                    <span className="text-green-600">
                      {diasRestantes(orden.fechaEstimadaEntrega)} días restantes
                    </span>
                  ) : diasRestantes(orden.fechaEstimadaEntrega) === 0 ? (
                    <span className="text-orange-600 font-medium">Entrega hoy</span>
                  ) : (
                    <span className="text-red-600 font-medium">
                      {Math.abs(diasRestantes(orden.fechaEstimadaEntrega))} días de retraso
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Detalles
                  </Button>
                  <Button size="sm">
                    Actualizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {ordenesFiltradas.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron órdenes de trabajo</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ListaOrdenes;
