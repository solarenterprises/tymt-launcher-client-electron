import { CONST_SYSINFO_CPU, CONST_SYSINFO_OS } from "../../const/SysInfoConsts";
import { ElectronAPI } from "../api/ElectronAPI";
import { IGame, IGameReleaseNative } from "../../types/GameTypes";

export const getGameReleaseNative = async (game: IGame) => {
  try {
    if (game?.projectMeta?.type !== "native") {
      return null;
    }
    let res: IGameReleaseNative;
    const sysInfo = await ElectronAPI.getSystemInfo();
    const platform = sysInfo.osType;
    const cpu = sysInfo.cpuArch;
    switch (platform) {
      case CONST_SYSINFO_OS.LINUX:
        switch (cpu) {
          case CONST_SYSINFO_CPU.ARM64:
            res = game?.releaseMeta?.platforms?.linux_arm64;
            break;
          case CONST_SYSINFO_CPU.X86_64:
            res = game?.releaseMeta?.platforms?.linux_amd64;
            break;
        }
        break;
      case CONST_SYSINFO_OS.WINDOWS:
        switch (cpu) {
          case CONST_SYSINFO_CPU.ARM64:
            res = game?.releaseMeta?.platforms?.windows_arm64;
            break;
          case CONST_SYSINFO_CPU.X86_64:
            res = game?.releaseMeta?.platforms?.windows_amd64;
            break;
        }
        break;
      case CONST_SYSINFO_OS.MACOS:
        switch (cpu) {
          case CONST_SYSINFO_CPU.ARM64:
            res = game?.releaseMeta?.platforms?.darwin_arm64;
            break;
          case CONST_SYSINFO_CPU.X86_64:
            res = game?.releaseMeta?.platforms?.darwin_amd64;
            break;
        }
        break;
    }
    return res;
  } catch (err) {
    console.error("Failed to getGameReleaseNative: ", err);
  }
};

export const getGameDownloadSize = async (game: IGame) => {
  try {
    let res = "";
    if (game?.projectMeta?.type === "browser") {
      return res;
    }
    const gameReleaseNative = await getGameReleaseNative(game);
    res = gameReleaseNative?.downloadSize;
    return res;
  } catch (err) {
    console.error("Failed to getGameDownloadSize: ", err);
    return "";
  }
};

export const getGameInstallSize = async (game: IGame) => {
  try {
    let res = "";
    if (game?.projectMeta?.type === "browser") {
      return res;
    }
    const gameReleaseNative = await getGameReleaseNative(game);
    res = gameReleaseNative?.installSize;
    return res;
  } catch (err) {
    console.error("Failed to getGameInstallSize: ", err);
    return "";
  }
};

export const getSupportOSList = (game: IGame) => {
  try {
    let res: string[] = [];
    if (game?.releaseMeta?.platforms?.darwin_amd64 || game?.releaseMeta?.platforms?.darwin_arm64) {
      res = [CONST_SYSINFO_OS.MACOS, ...res];
    }
    if (game?.releaseMeta?.platforms?.linux_amd64 || game?.releaseMeta?.platforms?.linux_arm64) {
      res = [CONST_SYSINFO_OS.LINUX, ...res];
    }
    if (game?.releaseMeta?.platforms?.windows_amd64 || game?.releaseMeta?.platforms?.windows_arm64) {
      res = [CONST_SYSINFO_OS.WINDOWS, ...res];
    }
    return res;
  } catch (err) {
    console.error("Failed to getSupportOSList: ", err);
    return [];
  }
};
