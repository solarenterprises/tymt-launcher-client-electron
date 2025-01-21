// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onCpuInfo: (callback: (cpuInfo: { arch: string; type: string }) => void) => {
    ipcRenderer.on("cpu-info", (_, cpuInfo) => callback(cpuInfo));
  },
});
