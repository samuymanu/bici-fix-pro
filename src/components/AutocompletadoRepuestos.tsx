
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { RepuestoCatalogo, RepuestoOrden } from '@/types/workshop';
import { catalogoRepuestos } from '@/data/catalogoRepuestos';
import { formatearPrecio } from '@/utils/workshop';

interface AutocompletadoRepuestosProps {
  repuestosSeleccionados: RepuestoOrden[];
  onRepuestosChange: (repuestos: RepuestoOrden[]) => void;
}

const AutocompletadoRepuestos = ({ repuestosSeleccionados, onRepuestosChange }: AutocompletadoRepuestosProps) => {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const repuestosFiltrados = catalogoRepuestos.filter(repuesto =>
    repuesto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    repuesto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  ).slice(0, 5);

  const agregarRepuesto = (repuesto: RepuestoCatalogo) => {
    const repuestoExistente = repuestosSeleccionados.find(r => r.repuestoId === repuesto.id);
    
    if (repuestoExistente) {
      // Si ya existe, aumentar cantidad
      const repuestosActualizados = repuestosSeleccionados.map(r =>
        r.repuestoId === repuesto.id
          ? { ...r, cantidad: r.cantidad + 1 }
          : r
      );
      onRepuestosChange(repuestosActualizados);
    } else {
      // Si no existe, agregar nuevo
      const nuevoRepuesto: RepuestoOrden = {
        repuestoId: repuesto.id,
        repuesto,
        cantidad: 1,
        precioUnitario: repuesto.precio
      };
      onRepuestosChange([...repuestosSeleccionados, nuevoRepuesto]);
    }
    
    setBusqueda('');
    setMostrarSugerencias(false);
  };

  const actualizarCantidad = (repuestoId: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      eliminarRepuesto(repuestoId);
      return;
    }
    
    const repuestosActualizados = repuestosSeleccionados.map(r =>
      r.repuestoId === repuestoId
        ? { ...r, cantidad: nuevaCantidad }
        : r
    );
    onRepuestosChange(repuestosActualizados);
  };

  const eliminarRepuesto = (repuestoId: string) => {
    const repuestosFiltrados = repuestosSeleccionados.filter(r => r.repuestoId !== repuestoId);
    onRepuestosChange(repuestosFiltrados);
  };

  const calcularSubtotal = () => {
    return repuestosSeleccionados.reduce((total, item) => 
      total + (item.cantidad * item.precioUnitario), 0
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Label htmlFor="buscar-repuesto">Buscar Repuesto</Label>
        <Input
          id="buscar-repuesto"
          type="text"
          placeholder="Escriba el nombre del repuesto..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setMostrarSugerencias(e.target.value.length > 0);
          }}
          onFocus={() => setMostrarSugerencias(busqueda.length > 0)}
        />
        
        {mostrarSugerencias && repuestosFiltrados.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-10 mt-1">
            <CardContent className="p-2">
              {repuestosFiltrados.map((repuesto) => (
                <div
                  key={repuesto.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-50 cursor-pointer rounded"
                  onClick={() => agregarRepuesto(repuesto)}
                >
                  <div>
                    <p className="font-medium text-sm">{repuesto.nombre}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {repuesto.categoria}
                      </Badge>
                      <span className="text-xs text-gray-600">
                        {formatearPrecio(repuesto.precio)}
                      </span>
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-blue-600" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {repuestosSeleccionados.length > 0 && (
        <div className="space-y-3">
          <Label>Repuestos Seleccionados</Label>
          {repuestosSeleccionados.map((item) => (
            <Card key={item.repuestoId}>
              <CardContent className="p-3">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-medium">{item.repuesto.nombre}</p>
                    <p className="text-sm text-gray-600">
                      {formatearPrecio(item.precioUnitario)} c/u
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => actualizarCantidad(item.repuestoId, item.cantidad - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2 min-w-[2rem] text-center">{item.cantidad}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => actualizarCantidad(item.repuestoId, item.cantidad + 1)}
                      >
                        +
                      </Button>
                    </div>
                    
                    <span className="font-medium min-w-[5rem] text-right">
                      {formatearPrecio(item.cantidad * item.precioUnitario)}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => eliminarRepuesto(item.repuestoId)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="font-medium">Subtotal Repuestos:</span>
            <span className="font-bold text-green-600">
              {formatearPrecio(calcularSubtotal())}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutocompletadoRepuestos;
