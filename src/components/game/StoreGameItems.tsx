import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Grid } from "@mui/material";

import { CONST_GAME_LIST } from "../../const/games/GameConsts";

import StoreGameCard from "./StoreGameCard";
import AnimatedComponent from "../home/AnimatedComponent";
import { IGame } from "../../types/GameTypes";
import { filterByPlatform, filterByGenre, filterByRank, filterByType, filterByKeyword } from "../../lib/helper/FilterHelper";

export interface IPropsStoreGameItems {
  platform?: string;
  genre?: string;
  releaseDate?: string;
  rank?: string;
  type?: string;
  keyword?: string;
}

const StoreGameItems = ({ platform, genre, rank, type, keyword }: IPropsStoreGameItems) => {
  const resultGames: IGame[] = useMemo(() => {
    let data = [...CONST_GAME_LIST];
    if (platform) data = filterByPlatform(data, platform);
    if (genre) data = filterByGenre(data, genre);
    // if (releaseDate) data = filterByReleaseDate(data, releaseDate);
    if (rank) data = filterByRank(data, rank);
    if (type) data = filterByType(data, type);
    if (keyword) data = filterByKeyword(data, keyword);
    return data;
  }, [platform, genre, rank, type, keyword]);

  return (
    <Grid item xs={12} container spacing={"32px"} sx={{ width: "100%", marginTop: "0px" }}>
      {resultGames?.map((game, index) => (
        <Grid key={index} item>
          <AnimatedComponent>
            <StoreGameCard key={`${game?._id}-${index}`} game={game} isComing={CONST_GAME_LIST.some((element) => element._id === game._id)} />
          </AnimatedComponent>
        </Grid>
      ))}
    </Grid>
  );
};

export default StoreGameItems;
