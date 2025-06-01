
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Tag, Trash } from 'lucide-react';
import { Cliente, Bicicleta, OrdenTrabajo, RepuestoOrden, ServicioMano } from '@/types/workshop';
import { generarNumeroOrden, calcularCostoTotal, formatearPrecio } from '@/utils/workshop';
import TallerHeader from './TallerHeader';

const NuevaOrden = () => {
  const [cliente, setCliente] = useState<Partial<Cliente>>({});
  const [bicicleta, setBicicleta] = useState<Partial<Bicicleta>>({});
  const [problemas, setProblemas] = useState<string[]>([]);
  const [nuevoProblema, setNuevoProblema] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [fechaEstimada, setFechaEstimada] = useState('');
  const [repuestos, setRepuestos] = useState<RepuestoOrden[]>([]);
  const [servicios, setServicios] = useState<ServicioMano[]>([]);
  const [adelanto, setAdelanto] = useState<number>(0);

  const agregarProblema = () => {
    if (nuevoProblema.trim()) {
      setProblemas([...problemas, nuevoProblema.trim()]);
      setNuevoProblema('');
    }
  };

  const eliminarProblema = (index: number) => {
    setProblemas(problemas.filter((_, i) => i !== index));
  };

  const agregarRepuesto = () => {
    const nuevoRepuesto: RepuestoOrden = {
      repuestoId: `rep_${Date.now()}`,
      repuesto: {
        id: `rep_${Date.now()}`,
        nombre: '',
        precio: 0,
        categoria: '',
        stock: 0
      },
      cantidad: 1,
      precioUnitario: 0
    };
    setRepuestos([...repuestos, nuevoRepuesto]);
  };

  const actualizarRepuesto = (index: number, campo: string, valor: any) => {
    const nuevosRepuestos = [...repuestos];
    if (campo === 'nombre') {
      nuevosRepuestos[index].repuesto.nombre = valor;
    } else if (campo === 'precio') {
      nuevosRepuestos[index].precioUnitario = parseFloat(valor) || 0;
    } else if (campo === 'cantidad') {
      nuevosRepuestos[index].cantidad = parseInt(valor) || 1;
    }
    setRepuestos(nuevosRepuestos);
  };

  const eliminarRepuesto = (index: number) => {
    setRepuestos(repuestos.filter((_, i) => i !== index));
  };

  const agregarServicio = () => {
    const nuevoServicio: ServicioMano = {
      id: `serv_${Date.now()}`,
      descripcion: '',
      precio: 0
    };
    setServicios([...servicios, nuevoServicio]);
  };

  const actualizarServicio = (index: number, campo: string, valor: any) => {
    const nuevosServicios = [...servicios];
    if (campo === 'descripcion') {
      nuevosServicios[index].descripcion = valor;
    } else if (campo === 'precio') {
      nuevosServicios[index].precio = parseFloat(valor) || 0;
    }
    setServicios(nuevosServicios);
  };

  const eliminarServicio = (index: number) => {
    setServicios(servicios.filter((_, i) => i !== index));
  };

  const costoTotal = calcularCostoTotal(repuestos, servicios);
  const saldo = costoTotal - adelanto;

  const guardarOrden = () => {
    const orden: OrdenTrabajo = {
      id: `orden_${Date.now()}`,
      numero: generarNumeroOrden(),
      cliente: cliente as Cliente,
      bicicleta: bicicleta as Bicicleta,
      fechaIngreso: new Date(),
      fechaEstimadaEntrega: new Date(fechaEstimada),
      problemas,
      diagnostico,
      repuestos,
      servicios,
      observaciones: [],
      estado: 'recibida',
      costoTotal,
      adelanto,
      saldo
    };

    console.log('Nueva orden creada:', orden);
    alert('Orden de trabajo creada exitosamente!');
  };

  return (
    <div className="space-y-6">
      <TallerHeader 
        titulo="Nueva Orden de Trabajo"
        descripcion="Registra una nueva bicicleta para reparación o mantenimiento"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Datos del Cliente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Datos del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nombreCliente">Nombre Completo *</Label>
              <Input
                id="nombreCliente"
                value={cliente.nombre || ''}
                onChange={(e) => setCliente({...cliente, nombre: e.target.value})}
                placeholder="Nombre del cliente"
              />
            </div>
            <div>
              <Label htmlFor="telefonoCliente">Teléfono *</Label>
              <Input
                id="telefonoCliente"
                value={cliente.telefono || ''}
                onChange={(e) => setCliente({...cliente, telefono: e.target.value})}
                placeholder="Número de teléfono"
              />
            </div>
            <div>
              <Label htmlFor="emailCliente">Email</Label>
              <Input
                id="emailCliente"
                type="email"
                value={cliente.email || ''}
                onChange={(e) => setCliente({...cliente, email: e.target.value})}
                placeholder="correo@ejemplo.com"
              />
            </div>
            <div>
              <Label htmlFor="direccionCliente">Dirección</Label>
              <Input
                id="direccionCliente"
                value={cliente.direccion || ''}
                onChange={(e) => setCliente({...cliente, direccion: e.target.value})}
                placeholder="Dirección del cliente"
              />
            </div>
          </CardContent>
        </Card>

        {/* Datos de la Bicicleta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Datos de la Bicicleta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="marcaBici">Marca *</Label>
              <Input
                id="marcaBici"
                value={bicicleta.marca || ''}
                onChange={(e) => setBicicleta({...bicicleta, marca: e.target.value})}
                placeholder="Marca de la bicicleta"
              />
            </div>
            <div>
              <Label htmlFor="modeloBici">Modelo</Label>
              <Input
                id="modeloBici"
                value={bicicleta.modelo || ''}
                onChange={(e) => setBicicleta({...bicicleta, modelo: e.target.value})}
                placeholder="Modelo de la bicicleta"
              />
            </div>
            <div>
              <Label htmlFor="serialBici">Serial *</Label>
              <Input
                id="serialBici"
                value={bicicleta.serial || ''}
                onChange={(e) => setBicicleta({...bicicleta, serial: e.target.value})}
                placeholder="Número de serie"
              />
            </div>
            <div>
              <Label htmlFor="tipoBici">Tipo de Bicicleta</Label>
              <Select value={bicicleta.tipo} onValueChange={(value) => setBicicleta({...bicicleta, tipo: value as any})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="montaña">Montaña</SelectItem>
                  <SelectItem value="ruta">Ruta</SelectItem>
                  <SelectItem value="urbana">Urbana</SelectItem>
                  <SelectItem value="bmx">BMX</SelectItem>
                  <SelectItem value="electrica">Eléctrica</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="colorBici">Color</Label>
              <Input
                id="colorBici"
                value={bicicleta.color || ''}
                onChange={(e) => setBicicleta({...bicicleta, color: e.target.value})}
                placeholder="Color de la bicicleta"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Problemas Reportados */}
      <Card>
        <CardHeader>
          <CardTitle>Problemas Reportados</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={nuevoProblema}
              onChange={(e) => setNuevoProblema(e.target.value)}
              placeholder="Describe el problema reportado"
              onKeyPress={(e) => e.key === 'Enter' && agregarProblema()}
            />
            <Button onClick={agregarProblema} type="button">Agregar</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {problemas.map((problema, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-2">
                {problema}
                <Trash 
                  className="h-3 w-3 cursor-pointer text-red-500"
                  onClick={() => eliminarProblema(index)}
                />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Diagnóstico y Fecha */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Diagnóstico Técnico</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              placeholder="Detalla el diagnóstico técnico y trabajos a realizar..."
              rows={6}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Fecha Estimada de Entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={fechaEstimada}
              onChange={(e) => setFechaEstimada(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Repuestos */}
      <Card>
        <CardHeader>
          <CardTitle>Repuestos Necesarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={agregarRepuesto} variant="outline">
            Agregar Repuesto
          </Button>
          {repuestos.map((repuesto, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <Input
                placeholder="Nombre del repuesto"
                value={repuesto.repuesto.nombre}
                onChange={(e) => actualizarRepuesto(index, 'nombre', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Cantidad"
                value={repuesto.cantidad}
                onChange={(e) => actualizarRepuesto(index, 'cantidad', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Precio unitario"
                value={repuesto.precioUnitario}
                onChange={(e) => actualizarRepuesto(index, 'precio', e.target.value)}
              />
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {formatearPrecio(repuesto.cantidad * repuesto.precioUnitario)}
                </span>
                <Button 
                  onClick={() => eliminarRepuesto(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Servicios de Mano de Obra */}
      <Card>
        <CardHeader>
          <CardTitle>Servicios y Mano de Obra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={agregarServicio} variant="outline">
            Agregar Servicio
          </Button>
          {servicios.map((servicio, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
              <Input
                placeholder="Descripción del servicio"
                value={servicio.descripcion}
                onChange={(e) => actualizarServicio(index, 'descripcion', e.target.value)}
                className="md:col-span-2"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Precio"
                  value={servicio.precio}
                  onChange={(e) => actualizarServicio(index, 'precio', e.target.value)}
                />
                <Button 
                  onClick={() => eliminarServicio(index)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resumen de Costos */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Costos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Costo Total</Label>
              <div className="text-2xl font-bold text-green-600">
                {formatearPrecio(costoTotal)}
              </div>
            </div>
            <div>
              <Label htmlFor="adelanto">Adelanto</Label>
              <Input
                id="adelanto"
                type="number"
                value={adelanto}
                onChange={(e) => setAdelanto(parseFloat(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div>
              <Label>Saldo Pendiente</Label>
              <div className="text-2xl font-bold text-orange-600">
                {formatearPrecio(saldo)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón Guardar */}
      <div className="flex justify-end">
        <Button 
          onClick={guardarOrden}
          size="lg"
          className="bg-green-600 hover:bg-green-700"
        >
          Crear Orden de Trabajo
        </Button>
      </div>
    </div>
  );
};

export default NuevaOrden;
