
const { contextBridge, ipcRenderer } = require('electron');

// Exposición segura de APIs de Electron al renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Navegación
  onNavigate: (callback) => {
    ipcRenderer.on('navigate-to', (event, route) => callback(route));
  },
  
  // Gestión de archivos
  saveFile: (data, defaultPath) => {
    return ipcRenderer.invoke('save-file', data, defaultPath);
  },
  
  readFile: () => {
    return ipcRenderer.invoke('read-file');
  },
  
  // Export/Import de datos
  onExportData: (callback) => {
    ipcRenderer.on('export-data', (event, filePath) => callback(filePath));
  },
  
  onImportData: (callback) => {
    ipcRenderer.on('import-data', (event, data) => callback(data));
  },
  
  // Información del sistema
  isElectron: true,
  platform: process.platform,
  
  // Remover listeners
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

// Configuración adicional para el contexto de Electron
window.addEventListener('DOMContentLoaded', () => {
  // Deshabilitar zoom por defecto
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')) {
      e.preventDefault();
    }
  });
  
  // Deshabilitar zoom con rueda del mouse
  document.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });
});
