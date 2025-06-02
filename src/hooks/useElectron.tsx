
import { useEffect, useState } from 'react';

interface ElectronAPI {
  saveFile: (data: string, defaultPath: string) => Promise<{success: boolean, filePath?: string, error?: string, canceled?: boolean}>;
  readFile: () => Promise<{success: boolean, data?: any, error?: string, canceled?: boolean}>;
  onNavigate: (callback: (route: string) => void) => void;
  onExportData: (callback: (filePath: string) => void) => void;
  onImportData: (callback: (data: any) => void) => void;
  isElectron: boolean;
  platform: string;
  removeAllListeners: (channel: string) => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export const useElectron = () => {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    setIsElectron(!!window.electronAPI?.isElectron);
  }, []);

  const saveFile = async (data: string, defaultPath: string) => {
    if (!window.electronAPI) return { success: false, error: 'Electron no disponible' };
    return await window.electronAPI.saveFile(data, defaultPath);
  };

  const readFile = async () => {
    if (!window.electronAPI) return { success: false, error: 'Electron no disponible' };
    return await window.electronAPI.readFile();
  };

  const setupNavigationListener = (callback: (route: string) => void) => {
    if (!window.electronAPI) return;
    window.electronAPI.onNavigate(callback);
    return () => window.electronAPI?.removeAllListeners('navigate-to');
  };

  const setupDataExportListener = (callback: (filePath: string) => void) => {
    if (!window.electronAPI) return;
    window.electronAPI.onExportData(callback);
    return () => window.electronAPI?.removeAllListeners('export-data');
  };

  const setupDataImportListener = (callback: (data: any) => void) => {
    if (!window.electronAPI) return;
    window.electronAPI.onImportData(callback);
    return () => window.electronAPI?.removeAllListeners('import-data');
  };

  return {
    isElectron,
    saveFile,
    readFile,
    setupNavigationListener,
    setupDataExportListener,
    setupDataImportListener,
    platform: window.electronAPI?.platform || 'web'
  };
};
