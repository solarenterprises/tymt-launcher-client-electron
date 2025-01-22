// import tymtStorage from "../storage/tymtStorage";

import {
  // CONFIG_LOCAL_SERVER_PORT,
  CONFIG_TYMT_VERSION,
} from "../../config/MainConfig";

// import { ISaltToken } from "../../types/AccountTypes";
import { IGame, IGameReleaseNative } from "../../types/GameTypes";

export async function runUrlArgs(url: string, args: string[]) {
  window.electronAPI.runUrlArgs(url, args);
}

// export async function isInstalled(game: IGame) {
//   try {
//     await readDir(
//       `${window.Electron.app.getPath('appData')('appData')}/v${CONFIG_TYMT_VERSION}/games/${game.project_name}`
//     );
//     return true;
//   } catch (err) {
//     // console.log("Failed to isInstalled: ", err);
//     return false;
//   }
// }

export const runNewGame = async (game: IGame) => {
  try {
    // const fullExecutablePath = await getFullExecutablePathNewGame(game);
    const fullExecutablePath = "C:\\Windows\\System32\\notepad.exe";
    const gameExtension = (
      await getExecutableFileExtension(game)
    ).toLowerCase();

    const platform = await window.electronAPI.getPlatform();

    switch (platform) {
      case "linux":
        switch (gameExtension) {
          case "appimage":
            await runUrlArgs(fullExecutablePath, [
              `--appimage-extract-and-run`,
            ]);
            break;
        }
        break;
      case "win32":
        switch (gameExtension) {
          case "exe":
            await runUrlArgs(fullExecutablePath, []);
            break;
          case "bat":
            await runUrlArgs(fullExecutablePath, []);
            break;
        }
        break;
      case "darwin":
        switch (gameExtension) {
          case "":
            await runUrlArgs(fullExecutablePath, []);
            break;
          case "app":
            await runUrlArgs("open", [`-a`, fullExecutablePath]);
            break;
        }
        break;
    }

    return true;
  } catch (err) {
    // console.error("Failed to runNewGame: ", err);
    return false;
  }
};

// export async function openDir() {
//   return invoke("open_directory", {
//     path: window.Electron.app.getPath('appData')('appData'),
//   });
// }

// export async function openLink(url: string) {
//   try {
//     await open(url);
//   } catch (err) {
//     // console.error("Failed to open link:", err);
//   }
// }

// export const checkOnline = async (): Promise<boolean> => {
//   try {
//     await fetch("https://www.google.com", {
//       mode: "no-cors",
//     });
//     return true;
//   } catch (error) {
//     return false;
//   }
// };

export const downloadFileToAppDir = async (game: IGame) => {
  try {
    const downloadLink: string = await getDownloadLinkNewGame(game);
    const downloadPath: string = await getDownloadFileFullPath(game);

    console.log("downloadFileToAppDir", downloadLink, downloadPath);

    if (!downloadLink || !downloadPath) return false;

    await window.electronAPI.downloadFile(downloadLink, downloadPath);

    return true;
  } catch (err) {
    // console.error("Failed to downloadFileToAppDir: ", err);
    return false;
  }
};

export const installGame = async (game: IGame) => {
  try {
    console.log("installGame");

    const fileLocation: string = await getDownloadFileFullPath(game);
    const installDir: string = await getInstallDir(game);
    if (!fileLocation || !installDir) return false;

    console.log("fileLocation", fileLocation);
    console.log("installDir", installDir);

    const fullExecutablePath = await getFullExecutablePathNewGame(game);
    const sourceExtension = (
      await getDownloadFileExtension(game)
    )?.toLocaleLowerCase();
    const platform = await window.electronAPI.getPlatform();

    switch (platform) {
      case "linux":
        switch (sourceExtension) {
          case "zip":
            await window.electronAPI.unzipFile(fileLocation, installDir);
            break;
          case "appimage":
            await window.electronAPI.moveAppImageLinux(
              fileLocation,
              installDir
            );
            break;
        }
        await window.electronAPI.setPermission(fullExecutablePath);
        break;
      case "win32":
        switch (sourceExtension) {
          case "zip":
            console.log("unzipFile", fileLocation, installDir);
            await window.electronAPI.unzipFile(fileLocation, installDir);
            break;
        }
        break;
      case "darwin":
        switch (sourceExtension) {
          case "zip":
            await window.electronAPI.unzipFile(fileLocation, installDir);
            break;
          case "bz2":
            await window.electronAPI.unTarBz2Macos(fileLocation, installDir);
            break;
        }
        await window.electronAPI.setPermission(fullExecutablePath);
        break;
    }

    return true;
  } catch (err) {
    // console.log("Failed to installGame: ", err);
    return false;
  }
};

export const downloadAndInstallNewGame = async (game: IGame) => {
  try {
    // console.log("downloadAndInstallNewGame");

    await downloadFileToAppDir(game);
    await installGame(game);
    await deleteDownloadFile(game);

    return true;
  } catch (err) {
    // console.error("Failed to downloadAndInstallNewGame: ", err);
    return false;
  }
};

