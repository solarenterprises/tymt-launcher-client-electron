interface Window {
  electronAPI: {
    onCpuInfo: (callback: (cpuInfo: { arch: string; type: string }) => void) => void;

    onSysInfo: (callback: (sysInfo: { cpuArch: string; cpuType: string; osType: string }) => void) => void;

    openExternalLink: (url: string) => void;

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
    moveAppImageLinux: (fileLocation: string, installDir: string) => Promise<void>;
    unTarBz2Macos: (fileLocation: string, installDir: string) => Promise<void>;
    setPermission: (executablePath: string) => Promise<void>;

    // delete file
    deleteFile: (filePath: string) => Promise<void>;
    readDir: (filePath: string) => Promise<boolean>;

    // run url args
    runUrlArgs: (url: string, args: string[]) => Promise<void>;

    openLink: (url: string) => Promise<void>;

    sxpVote: (
      accountStore: IAccount,
      walletStore: IWalletAddresses,
      sxpFee: number,
      password: string,
      voteAsset: IVotingData
    ) => Promise<{ success: boolean; error?: string }>;

    fetchBalanceList: (walletStore: IWalletAddresses) => Promise<IBalance[]>;
  };
}
