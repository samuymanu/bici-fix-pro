
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Phone, 
  Send, 
  Settings,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import TallerHeader from './TallerHeader';

const NotificacionesAutomaticas = () => {
  const [configuracion, setConfiguracion] = useState({
    whatsappActivo: true,
    smsActivo: false,
    emailActivo: true,
    notificarIngreso: true,
    notificarDiagnostico: true,
    notificarReparacion: false,
    notificarListo: true,
    recordatorioEntrega: true,
    alertaRetraso: true
  });

  const [notificacionesRecientes] = useState([
    {
      id: '1',
      tipo: 'whatsapp' as const,
      cliente: 'Juan Pérez',
      mensaje: 'Tu bicicleta está lista para entrega',
      estado: 'enviado' as const,
      fecha: new Date('2024-12-01T10:30:00'),
      orden: 'OT241201-001'
    },
    {
      id: '2',
      tipo: 'email' as const,
      cliente: 'María García',
      mensaje: 'Diagnóstico completado - Requiere cambio de pastillas',
      estado: 'enviado' as const,
      fecha: new Date('2024-12-01T09:15:00'),
      orden: 'OT241201-002'
    },
    {
      id: '3',
      tipo: 'sms' as const,
      cliente: 'Carlos López',
      mensaje: 'Recordatorio: Recoger bicicleta hoy',
      estado: 'pendiente' as const,
      fecha: new Date('2024-12-01T08:00:00'),
      orden: 'OT241130-045'
    }
  ]);

  const plantillasNotificacion = {
    ingreso: "Hola {cliente}, hemos recibido tu bicicleta {marca} {modelo}. Te contactaremos pronto con el diagnóstico.",
    diagnostico: "Hola {cliente}, el diagnóstico de tu {marca} {modelo} está listo: {diagnostico}",
    listo: "¡Excelente! Tu {marca} {modelo} está lista para entrega. Puedes recogerla en horario de 8am-6pm.",
    recordatorio: "Recordatorio: Tu bicicleta está lista para entrega desde hace {dias} días.",
    retraso: "Disculpa el retraso. Tu {marca} {modelo} estará lista el {nueva_fecha}."
  };

  const obtenerIconoTipo = (tipo: 'whatsapp' | 'sms' | 'email') => {
    switch (tipo) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'sms': return <Phone className="h-4 w-4 text-blue-600" />;
      case 'email': return <Mail className="h-4 w-4 text-gray-600" />;
    }
  };

  const obtenerColorEstado = (estado: 'enviado' | 'pendiente' | 'error') => {
    switch (estado) {
      case 'enviado': return 'bg-green-100 text-green-800';
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
    }
  };

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const enviarNotificacionManual = () => {
    alert('Notificación enviada exitosamente');
  };

  return (
    <div className="space-y-6">
      <TallerHeader 
        titulo="Notificaciones Automáticas"
        descripcion="Gestión de comunicación con clientes"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuración */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración Automática
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Canales de Comunicación</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                  </div>
                  <Switch
                    id="whatsapp"
                    checked={configuracion.whatsappActivo}
                    onCheckedChange={(checked) => 
                      setConfiguracion(prev => ({ ...prev, whatsappActivo: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <Label htmlFor="sms">SMS</Label>
                  </div>
                  <Switch
                    id="sms"
                    checked={configuracion.smsActivo}
                    onCheckedChange={(checked) => 
                      setConfiguracion(prev => ({ ...prev, smsActivo: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <Switch
                    id="email"
                    checked={configuracion.emailActivo}
                    onCheckedChange={(checked) => 
                      setConfiguracion(prev => ({ ...prev, emailActivo: checked }))
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Eventos Automáticos</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="ingreso">Al recibir bicicleta</Label>
                  <Switch
                    id="ingreso"
                    checked={configuracion.notificarIngreso}
                    onCheckedChange={(checked) => 
                      setConfiguracion(prev => ({ ...prev, notificarIngreso: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="diagnostico">Diagnóstico listo</Label>
                  <Switch
                    id="diagnostico"
                    checked={configuracion.notificarDiagnostico}
                    onCheckedChange={(checked) => 
                      setConfiguracion(prev => ({ ...prev, notificarDiagnostico: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="listo">Trabajo terminado</Label>
                  <Switch
                    id="listo"
                    checked={configuracion.notificarListo}
                    onCheckedChange={(checked) => 
                      setConfiguracion(prev => ({ ...prev, notificarListo: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="recordatorio">Recordatorio entrega</Label>
                  <Switch
                    id="recordatorio"
                    checked={configuracion.recordatorioEntrega}
                    onCheckedChange={(checked) => 
                      setConfiguracion(prev => ({ ...prev, recordatorioEntrega: checked }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="retraso">Alerta de retrasos</Label>
                  <Switch
                    id="retraso"
                    checked={configuracion.alertaRetraso}
                    onCheckedChange={(checked) => 
                      setConfiguracion(prev => ({ ...prev, alertaRetraso: checked }))
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Envío Manual */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Envío Manual
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cliente-manual">Cliente</Label>
              <Input
                id="cliente-manual"
                placeholder="Nombre del cliente o número de orden"
              />
            </div>
            <div>
              <Label htmlFor="mensaje-manual">Mensaje</Label>
              <Textarea
                id="mensaje-manual"
                placeholder="Escribe tu mensaje personalizado..."
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={enviarNotificacionManual}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button 
                variant="outline" 
                onClick={enviarNotificacionManual}
                className="flex-1"
              >
                <Phone className="h-4 w-4 mr-2" />
                SMS
              </Button>
              <Button 
                variant="outline" 
                onClick={enviarNotificacionManual}
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historial de Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notificaciones Recientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificacionesRecientes.map((notif) => (
              <div key={notif.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  {obtenerIconoTipo(notif.tipo)}
                  <Badge className={obtenerColorEstado(notif.estado)} variant="outline">
                    {notif.estado}
                  </Badge>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{notif.cliente}</span>
                    <span className="text-sm text-gray-500">({notif.orden})</span>
                  </div>
                  <p className="text-sm text-gray-600">{notif.mensaje}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {formatearFecha(notif.fecha)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plantillas */}
      <Card>
        <CardHeader>
          <CardTitle>Plantillas de Mensajes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(plantillasNotificacion).map(([tipo, mensaje]) => (
              <div key={tipo} className="p-3 border rounded-lg">
                <div className="font-medium mb-2 capitalize">{tipo.replace('_', ' ')}</div>
                <p className="text-sm text-gray-600">{mensaje}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificacionesAutomaticas;
