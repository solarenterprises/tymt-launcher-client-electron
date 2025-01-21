import { IGame, IGameReleaseNative } from "../../types/GameTypes";

export const getGameReleaseNative = async (game: IGame) => {
  try {
    if (game?.projectMeta?.type !== "native") {
      return null;
    }
    let res: IGameReleaseNative;
    // const platform = await type();
    // const cpu = await arch();
    const platform: string = "windows";
    const cpu: string = "x86_64";
    switch (platform) {
      case "linux":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.linux_arm64;
            break;
          case "x86_64":
            res = game?.releaseMeta?.platforms?.linux_amd64;
            break;
        }
        break;
      case "windows":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.windows_arm64;
            break;
          case "x86_64":
            res = game?.releaseMeta?.platforms?.windows_amd64;
            break;
        }
        break;
      case "macos":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.darwin_arm64;
            break;
          case "x86_64":
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
    let res: string = "";
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
    let res: string = "";
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
      res = ["darwin", ...res];
    }
    if (game?.releaseMeta?.platforms?.linux_amd64 || game?.releaseMeta?.platforms?.linux_arm64) {
      res = ["linux", ...res];
    }
    if (game?.releaseMeta?.platforms?.windows_amd64 || game?.releaseMeta?.platforms?.windows_arm64) {
      res = ["windows", ...res];
    }
    return res;
  } catch (err) {
    console.error("Failed to getSupportOSList: ", err);
    return [];
  }
};
