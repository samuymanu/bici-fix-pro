
# Construcción de la Aplicación Electron

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm

## Scripts Disponibles

### Desarrollo
```bash
# Iniciar en modo desarrollo (web)
npm run dev

# Iniciar Electron en modo desarrollo
npm run electron-dev
```

### Construcción
```bash
# Construir la aplicación web
npm run build

# Construir y generar el ejecutable para Windows
npm run electron-pack

# Construir y generar el instalador para Windows
npm run dist
```

## Comandos de Construcción

### Para Windows (Recomendado)
```bash
# Instalar dependencias
npm install

# Construir la aplicación
npm run build

# Generar el ejecutable para Windows
npm run dist
```

El ejecutable se generará en la carpeta `release/` con el nombre `Sistema de Taller-Setup-1.0.0.exe`

### Funcionalidades de la Versión Escritorio

1. **Menú Nativo**: 
   - Archivo: Nueva orden, exportar/importar datos, salir
   - Ver: Navegación rápida entre vistas
   - Taller: Gestión de técnicos y notificaciones
   - Ayuda: Información de la aplicación

2. **Atajos de Teclado**:
   - `Ctrl+N`: Nueva orden
   - `Ctrl+D`: Dashboard
   - `Ctrl+K`: Panel Kanban
   - `Ctrl+L`: Lista de órdenes
   - `Ctrl+R`: Recargar
   - `F12`: DevTools

3. **Gestión de Archivos**:
   - Exportar datos del taller en formato JSON
   - Importar datos desde archivos JSON
   - Backup automático de la información

4. **Características de Escritorio**:
   - Ventana redimensionable
   - Icono personalizado
   - Instalador para Windows
   - Ejecución sin navegador

## Estructura de Archivos

```
public/
├── electron.js       # Proceso principal de Electron
├── preload.js       # Script de preload para IPC
└── icon.png         # Icono de la aplicación

src/
└── hooks/
    └── useElectron.tsx  # Hook para funcionalidad Electron

electron-builder.json   # Configuración del builder
```

## Solución de Problemas

### Error: "electron not found"
```bash
npm install electron --save-dev
```

### Error de permisos en Windows
Ejecutar como administrador o deshabilitar temporalmente el antivirus.

### El ejecutable no inicia
Verificar que todas las dependencias estén incluidas en el build.

## Personalización

Para personalizar la aplicación:

1. **Cambiar icono**: Reemplazar `public/icon.png`
2. **Modificar configuración**: Editar `electron-builder.json`
3. **Ajustar ventana**: Modificar parámetros en `public/electron.js`

## Distribución

El archivo generado en `release/` es completamente autónomo y puede distribuirse sin dependencias adicionales.
