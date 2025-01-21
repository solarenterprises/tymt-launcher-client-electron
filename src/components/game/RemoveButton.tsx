import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

// import { isInstalled } from "../../lib/helper/DownloadHelper";

import { IGame } from "../../types/GameTypes";

export interface IPropsRemoveButton {
  game: IGame;
}

const RemoveButton = ({ game }: IPropsRemoveButton) => {
  // const [installed, setInstalled] = useState<boolean>(false);

  // const disabled = useMemo(() => removeStatusStore?.games?.some((one) => one._id === game._id) || !installed, [removeStatusStore, installed]);
  const disabled = false;

  const handleClick = async () => {};

  // useEffect(() => {
  //   const checkInstalled = async (game: IGame) => {
  //     setInstalled(await isInstalled(game));
  //   };

  //   let intervalId = setInterval(() => checkInstalled(game), 1 * 1e3);

  //   return () => {
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [game]);

  return (
    <>
      <Button className="button_navbar_common" disabled={disabled} onClick={handleClick}>
        <DeleteOutlineRoundedIcon
          sx={{
            color: "white",
          }}
        />
      </Button>
    </>
  );
};

export default RemoveButton;
