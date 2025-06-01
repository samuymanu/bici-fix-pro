
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { User, Wrench, Clock, Star, Plus } from 'lucide-react';
import { Tecnico } from '@/types/workshop';
import TallerHeader from './TallerHeader';

const GestionTecnicos = () => {
  const [tecnicos] = useState<Tecnico[]>([
    {
      id: '1',
      nombre: 'Carlos García',
      especialidad: ['frenos', 'transmision'],
      activo: true
    },
    {
      id: '2',
      nombre: 'Ana Rodríguez',
      especialidad: ['suspension', 'ruedas'],
      activo: true
    },
    {
      id: '3',
      nombre: 'Luis Martínez',
      especialidad: ['electrica', 'accesorios'],
      activo: true
    }
  ]);

  const estadisticasTecnicos = [
    {
      tecnicoId: '1',
      nombre: 'Carlos García',
      ordenesHoy: 3,
      ordenesSemanales: 15,
      tiempoPromedio: 2.5,
      satisfaccion: 4.8,
      cargaTrabajo: 75
    },
    {
      tecnicoId: '2',
      nombre: 'Ana Rodríguez',
      ordenesHoy: 2,
      ordenesSemanales: 12,
      tiempoPromedio: 3.1,
      satisfaccion: 4.6,
      cargaTrabajo: 60
    },
    {
      tecnicoId: '3',
      nombre: 'Luis Martínez',
      ordenesHoy: 4,
      ordenesSemanales: 18,
      tiempoPromedio: 2.8,
      satisfaccion: 4.9,
      cargaTrabajo: 85
    }
  ];

  const obtenerColorEspecialidad = (especialidad: string) => {
    const colores = {
      'frenos': 'bg-red-100 text-red-800',
      'transmision': 'bg-blue-100 text-blue-800',
      'suspension': 'bg-green-100 text-green-800',
      'ruedas': 'bg-yellow-100 text-yellow-800',
      'electrica': 'bg-purple-100 text-purple-800',
      'accesorios': 'bg-gray-100 text-gray-800'
    };
    return colores[especialidad as keyof typeof colores] || 'bg-gray-100 text-gray-800';
  };

  const obtenerColorCarga = (carga: number) => {
    if (carga >= 80) return 'text-red-600';
    if (carga >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <TallerHeader 
        titulo="Gestión de Técnicos"
        descripcion="Control de personal y asignación de trabajos"
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Técnicos Activos</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Técnico
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {estadisticasTecnicos.map((stats) => {
          const tecnico = tecnicos.find(t => t.id === stats.tecnicoId);
          if (!tecnico) return null;

          return (
            <Card key={stats.tecnicoId} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {tecnico.nombre.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{tecnico.nombre}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{stats.satisfaccion}/5.0</span>
                    </div>
                  </div>
                  <Badge variant={tecnico.activo ? 'default' : 'secondary'}>
                    {tecnico.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Especialidades</p>
                  <div className="flex flex-wrap gap-1">
                    {tecnico.especialidad.map((esp, index) => (
                      <Badge key={index} className={obtenerColorEspecialidad(esp)} variant="outline">
                        {esp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Hoy</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Wrench className="h-3 w-3" />
                      {stats.ordenesHoy} órdenes
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Esta semana</p>
                    <p className="font-semibold">{stats.ordenesSemanales} órdenes</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tiempo promedio</p>
                    <p className="font-semibold flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {stats.tiempoPromedio}h
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Carga de trabajo</p>
                    <p className={`font-semibold ${obtenerColorCarga(stats.cargaTrabajo)}`}>
                      {stats.cargaTrabajo}%
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Carga de trabajo</span>
                    <span className={obtenerColorCarga(stats.cargaTrabajo)}>
                      {stats.cargaTrabajo}%
                    </span>
                  </div>
                  <Progress 
                    value={stats.cargaTrabajo} 
                    className="h-2"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Historial
                  </Button>
                  <Button size="sm" className="flex-1">
                    Asignar Trabajo
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumen del Día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {estadisticasTecnicos.reduce((sum, t) => sum + t.ordenesHoy, 0)}
              </div>
              <p className="text-sm text-gray-600">Órdenes en proceso</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {(estadisticasTecnicos.reduce((sum, t) => sum + t.tiempoPromedio, 0) / estadisticasTecnicos.length).toFixed(1)}h
              </div>
              <p className="text-sm text-gray-600">Tiempo promedio</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {Math.round(estadisticasTecnicos.reduce((sum, t) => sum + t.cargaTrabajo, 0) / estadisticasTecnicos.length)}%
              </div>
              <p className="text-sm text-gray-600">Carga promedio</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(estadisticasTecnicos.reduce((sum, t) => sum + t.satisfaccion, 0) / estadisticasTecnicos.length).toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">Satisfacción promedio</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GestionTecnicos;
