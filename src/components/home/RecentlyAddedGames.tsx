import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Grid, Box } from "@mui/material";

import { COSNT_GAME_LIST } from "../../const/games/GameConsts";

import AnimatedComponent from "../AnimatedComponent";
import StoreGameCard from "../store/StoreGameCard";

const RecentlyAddedGames = () => {
  const { t } = useTranslation();

  return (
    <>
      <Grid item xs={12} container sx={{ position: "relative" }}>
        <Grid container sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box className={"fs-38-bold"} color={"white"} textTransform={"none"}>
            {t("hom-10_recently-added")}
          </Box>
        </Grid>
        <Grid container sx={{ width: "100%", marginTop: "0px" }} spacing={"32px"}>
          {COSNT_GAME_LIST?.map((game, index) => (
            <Grid item key={index}>
              <AnimatedComponent>
                <StoreGameCard game={game} isComing={false} />
              </AnimatedComponent>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default RecentlyAddedGames;
