// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

// Expose a method to receive the environment variable

contextBridge.exposeInMainWorld("envVars", {
  getEnvVars: ipcRenderer.invoke("getEnvVars"),
});

contextBridge.exposeInMainWorld("electronAPI", {
  // system info
  getPlatform: () => ipcRenderer.invoke("getPlatform"),
  getArch: () => ipcRenderer.invoke("getArch"),

  // get path
  getAppPath: () => ipcRenderer.invoke("getAppPath"),

  // download file
  downloadFile: (downloadLink: string, downloadPath: string) =>
    ipcRenderer.invoke("download-file", { downloadLink, downloadPath }),
  onDownloadProgress: (callback: (progress: number) => void) =>
    ipcRenderer.on("download-progress", (event, progress) =>
      callback(progress)
    ),
  onDownloadComplete: (callback: () => void) =>
    ipcRenderer.on("download-complete", () => callback()),
  onDownloadFailed: (callback: () => void) =>
    ipcRenderer.on("download-failed", () => callback()),
});
