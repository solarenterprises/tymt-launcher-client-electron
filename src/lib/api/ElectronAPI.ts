export class ElectronAPI {
  static async getSystemInfo(): Promise<{ osType: string; cpuArch: string; cpuType: string }> {
    return new Promise((resolve) => {
      window.electronAPI.onSysInfo((sysInfo) => {
        resolve({
          osType: sysInfo.osType,
          cpuArch: sysInfo.cpuArch,
          cpuType: sysInfo.cpuType,
        });
      });
    });
  }

  static async openExternalLink(url: string): Promise<void> {
    return new Promise((resolve) => {
      window.electronAPI.openExternalLink(url);
      resolve();
    });
  }
}
