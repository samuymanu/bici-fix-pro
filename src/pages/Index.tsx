import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useElectron } from '@/hooks/useElectron';
import { Wrench, Plus, Calendar, Clock, DollarSign, FileText,
  TrendingUp, Users, AlertCircle, Kanban, Bell, Settings } from 'lucide-react';
import NuevaOrden from '@/components/NuevaOrden';
import ListaOrdenes from '@/components/ListaOrdenes';
import DetalleOrden from '@/components/DetalleOrden';
import OrdenEntrega from '@/components/OrdenEntrega';
import KanbanTaller from '@/components/KanbanTaller';
import GestionTecnicos from '@/components/GestionTecnicos';
import NotificacionesAutomaticas from '@/components/NotificacionesAutomaticas';
import { formatearPrecio } from '@/utils/workshop';
import { OrdenTrabajo } from '@/types/workshop';

type VistaActual = 'dashboard' | 'kanban' | 'nueva-orden' | 'lista-ordenes' | 'detalle-orden' | 'orden-entrega' | 'tecnicos' | 'notificaciones';

const Index = () => {
  const [vistaActual, setVistaActual] = useState<VistaActual>('dashboard');
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<OrdenTrabajo | null>(null);
  const { toast } = useToast();
  const { 
    isElectron, 
    saveFile, 
    readFile, 
    setupNavigationListener, 
    setupDataExportListener,
    setupDataImportListener 
  } = useElectron();

  // Estadísticas del taller (sin ventas)
  const estadisticas = {
    ordenesHoy: 3,
    enReparacion: 8,
    paraEntrega: 5,
    completadasHoy: 2,
    completadasSemana: 24,
    clientesAtendidos: 42,
    urgentes: 2,
    atrasadas: 1,
    tiempoPromedioReparacion: 2.5,
    satisfaccionClientes: 4.7
  };

  // Órdenes de ejemplo para el Kanban
  const ordenesEjemplo: OrdenTrabajo[] = [
    {
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
      problemas: ['Cadena se sale', 'Frenos traseros no funcionan'],
      diagnostico: 'La cadena necesita tensión y el cassette está desgastado.',
      observacionesIniciales: 'Bicicleta en buen estado general, solo problemas mecánicos',
      observacionesTecnico: 'Se requiere ajuste completo de transmisión',
      repuestos: [],
      servicios: [],
      tareas: [],
      fotos: [],
      observaciones: ['Bicicleta recibida en buen estado general'],
      notificaciones: [],
      estado: 'en_reparacion',
      prioridad: 'media',
      tecnicoAsignado: 'Carlos García',
      costoTotal: 85000,
      adelanto: 40000,
      saldo: 45000
    },
    {
      id: 'orden_2',
      numero: 'OT241201-002',
      cliente: {
        id: 'cliente_2',
        nombre: 'María García',
        telefono: '3009876543',
        email: 'maria.garcia@email.com',
        direccion: 'Carrera 45 #12-34',
        fechaRegistro: new Date('2024-02-20')
      },
      bicicleta: {
        id: 'bici_2',
        clienteId: 'cliente_2',
        marca: 'Giant',
        modelo: 'Escape 3',
        serial: 'GI2024002',
        color: 'Blanco',
        tipo: 'urbana',
        año: 2024
      },
      fechaIngreso: new Date('2024-12-02'),
      fechaEstimadaEntrega: new Date('2024-12-03'),
      problemas: ['Rueda pinchada'],
      diagnostico: 'Cambio de cámara y revisión general',
      observacionesIniciales: 'Bicicleta nueva, solo pinchazo',
      observacionesTecnico: '',
      repuestos: [],
      servicios: [],
      tareas: [],
      fotos: [],
      observaciones: [],
      notificaciones: [],
      estado: 'finalizada',
      prioridad: 'baja',
      costoTotal: 25000,
      adelanto: 25000,
      saldo: 0
    }
  ];

  const ordenesPendientes = [
    {
      numero: 'OT241201-001',
      cliente: 'Juan Carlos Pérez',
      estado: 'en_reparacion',
      diasRestantes: 2,
      tecnico: 'Carlos García'
    },
    {
      numero: 'OT241201-002',
      cliente: 'María García',
      estado: 'finalizada',
      diasRestantes: 0,
      tecnico: 'Ana Rodríguez'
    },
    {
      numero: 'OT241130-045',
      cliente: 'Carlos Rodríguez',
      estado: 'esperando_repuestos',
      diasRestantes: -1,
      tecnico: 'Luis Martínez'
    }
  ];

  const handleOrdenClick = (orden: OrdenTrabajo) => {
    setOrdenSeleccionada(orden);
    setVistaActual('detalle-orden');
  };

  const handleCambiarEstado = (ordenId: string, nuevoEstado: OrdenTrabajo['estado']) => {
    console.log(`Cambiando estado de orden ${ordenId} a ${nuevoEstado}`);
  };

  const renderVista = () => {
    switch (vistaActual) {
      case 'kanban':
        return (
          <KanbanTaller 
            ordenes={ordenesEjemplo}
            onOrdenClick={handleOrdenClick}
            onCambiarEstado={handleCambiarEstado}
          />
        );
      case 'nueva-orden':
        return <NuevaOrden />;
      case 'lista-ordenes':
        return <ListaOrdenes />;
      case 'detalle-orden':
        return <DetalleOrden orden={ordenSeleccionada} />;
      case 'orden-entrega':
        return <OrdenEntrega />;
      case 'tecnicos':
        return <GestionTecnicos />;
      case 'notificaciones':
        return <NotificacionesAutomaticas />;
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
              <h1 className="text-3xl font-bold">Sistema de Taller Automatizado</h1>
              <p className="text-blue-100 mt-2">
                Gestión completa y automatizada de reparaciones
                {isElectron && <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded">Versión Escritorio</span>}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button 
              onClick={() => setVistaActual('kanban')}
              className="bg-white text-blue-600 hover:bg-blue-50"
              size="lg"
            >
              <Kanban className="h-5 w-5 mr-2" />
              Panel Taller
            </Button>
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2 hover:bg-blue-50"
          onClick={() => setVistaActual('kanban')}
        >
          <Kanban className="h-6 w-6 text-blue-600" />
          <span>Panel Taller</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2 hover:bg-green-50"
          onClick={() => setVistaActual('nueva-orden')}
        >
          <Plus className="h-6 w-6 text-green-600" />
          <span>Nueva Orden</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2 hover:bg-purple-50"
          onClick={() => setVistaActual('lista-ordenes')}
        >
          <FileText className="h-6 w-6 text-purple-600" />
          <span>Ver Órdenes</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2 hover:bg-orange-50"
          onClick={() => setVistaActual('tecnicos')}
        >
          <Users className="h-6 w-6 text-orange-600" />
          <span>Técnicos</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2 hover:bg-yellow-50"
          onClick={() => setVistaActual('notificaciones')}
        >
          <Bell className="h-6 w-6 text-yellow-600" />
          <span>Notificaciones</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col gap-2 hover:bg-green-50"
          onClick={() => setVistaActual('orden-entrega')}
        >
          <FileText className="h-6 w-6 text-green-600" />
          <span>Orden Entrega</span>
        </Button>
      </div>

      {/* Estadísticas del Taller */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Órdenes Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{estadisticas.ordenesHoy}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.completadasHoy} completadas
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
            <Wrench className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{estadisticas.enReparacion}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.paraEntrega} listas para entrega
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{estadisticas.tiempoPromedioReparacion}h</div>
            <p className="text-xs text-muted-foreground">
              Por reparación
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{estadisticas.urgentes + estadisticas.atrasadas}</div>
            <p className="text-xs text-muted-foreground">
              {estadisticas.urgentes} urgentes, {estadisticas.atrasadas} atrasada
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Órdenes Pendientes y Métricas del Taller */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Órdenes Recientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Órdenes en Proceso
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
                  <p className="text-xs text-gray-500">Técnico: {orden.tecnico}</p>
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

        {/* Métricas del Taller */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Rendimiento del Taller
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Productividad</span>
              </div>
              <p className="text-sm text-green-700">
                {estadisticas.completadasSemana} trabajos completados esta semana
              </p>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Satisfacción</span>
              </div>
              <p className="text-sm text-blue-700">
                {estadisticas.satisfaccionClientes}/5.0 - {estadisticas.clientesAtendidos} clientes atendidos
              </p>
            </div>

            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Recordatorio</span>
              </div>
              <p className="text-sm text-yellow-700">
                {estadisticas.paraEntrega} bicicletas listas para entrega
              </p>
            </div>

            <Button 
              className="w-full"
              onClick={() => setVistaActual('tecnicos')}
            >
              Gestionar Técnicos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Configurar listeners de Electron
  useEffect(() => {
    if (!isElectron) return;

    const cleanupNav = setupNavigationListener((route: string) => {
      switch (route) {
        case 'dashboard':
          setVistaActual('dashboard');
          break;
        case 'nueva-orden':
          setVistaActual('nueva-orden');
          break;
        case 'kanban':
          setVistaActual('kanban');
          break;
        case 'lista-ordenes':
          setVistaActual('lista-ordenes');
          break;
        case 'tecnicos':
          setVistaActual('tecnicos');
          break;
        case 'notificaciones':
          setVistaActual('notificaciones');
          break;
      }
    });

    const cleanupExport = setupDataExportListener(async (filePath: string) => {
      try {
        const exportData = {
          ordenes: ordenesEjemplo,
          estadisticas,
          fechaExportacion: new Date().toISOString(),
          version: '1.0.0'
        };
        
        const result = await saveFile(JSON.stringify(exportData, null, 2), filePath);
        if (result.success) {
          toast({
            title: "Datos exportados exitosamente",
            description: `Archivo guardado en: ${result.filePath}`,
          });
        }
      } catch (error) {
        toast({
          title: "Error al exportar",
          description: "No se pudieron exportar los datos",
          variant: "destructive",
        });
      }
    });

    const cleanupImport = setupDataImportListener((data: any) => {
      try {
        if (data && data.ordenes) {
          console.log('Datos importados:', data);
          toast({
            title: "Datos importados exitosamente",
            description: `Se importaron ${data.ordenes.length} órdenes`,
          });
        }
      } catch (error) {
        toast({
          title: "Error al importar",
          description: "El archivo no tiene el formato correcto",
          variant: "destructive",
        });
      }
    });

    return () => {
      cleanupNav?.();
      cleanupExport?.();
      cleanupImport?.();
    };
  }, [isElectron, setupNavigationListener, setupDataExportListener, setupDataImportListener, saveFile, toast, ordenesEjemplo, estadisticas]);

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
