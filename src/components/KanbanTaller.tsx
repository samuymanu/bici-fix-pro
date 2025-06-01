
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, User, AlertTriangle, CheckCircle } from 'lucide-react';
import { OrdenTrabajo } from '@/types/workshop';
import { obtenerColorEstado, obtenerTextoEstado, formatearPrecio } from '@/utils/workshop';

interface KanbanTallerProps {
  ordenes: OrdenTrabajo[];
  onOrdenClick: (orden: OrdenTrabajo) => void;
  onCambiarEstado: (ordenId: string, nuevoEstado: OrdenTrabajo['estado']) => void;
}

const KanbanTaller = ({ ordenes, onOrdenClick, onCambiarEstado }: KanbanTallerProps) => {
  const estados: OrdenTrabajo['estado'][] = [
    'recibida',
    'diagnostico', 
    'esperando_repuestos',
    'en_reparacion',
    'control_calidad',
    'finalizada',
    'entregada'
  ];

  const obtenerIconoEstado = (estado: OrdenTrabajo['estado']) => {
    switch (estado) {
      case 'recibida': return <Clock className="h-4 w-4" />;
      case 'diagnostico': return <User className="h-4 w-4" />;
      case 'esperando_repuestos': return <AlertTriangle className="h-4 w-4" />;
      case 'en_reparacion': return <User className="h-4 w-4" />;
      case 'control_calidad': return <CheckCircle className="h-4 w-4" />;
      case 'finalizada': return <CheckCircle className="h-4 w-4" />;
      case 'entregada': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const obtenerColorPrioridad = (prioridad: OrdenTrabajo['prioridad']) => {
    switch (prioridad) {
      case 'urgente': return 'border-l-4 border-red-500';
      case 'alta': return 'border-l-4 border-orange-500';
      case 'media': return 'border-l-4 border-yellow-500';
      case 'baja': return 'border-l-4 border-green-500';
      default: return 'border-l-4 border-gray-300';
    }
  };

  const calcularDiasRestantes = (fechaEstimada: Date) => {
    const hoy = new Date();
    const diff = fechaEstimada.getTime() - hoy.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="flex gap-4 h-full overflow-x-auto pb-4">
        {estados.map((estado) => {
          const ordenesPorEstado = ordenes.filter(orden => orden.estado === estado);
          
          return (
            <div key={estado} className="flex-shrink-0 w-80">
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    {obtenerIconoEstado(estado)}
                    <span>{obtenerTextoEstado(estado)}</span>
                    <Badge variant="secondary" className="ml-auto">
                      {ordenesPorEstado.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto space-y-3">
                  {ordenesPorEstado.map((orden) => {
                    const diasRestantes = calcularDiasRestantes(orden.fechaEstimadaEntrega);
                    
                    return (
                      <Card 
                        key={orden.id} 
                        className={`cursor-pointer hover:shadow-md transition-shadow ${obtenerColorPrioridad(orden.prioridad)}`}
                        onClick={() => onOrdenClick(orden)}
                      >
                        <CardContent className="p-3">
                          <div className="space-y-2">
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-sm">{orden.numero}</span>
                              <Badge className={obtenerColorEstado(orden.estado)} variant="outline">
                                {orden.prioridad}
                              </Badge>
                            </div>
                            
                            <div>
                              <p className="font-medium text-sm">{orden.cliente.nombre}</p>
                              <p className="text-xs text-gray-600">
                                {orden.bicicleta.marca} {orden.bicicleta.modelo}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock className="h-3 w-3" />
                              <span>
                                {diasRestantes > 0 
                                  ? `${diasRestantes} días restantes`
                                  : diasRestantes === 0 
                                    ? 'Vence hoy'
                                    : `${Math.abs(diasRestantes)} días tarde`
                                }
                              </span>
                            </div>

                            {orden.tecnicoAsignado && (
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {orden.tecnicoAsignado.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-gray-600">{orden.tecnicoAsignado}</span>
                              </div>
                            )}

                            <div className="flex justify-between items-center pt-2 border-t">
                              <span className="text-sm font-medium text-green-600">
                                {formatearPrecio(orden.costoTotal)}
                              </span>
                              <div className="flex gap-1">
                                {orden.fotos.length > 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    {orden.fotos.length} fotos
                                  </Badge>
                                )}
                                {orden.tareas.filter(t => t.completada).length > 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    {orden.tareas.filter(t => t.completada).length}/{orden.tareas.length}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  {ordenesPorEstado.length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <p className="text-sm">No hay órdenes en este estado</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanTaller;
