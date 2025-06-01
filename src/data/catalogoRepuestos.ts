
import { RepuestoCatalogo } from '@/types/workshop';

export const catalogoRepuestos: RepuestoCatalogo[] = [
  // Frenos
  {
    id: 'freno_001',
    nombre: 'Pastillas de freno Shimano',
    precio: 25000,
    categoria: 'frenos',
    descripcion: 'Pastillas de freno compatibles con Shimano'
  },
  {
    id: 'freno_002',
    nombre: 'Cable de freno',
    precio: 8000,
    categoria: 'frenos',
    descripcion: 'Cable de acero inoxidable'
  },
  {
    id: 'freno_003',
    nombre: 'Funda cable freno',
    precio: 5000,
    categoria: 'frenos',
    descripcion: 'Funda protectora para cable de freno'
  },
  
  // Transmisión
  {
    id: 'trans_001',
    nombre: 'Cadena KMC 11 velocidades',
    precio: 35000,
    categoria: 'transmision',
    descripcion: 'Cadena de 11 velocidades'
  },
  {
    id: 'trans_002',
    nombre: 'Cassette 11-32T',
    precio: 45000,
    categoria: 'transmision',
    descripcion: 'Cassette de 11 velocidades'
  },
  {
    id: 'trans_003',
    nombre: 'Desviador trasero',
    precio: 85000,
    categoria: 'transmision',
    descripcion: 'Desviador trasero Shimano'
  },
  {
    id: 'trans_004',
    nombre: 'Cable cambio',
    precio: 6000,
    categoria: 'transmision',
    descripcion: 'Cable para cambios'
  },
  
  // Ruedas
  {
    id: 'rueda_001',
    nombre: 'Llanta 26" MTB',
    precio: 120000,
    categoria: 'ruedas',
    descripcion: 'Llanta para montaña 26 pulgadas'
  },
  {
    id: 'rueda_002',
    nombre: 'Radio acero inoxidable',
    precio: 2000,
    categoria: 'ruedas',
    descripcion: 'Radio individual'
  },
  {
    id: 'rueda_003',
    nombre: 'Cámara 26"',
    precio: 12000,
    categoria: 'ruedas',
    descripcion: 'Cámara de aire 26 pulgadas'
  },
  
  // Accesorios
  {
    id: 'acc_001',
    nombre: 'Manubrio MTB',
    precio: 65000,
    categoria: 'accesorios',
    descripcion: 'Manubrio de aluminio para montaña'
  },
  {
    id: 'acc_002',
    nombre: 'Sillin deportivo',
    precio: 45000,
    categoria: 'accesorios',
    descripcion: 'Sillin ergonómico'
  },
  {
    id: 'acc_003',
    nombre: 'Pedales aluminio',
    precio: 35000,
    categoria: 'accesorios',
    descripcion: 'Pedales de aluminio antideslizantes'
  }
];

export const serviciosComunes = [
  {
    id: 'serv_001',
    descripcion: 'Ajuste general de frenos',
    precio: 20000,
    tiempoEstimado: 30
  },
  {
    id: 'serv_002',
    descripcion: 'Ajuste de cambios',
    precio: 25000,
    tiempoEstimado: 45
  },
  {
    id: 'serv_003',
    descripcion: 'Centrado de rueda',
    precio: 15000,
    tiempoEstimado: 30
  },
  {
    id: 'serv_004',
    descripcion: 'Engrase general',
    precio: 18000,
    tiempoEstimado: 20
  },
  {
    id: 'serv_005',
    descripcion: 'Limpieza profunda',
    precio: 30000,
    tiempoEstimado: 60
  },
  {
    id: 'serv_006',
    descripcion: 'Instalación de repuesto',
    precio: 10000,
    tiempoEstimado: 15
  }
];
