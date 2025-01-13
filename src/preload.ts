// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

// Expose a method to receive the environment variable

contextBridge.exposeInMainWorld("envVars", {
  getEnvVars: ipcRenderer.invoke("getEnvVars"),
});
