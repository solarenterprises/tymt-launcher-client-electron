interface Window {
  electronAPI: {
    onSysInfo: (callback: (sysInfo: { cpuArch: string; cpuType: string; osType: string }) => void) => void;
    
    openExternalLink: (url: string) => void;
    
    onCpuInfo: (
      callback: (cpuInfo: { arch: string; type: string }) => void
    ) => void;

    // system info
    getPlatform: () => Promise<string>;
    getArch: () => Promise<string>;

    // get path
    getAppPath: () => Promise<string>;

    // download file
    downloadFile: (downloadLink: string, downloadPath: string) => Promise<void>;
    onDownloadProgress: (callback: (progress: number) => void) => void;
    onDownloadComplete: (callback: () => void) => void;
    onDownloadFailed: (callback: () => void) => void;

    // extract & install
    unzipFile: (fileLocation: string, installDir: string) => Promise<void>;
    moveAppImageLinux: (
      fileLocation: string,
      installDir: string
    ) => Promise<void>;
    unTarBz2Macos: (fileLocation: string, installDir: string) => Promise<void>;
    setPermission: (executablePath: string) => Promise<void>;

    // delete file
    deleteFile: (filePath: string) => Promise<void>;

    // run url args
    runUrlArgs: (url: string, args: string[]) => Promise<void>;
  };
}
