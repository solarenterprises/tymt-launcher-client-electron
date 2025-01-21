import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Grid } from "@mui/material";

import { CONST_GAME_LIST } from "../../const/games/GameConsts";

import StoreGameCard from "./StoreGameCard";
import AnimatedComponent from "../home/AnimatedComponent";

export interface IPropsStoreGameItems {
  platform?: string;
  genre?: string;
  releaseDate?: string;
  rank?: string;
  type?: string;
  keyword?: string;
}

const StoreGameItems = ({ platform, genre, rank, type, keyword }: IPropsStoreGameItems) => {
  return (
    <Grid item xs={12} container spacing={"32px"} sx={{ width: "100%", marginTop: "0px" }}>
      {CONST_GAME_LIST?.map((game, index) => (
        <Grid item>
          <AnimatedComponent>
            <StoreGameCard key={`${game?._id}-${index}`} game={game} isComing={CONST_GAME_LIST.some((element) => element._id === game._id)} />
          </AnimatedComponent>
        </Grid>
      ))}
    </Grid>
  );
};

export default StoreGameItems;