export const getDownloadLinkNewGame = async (game: IGame) => {
  try {
    const fullExecutablePath = await getFullExecutablePathNewGame(game);
    let res = "";
    if (game.projectMeta.type === "browser") {
      return res;
    }

    const platform = await window.electronAPI.getPlatform();
    const cpu = await window.electronAPI.getArch();
    switch (platform) {
      case "linux":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.linux_arm64?.external_url;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.linux_amd64?.external_url;
            break;
        }
        break;
      case "win32":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.windows_arm64?.external_url;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.windows_amd64?.external_url;
            break;
        }
        break;
      case "darwin":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.darwin_arm64?.external_url;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.darwin_amd64?.external_url;
            break;
        }
        break;
    }
    if (fullExecutablePath && !res) {
      res = await getDownloadLinkFromMetaUri(game);
    }
    return res;
  } catch (err) {
    // console.error("Failed to getDownloadLinkNewGame: ", err);
    return "";
  }
};

export const getFullExecutablePathNewGame = async (game: IGame) => {
  try {
    const prefix: string = await window.electronAPI.getAppPath();
    const exePath: string = await getExecutablePathNewGame(game);
    const fullPath =
      prefix + `/v${CONFIG_TYMT_VERSION}/games/${game.project_name}/` + exePath;
    // console.log("getFullExecutablePathNewGame", fullPath);
    return fullPath;
  } catch (err) {
    // console.log("Failed to getFullExecutablePathNewGame: ", err);
    return "";
  }
};

export const getExecutablePathNewGame = async (game: IGame) => {
  try {
    let res = "";
    if (game.projectMeta.type === "browser") {
      return res;
    }
    const platform = await window.electronAPI.getPlatform();
    const cpu = await window.electronAPI.getArch();
    switch (platform) {
      case "linux":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.linux_arm64?.executable;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.linux_amd64?.executable;
            break;
        }
        break;
      case "win32":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.windows_arm64?.executable;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.windows_amd64?.executable;
            break;
        }
        break;
      case "darwin":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.darwin_arm64?.executable;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.darwin_amd64?.executable;
            break;
        }
        break;
    }
    return res;
  } catch (err) {
    // console.error("Failed to getExecutablePathNewGame: ", err);
    return "";
  }
};

export const getDownloadFileNameNewGame = async (game: IGame) => {
  try {
    let res = "";
    if (game.projectMeta.type === "browser") {
      return res;
    }
    const platform = await window.electronAPI.getPlatform();
    const cpu = await window.electronAPI.getArch();
    switch (platform) {
      case "linux":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.linux_arm64?.name;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.linux_amd64?.name;
            break;
        }
        break;
      case "win32":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.windows_arm64?.name;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.windows_amd64?.name;
            break;
        }
        break;
      case "darwin":
        switch (cpu) {
          case "arm":
            res = game?.releaseMeta?.platforms?.darwin_arm64?.name;
            break;
          case "x64":
            res = game?.releaseMeta?.platforms?.darwin_amd64?.name;
            break;
        }
        break;
    }
    return res;
  } catch (err) {
    // console.error("Failed to getDownloadFileNameNewGame: ", err);
    return "";
  }
};

// export const getGameType = (game: IGame) => {
//   try {
//     const res = game?.projectMeta?.type;
//     return res;
//   } catch (err) {
//     // console.log("Failed to getGameType: ", err);
//   }
// };

// export const getGameReleaseBrowser = (game: IGame) => {
//   try {
//     if (game?.projectMeta?.type !== "browser") {
//       return null;
//     }
//     const res = game?.releaseMeta?.platforms?.web;
//     return res;
//   } catch (err) {
//     // console.log("Failed to getGameReleaseBrowser: ", err);
//     return null;
//   }
// };

// export const getGameReleaseNative = async (game: IGame) => {
//   try {
//     if (game?.projectMeta?.type !== "native") {
//       return null;
//     }
//     let res: IGameReleaseNative;
//     const platform = await type();
//     const cpu = await arch();
//     switch (platform) {
//       case "linux":
//         switch (cpu) {
//           case "arm":
//             res = game?.releaseMeta?.platforms?.linux_arm64;
//             break;
//           case "x86_64":
//             res = game?.releaseMeta?.platforms?.linux_amd64;
//             break;
//         }
//         break;
//       case "win32":
//         switch (cpu) {
//           case "arm":
//             res = game?.releaseMeta?.platforms?.windows_arm64;
//             break;
//           case "x86_64":
//             res = game?.releaseMeta?.platforms?.windows_amd64;
//             break;
//         }
//         break;
//       case "darwin":
//         switch (cpu) {
//           case "arm":
//             res = game?.releaseMeta?.platforms?.darwin_arm64;
//             break;
//           case "x86_64":
//             res = game?.releaseMeta?.platforms?.darwin_amd64;
//             break;
//         }
//         break;
//     }
//     return res;
//   } catch (err) {
//     // console.log("Failed to getGameOsCpu: ", err);
//     return null;
//   }
// };

