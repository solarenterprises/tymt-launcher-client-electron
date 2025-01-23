interface Window {
  electronAPI: {
    onSysInfo: (callback: (sysInfo: { cpuArch: string; cpuType: string; osType: string }) => void) => void;
    openExternalLink: (url: string) => void;
    // Add other API methods here
  };
}
