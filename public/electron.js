
const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.png'),
    titleBarStyle: 'default',
    show: false
  });

  const startUrl = isDev 
    ? 'http://localhost:8080' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Menú de la aplicación
function createMenu() {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Nueva Orden',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'nueva-orden');
          }
        },
        { type: 'separator' },
        {
          label: 'Exportar Datos',
          click: async () => {
            try {
              const result = await dialog.showSaveDialog(mainWindow, {
                title: 'Exportar datos del taller',
                defaultPath: `taller-backup-${new Date().toISOString().split('T')[0]}.json`,
                filters: [
                  { name: 'JSON Files', extensions: ['json'] }
                ]
              });

              if (!result.canceled) {
                mainWindow.webContents.send('export-data', result.filePath);
              }
            } catch (error) {
              console.error('Error al exportar:', error);
            }
          }
        },
        {
          label: 'Importar Datos',
          click: async () => {
            try {
              const result = await dialog.showOpenDialog(mainWindow, {
                title: 'Importar datos del taller',
                filters: [
                  { name: 'JSON Files', extensions: ['json'] }
                ],
                properties: ['openFile']
              });

              if (!result.canceled && result.filePaths.length > 0) {
                const data = await fs.readFile(result.filePaths[0], 'utf8');
                mainWindow.webContents.send('import-data', JSON.parse(data));
              }
            } catch (error) {
              console.error('Error al importar:', error);
              dialog.showErrorBox('Error', 'No se pudo importar el archivo seleccionado');
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        {
          label: 'Dashboard',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'dashboard');
          }
        },
        {
          label: 'Panel Kanban',
          accelerator: 'CmdOrCtrl+K',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'kanban');
          }
        },
        {
          label: 'Lista de Órdenes',
          accelerator: 'CmdOrCtrl+L',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'lista-ordenes');
          }
        },
        { type: 'separator' },
        {
          label: 'Recargar',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload();
          }
        },
        {
          label: 'Alternar DevTools',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          }
        }
      ]
    },
    {
      label: 'Taller',
      submenu: [
        {
          label: 'Gestión de Técnicos',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'tecnicos');
          }
        },
        {
          label: 'Notificaciones',
          click: () => {
            mainWindow.webContents.send('navigate-to', 'notificaciones');
          }
        }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Acerca de Sistema de Taller',
              message: 'Sistema de Taller Automatizado',
              detail: 'Versión 1.0.0\nSistema completo de gestión para talleres de bicicletas'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC handlers
ipcMain.handle('save-file', async (event, data, defaultPath) => {
  try {
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath,
      filters: [
        { name: 'JSON Files', extensions: ['json'] }
      ]
    });

    if (!result.canceled) {
      await fs.writeFile(result.filePath, data, 'utf8');
      return { success: true, filePath: result.filePath };
    }
    return { success: false, canceled: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('read-file', async (event) => {
  try {
    const result = await dialog.showOpenDialog(mainWindow, {
      filters: [
        { name: 'JSON Files', extensions: ['json'] }
      ],
      properties: ['openFile']
    });

    if (!result.canceled && result.filePaths.length > 0) {
      const data = await fs.readFile(result.filePaths[0], 'utf8');
      return { success: true, data: JSON.parse(data) };
    }
    return { success: false, canceled: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