// export const getDownloadSizeNewGame = async (game: IGame) => {
//   try {
//     let res: string = "";
//     if (game?.projectMeta?.type === "browser") {
//       return res;
//     }
//     const gameReleaseNative = await getGameReleaseNative(game);
//     res = gameReleaseNative?.downloadSize;
//     return res;
//   } catch (err) {
//     // console.error("Failed to getDownloadSizeNewGame: ", err);
//     return "";
//   }
// };

// export const getInstallSizeNewGame = async (game: IGame) => {
//   try {
//     let res: string = "";
//     if (game?.projectMeta?.type === "browser") {
//       return res;
//     }
//     const gameReleaseNative = await getGameReleaseNative(game);
//     res = gameReleaseNative?.installSize;
//     return res;
//   } catch (err) {
//     // console.error("Failed to getInstallSizeNewGame: ", err);
//     return "";
//   }
// };

// export const getSupportOSList = (game: IGame) => {
//   try {
//     let res: string[] = [];
//     if (
//       game?.releaseMeta?.platforms?.darwin_amd64 ||
//       game?.releaseMeta?.platforms?.darwin_arm64
//     ) {
//       res = ["darwin", ...res];
//     }
//     if (
//       game?.releaseMeta?.platforms?.linux_amd64 ||
//       game?.releaseMeta?.platforms?.linux_arm64
//     ) {
//       res = ["linux", ...res];
//     }
//     if (
//       game?.releaseMeta?.platforms?.windows_amd64 ||
//       game?.releaseMeta?.platforms?.windows_arm64
//     ) {
//       res = ["win32", ...res];
//     }
//     return res;
//   } catch (err) {
//     // console.log("Failed to getSupportOSList: ", err);
//     return [];
//   }
// };

export const getDownloadFileFullPath = async (game: IGame) => {
  try {
    const fileName = await getDownloadFileNameNewGame(game);
    const res = `${await window.electronAPI.getAppPath()}/${fileName}`;
    // console.log("getDownloadFileFullPath", res);
    return res;
  } catch (err) {
    // console.log("Failed to getDownloadFileFullPath: ", err);
    return "";
  }
};

export const getInstallDir = async (game: IGame) => {
  try {
    const res = `${await window.electronAPI.getAppPath()}/v${CONFIG_TYMT_VERSION}/games/${
      game?.project_name
    }`;
    // console.log("getInstallDir", res);
    return res;
  } catch (err) {
    // console.log("Failed to getInstallDir: ", err);
    return "";
  }
};

export const getDownloadFileExtension = async (game: IGame) => {
  try {
    const fileName = await getDownloadFileNameNewGame(game);
    const parts = fileName.split(".");
    return parts.length > 1 ? parts.pop() || null : null;
  } catch (err) {
    // console.log("Failed to getDownloadFileExtension: ", err);
    return "";
  }
};

export const getExecutableFileExtension = async (game: IGame) => {
  try {
    const url = await getExecutablePathNewGame(game);
    const parts = url.split(".");
    return parts.length > 1 ? parts.pop() || "" : "";
  } catch (err) {
    // console.log("Failed to getExecutableFileExtension:", err);
    return "";
  }
};

export const deleteDownloadFile = async (game: IGame) => {
  try {
    const fullPath = await getDownloadFileFullPath(game);
    // console.log("deleteDownloadFile", fullPath);

    await window.electronAPI.deleteFile(fullPath);

    return true;
  } catch (err) {
    // console.log("Failed to deleteDownloadFile: ", err);
    return false;
  }
};

export const getOsCpu = async () => {
  try {
    const platform = await window.electronAPI.getPlatform();
    const cpu = await window.electronAPI.getArch();

    let resPlatform = "";
    let resCpu = "";

    switch (platform) {
      case "linux":
        resPlatform = "linux";
        break;
      case "win32":
        resPlatform = "win32";
        break;
      case "darwin":
        resPlatform = "darwin";

        break;
    }

    switch (cpu) {
      case "arm":
        resCpu = "arm64";
        break;
      case "x64":
        resCpu = "amd64";
        break;
    }
    const res = `${resPlatform}_${resCpu}`;
    return res;
  } catch (err) {
    // console.log("Failed to getOsCpu: ", err);
  }
};

export const fetchMetaUri = async (game: IGame) => {
  try {
    const metaUri = game?.releaseMeta?.meta_uri;
    const res1 = await fetch(metaUri);
    const res = await res1.json();
    return res;
  } catch (err) {
    // console.log("Failed to fetchMetaUri: ", err);
  }
};

export const getDownloadLinkFromMetaUri = async (game: IGame) => {
  try {
    const data = await fetchMetaUri(game);
    const osCpu = await getOsCpu();
    const res: string = data?.platforms[osCpu]?.external_url;
    return res;
  } catch (err) {
    // console.log("Failed to getDownloadLinkFromMetaUri: ", err);
  }
};
