import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

// import { District53 } from "../../lib/game/district 53/District53";
// import { TauriEventNames } from "../../consts/TauriEventNames";

import { Button, Stack, Box } from "@mui/material";

import D53Modal from "../home/D53Modal";
import WarningModalNewGame from "../home/WarningModalNewGame";

import { getDownloadStatus, setDownloadStatus } from "../../store/DownloadStatusSlice";

import {
  checkOnline,
  downloadAndInstallNewGame,
  getFullExecutablePathNewGame,
  getGameReleaseBrowser,
  isInstalled,
  openLink,
} from "../../lib/helper/DownloadHelper";

import { CONST_GAME_DISTRICT53 } from "../../const/games/district53/District53";

import { IGame } from "../../types/GameTypes";
// import { INotificationGameDownloadParams, INotificationParams } from "../../types/NotificationTypes";
import { IDownloadStatus } from "../../types/HomeTypes";
import ElectronNotification from "../EelectronNotification";
// import { ipcRenderer } from "electron";

export interface IPropsInstallButton {
  game: IGame;
}

const InstallButton = ({ game }: IPropsInstallButton) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const downloadStatusStore: IDownloadStatus = useSelector(getDownloadStatus);

  const { showNotification } = ElectronNotification();

  const [modalView, setModalView] = useState<boolean>(false);
  const [d53ModalView, setD53ModalView] = useState<boolean>(false);
  const [isSupporting, setIsSupporting] = useState<boolean>(false);
  const [installed, setInstalled] = useState(false);

  const handleClick = useCallback(async () => {
    if (game?.projectMeta?.type === "browser") {
      const externalUrl = getGameReleaseBrowser(game)?.external_url;
      if (!externalUrl) return;
      openLink(externalUrl);
      return;
    }
    if (installed) {
      if (game?._id === CONST_GAME_DISTRICT53?._id) setD53ModalView(true);
      else setModalView(true);
      return;
    }
    const id = game?.project_name;
    if (!id) return;
    const online = await checkOnline();
    if (!online) {
      // const noti_0: INotificationParams = {
      //   status: "failed",
      //   title: t("alt-26_internet-error"),
      //   message: t("alt-27_you-not-connected"),
      //   link: null,
      //   translate: false,
      // };
      // emit(TauriEventNames.NOTIFICATION, noti_0);
      showNotification(t("alt-26_internet-error"), t("alt-27_you-not-connected"));
      return;
    }
    // const noti_1: INotificationGameDownloadParams = {
    //   status: "started",
    //   game: game,
    // };
    // emit(TauriEventNames.GAME_DOWNLOAD, noti_1);
    dispatch(setDownloadStatus({ isDownloading: true, game: game }));
    await downloadAndInstallNewGame(game);
    dispatch(setDownloadStatus({ isDownloading: false, game: game }));
    // if (!success) {
    //   const noti_1: INotificationGameDownloadParams = {
    //     status: "failed",
    //     game: game,
    //   };
    //   emit(TauriEventNames.GAME_DOWNLOAD, noti_1);
    // } else {
    //   const noti_3: INotificationGameDownloadParams = {
    //     status: "finished",
    //     game: game,
    //   };
    //   emit(TauriEventNames.GAME_DOWNLOAD, noti_3);
    // }
    setInstalled(await isInstalled(game));
  }, [game, installed]);

  useEffect(() => {
    const checkSupport = async () => {
      const fullPath = await getFullExecutablePathNewGame(game);
      if (!fullPath) setIsSupporting(false);
      else setIsSupporting(true);
    };
    checkSupport();
  }, [game]);

  useEffect(() => {
    const checkInstalled = async (game: IGame) => {
      setInstalled(await isInstalled(game));
    };

    const intervalId = setInterval(() => checkInstalled(game), 1 * 1e3);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [game]);

  useEffect(() => {
    window.electronAPI.onDownloadProgress((progress: number) => {
      dispatch(setDownloadStatus({ isDownloading: true, progress: progress, total: 100, game: game }));
    });
  }, []);

  return (
    <>
      <Button
        fullWidth
        onClick={handleClick}
        disabled={!isSupporting || downloadStatusStore?.isDownloading}
        sx={{
          height: "46px",
          width: "226px",
          color: "white",
          fontFamily: "Cobe-Bold",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          borderRadius: "16px",
          backgroundColor: "#ef4444",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#992727",
          },
          "&.Mui-disabled": {
            backgroundColor: "#2a2525",
            color: "#7c7c7c",
          },
        }}
      >
        {!isSupporting && `Not supported`}
        {isSupporting && !installed && !downloadStatusStore?.isDownloading && t("hom-20_install-game")}
        {isSupporting && installed && !downloadStatusStore?.isDownloading && t("hom-7_play-game")}
        {downloadStatusStore?.isDownloading && (
          <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
            <Box className={"fs-14-regular white t-center"}>{`${t("hom-21_downloading")}`}</Box>
            <ThreeDots height="12px" width={"24px"} radius={4} color={`white`} />
          </Stack>
        )}
      </Button>
      <WarningModalNewGame open={modalView} setOpen={setModalView} game={game} />
      <D53Modal open={d53ModalView} setOpen={setD53ModalView} />
    </>
  );
};

export default InstallButton;
