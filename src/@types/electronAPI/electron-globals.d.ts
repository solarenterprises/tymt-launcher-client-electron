interface Window {
  electronAPI: {
    onCpuInfo: (callback: (cpuInfo: { arch: string; type: string }) => void) => void;
    // Add other API methods here
  };
}
