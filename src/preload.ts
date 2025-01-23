// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  onSysInfo: (callback: (sysInfo: { cpuArch: string; cpuType: string; osType: string }) => void) => {
    ipcRenderer.on("sys-info", (_, sysInfo) => callback(sysInfo));
  },
  openExternalLink: (url: string) => {
    ipcRenderer.send("open-external-link", url);
  },

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

  // extract & install
  unzipFile: (fileLocation: string, installDir: string) =>
    ipcRenderer.invoke("unzip-file", { fileLocation, installDir }),
  moveAppImageLinux: (fileLocation: string, installDir: string) =>
    ipcRenderer.invoke("move-app-image-linux", { fileLocation, installDir }),
  unTarBz2Macos: (fileLocation: string, installDir: string) =>
    ipcRenderer.invoke("un-tar-bz2-macos", { fileLocation, installDir }),
  setPermission: (executablePath: string) =>
    ipcRenderer.invoke("set-permission", { executablePath }),

  // delete file
  deleteFile: (filePath: string) =>
    ipcRenderer.invoke("delete-file", { filePath }),

  // run url args
  runUrlArgs: (url: string, args: string[]) =>
    ipcRenderer.invoke("run-url-args", { url, args }),
});
