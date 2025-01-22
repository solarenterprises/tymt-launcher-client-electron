import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Divider, Stack } from "@mui/material";

import { CONST_SUPPORT_CHAINS } from "../../const/ChainConsts";

import ChainBox from "../../components/ChainBox";

import { AppDispatch } from "../../store";
import { getWallet } from "../../store/WalletSlice";
import { setCurrentChain } from "../../store/CurrentChainSlice";

import { getCurrentChainWalletAddress } from "../../lib/helper/WalletHelper";

import { IWalletAddresses } from "../../types/WalletTypes";
import { ISupportChain } from "../../types/ChainTypes";

import backIcon from "../../assets/setting/BackIcon.svg";

export interface IPropsChain {
  view: string;
  setView: (_: string) => void;
}

const Chain = ({ view, setView }: IPropsChain) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const walletStore: IWalletAddresses = useSelector(getWallet);

  const handleChainBoxClick = (one: ISupportChain) => {
    dispatch(setCurrentChain(one?.native?.name));
    setView("main");
  };

  // const copyAddress = useCallback(
  //   (one: ISupportChain) => {
  //     const chainName = one?.native?.name;
  //     const address = getCurrentChainWalletAddress(walletStore, chainName);
  //     navigator.clipboard.writeText(address);
  //   },
  //   [walletStore]
  // );

  return (
    <>
      {view === "chain" && (
        <Stack direction={"column"}>
          <Stack flexDirection={"row"} justifyContent={"flex-start"} gap={"10px"} alignItems={"center"} textAlign={"center"} sx={{ padding: "20px" }}>
            <Button className={"setting-back-button"} onClick={() => setView("main")}>
              <Box component={"img"} src={backIcon}></Box>
            </Button>
            <Box className="fs-h3 white">{t("set-5_choose-chain")}</Box>
          </Stack>
          <Divider variant="middle" sx={{ backgroundColor: "#FFFFFF1A" }} />
          <Stack>
            {CONST_SUPPORT_CHAINS?.map((one, index) => (
              <ChainBox
                supportChain={one}
                key={index}
                onClick={() => {
                  handleChainBoxClick(one);
                }}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Chain;
