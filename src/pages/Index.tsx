
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wrench, 
  Plus, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText,
  TrendingUp,
  Users,
  AlertCircle
} from 'lucide-react';
import NuevaOrden from '@/components/NuevaOrden';
import ListaOrdenes from '@/components/ListaOrdenes';
import DetalleOrden from '@/components/DetalleOrden';
import GenerarFactura from '@/components/GenerarFactura';
import { formatearPrecio } from '@/utils/workshop';

type VistaActual = 'dashboard' | 'nueva-orden' | 'lista-ordenes' | 'detalle-orden' | 'factura';

const Index = () => {
  const [vistaActual, setVistaActual] = useState<VistaActual>('dashboard');

  // Datos de ejemplo para el dashboard
  const estadisticas = {
    ordenesHoy: 3,
    enReparacion: 8,
    paraEntrega: 5,
    ventasHoy: 250000,
    ventasSemana: 1850000,
    clientesAtendidos: 42
  };

  const ordenesPendientes = [
    {
      numero: 'OT241201-001',
      cliente: 'Juan Carlos Pérez',
      estado: 'en_reparacion',
      diasRestantes: 2,
      valor: 85000
    },
    {
      numero: 'OT241201-002',
      cliente: 'María García',
      estado: 'finalizada',
      diasRestantes: 0,
      valor: 25000
    },
    {
      numero: 'OT241130-045',
      cliente: 'Carlos Rodríguez',
      estado: 'esperando_repuestos',
      diasRestantes: -1,
      valor: 150000
    }
  ];

  const renderVista = () => {
    switch (vistaActual) {
      case 'nueva-orden':
        return <NuevaOrden />;
      case 'lista-ordenes':
        return <ListaOrdenes />;
      case 'detalle-orden':
        return <DetalleOrden />;
      case 'factura':
        return <GenerarFactura />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header del Dashboard */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 px-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Wrench className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de Taller</h1>
              <p className="text-blue-100 mt-2">
                Gestión completa de reparaciones y mantenimiento
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={() => setVistaActual('nueva-orden')}
              className="bg-white text-blue-600 hover:bg-blue-50"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nueva Orden
            </Button>
          </div>
        </div>
      </div>

      {/* Menú de Navegación Rápida */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => setVistaActual('nueva-orden')}
        >
          <Plus className="h-6 w-6" />
          <span>Nueva Orden</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => setVistaActual('lista-ordenes')}
        >
          <FileText className="h-6 w-6" />
          <span>Ver Órdenes</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => setVistaActual('detalle-orden')}
        >
          <Wrench className="h-6 w-6" />
          <span>Seguimiento</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2"
          onClick={() => setVistaActual('factura')}
        >
          <DollarSign className="h-6 w-6" />
          <span>Facturación</span>
        </Button>
      </div>

      {/* Estadísticas del Día */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.ordenesHoy}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Reparación</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.enReparacion}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.paraEntrega} listas para entrega
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatearPrecio(estadisticas.ventasHoy)}</div>
            <p className="text-xs text-muted-foreground">
              +15% vs ayer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estadisticas.clientesAtendidos}</div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Órdenes Pendientes y Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Órdenes Recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Órdenes Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ordenesPendientes.map((orden, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{orden.numero}</span>
                    <Badge 
                      variant={orden.estado === 'finalizada' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {orden.estado.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{orden.cliente}</p>
                  <p className="text-sm font-medium text-green-600">
                    {formatearPrecio(orden.valor)}
                  </p>
                </div>
                <div className="text-right">
                  {orden.diasRestantes > 0 ? (
                    <span className="text-sm text-green-600">
                      {orden.diasRestantes} días
                    </span>
                  ) : orden.diasRestantes === 0 ? (
                    <span className="text-sm text-orange-600 font-medium">
                      Hoy
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 font-medium">
                      {Math.abs(orden.diasRestantes)} días tarde
                    </span>
                  )}
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setVistaActual('lista-ordenes')}
            >
              Ver Todas las Órdenes
            </Button>
          </CardContent>
        </Card>

        {/* Alertas y Resumen */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alertas y Resumen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">1 Orden Atrasada</span>
              </div>
              <p className="text-sm text-red-700">
                OT241130-045 - Carlos Rodríguez (1 día de retraso)
              </p>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">5 Para Entrega Hoy</span>
              </div>
              <p className="text-sm text-yellow-700">
                Revisa las órdenes finalizadas pendientes de entrega
              </p>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Ventas de la Semana</span>
              </div>
              <p className="text-sm text-green-700">
                {formatearPrecio(estadisticas.ventasSemana)} - Meta alcanzada al 92%
              </p>
            </div>

            <Button 
              className="w-full"
              onClick={() => setVistaActual('lista-ordenes')}
            >
              Gestionar Órdenes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Navegación Superior */}
        {vistaActual !== 'dashboard' && (
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setVistaActual('dashboard')}
              className="mb-4"
            >
              ← Volver al Dashboard
            </Button>
          </div>
        )}
        
        {renderVista()}
      </div>
    </div>
  );
};

export default Index;
