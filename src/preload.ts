// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { IAccount } from "./types/AccountTypes";
import { IVotingData, IWalletAddresses } from "./types/WalletTypes";
import { IRecipient } from "./types/TransactionTypes";

contextBridge.exposeInMainWorld("electronAPI", {
  onSysInfo: (callback: (sysInfo: { cpuArch: string; cpuType: string; osType: string }) => void) => {
    ipcRenderer.on("sys-info", (_, sysInfo) => callback(sysInfo));
  },

  openExternalLink: (url: string) => ipcRenderer.send("open-external-link", url),

  // system info
  getPlatform: () => ipcRenderer.invoke("get-platform"),
  getArch: () => ipcRenderer.invoke("get-arch"),

  // get path
  getAppPath: () => ipcRenderer.invoke("get-app-path"),

  // download file
  downloadFile: (downloadLink: string, downloadPath: string) => ipcRenderer.invoke("download-file", { downloadLink, downloadPath }),
  onDownloadProgress: (callback: (progress: number) => void) => ipcRenderer.on("download-progress", (event, progress) => callback(progress)),

  // extract & install
  unzipFile: (fileLocation: string, installDir: string) => ipcRenderer.invoke("unzip-file", { fileLocation, installDir }),
  moveAppImageLinux: (fileLocation: string, installDir: string) => ipcRenderer.invoke("move-app-image-linux", { fileLocation, installDir }),
  unTarBz2Macos: (fileLocation: string, installDir: string) => ipcRenderer.invoke("un-tar-bz2-macos", { fileLocation, installDir }),
  setPermission: (executablePath: string) => ipcRenderer.invoke("set-permission", executablePath),

  // delete file
  deleteFile: (filePath: string) => ipcRenderer.invoke("delete-file", filePath),

  // directory
  readDir: (dirPath: string) => ipcRenderer.invoke("read-dir", dirPath),
  openDir: (dirPath: string) => ipcRenderer.invoke("open-dir", dirPath),
  deleteDir: (dirPath: string) => ipcRenderer.invoke("delete-dir", dirPath),

  // run url args
  runUrlArgs: (url: string, args: string[]) => ipcRenderer.invoke("run-url-args", { url, args }),


  // open link
  openLink: (url: string) => ipcRenderer.invoke("open-link", url),

  sxpVote: (accountStore: IAccount, walletStore: IWalletAddresses, sxpFee: number, password: string, voteAsset: IVotingData) => {
    return ipcRenderer.invoke("sxp-vote", accountStore, walletStore, sxpFee, password, voteAsset);
  },

  transferCoin: (passphrase: string, tx: { recipients: IRecipient[]; fee: string }) => {
    return ipcRenderer.invoke("transfer-coin", passphrase, tx);
  },

  fetchBalanceList: (walletStore: IWalletAddresses) => {
    return ipcRenderer.invoke("fetch-balance-list", walletStore);
  },

  fetch: (url: string, init?: RequestInit) => ipcRenderer.invoke("fetch", { url, init }),
});
