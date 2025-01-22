// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onSysInfo: (callback: (sysInfo: { cpuArch: string; cpuType: string; osType: string }) => void) => {
    ipcRenderer.on("sys-info", (_, sysInfo) => callback(sysInfo));
  },
});
