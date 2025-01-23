import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import numeral from "numeral";

import { Box, Button, Divider, Stack, Tooltip } from "@mui/material";

import { CONST_SUPPORT_CHAINS } from "../../const/ChainConsts";
import { CONST_CURRENCY_SYMBOLS } from "../../const/CurrencyConsts";

import Avatar from "../../components/home/Avatar";

import { getAccount } from "../../store/AccountSlice";
import { getCurrentChain } from "../../store/CurrentChainSlice";
import { getWallet } from "../../store/WalletSlice";
import { getBalanceList } from "../../store/BalanceListSlice";
import { getPriceList } from "../../store/PriceListSlice";
import { getReserveList } from "../../store/ReserveListSlice";
import { getCurrentCurrency } from "../../store/CurrentCurrencySlice";

import { ElectronAPI } from "../../lib/api/ElectronAPI";

import { getCurrentChainWalletAddress, getExplorerUrl } from "../../lib/helper/WalletHelper";

import { IAccount } from "../../types/AccountTypes";
import { IPriceList } from "../../types/PriceTypes";
import { ICurrentChain, ISupportChain } from "../../types/ChainTypes";
import { IBalanceList, IWalletAddresses } from "../../types/WalletTypes";
import { ICurrentCurrency, IReserveList } from "../../types/CurrencyTypes";

import SettingStyle from "../../styles/SettingStyle";

import settingImg from "../../assets/setting/SettingIcon1.svg";
import walletImg from "../../assets/setting/WalletIcon.svg";
import arrowImg from "../../assets/setting/ArrowRight.svg";
import copyIcon from "../../assets/setting/CopyIcon.svg";
import searchIcon from "../../assets/setting/SearchIcon.svg";
import exitIcon from "../../assets/setting/ExitIcon.svg";

export interface IPropsMain {
  view: string;
  setView: (_: string) => void;
}

const Main = ({ view, setView }: IPropsMain) => {
  const classname = SettingStyle();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const accountStore: IAccount = useSelector(getAccount);
  const walletStore: IWalletAddresses = useSelector(getWallet);
  const balanceListStore: IBalanceList = useSelector(getBalanceList);
  const priceListStore: IPriceList = useSelector(getPriceList);
  const reserveListStore: IReserveList = useSelector(getReserveList);
  const currentChainStore: ICurrentChain = useSelector(getCurrentChain);
  const currentCurrencyStore: ICurrentCurrency = useSelector(getCurrentCurrency);

  const currentSupportChain: ISupportChain = useMemo(
    () => CONST_SUPPORT_CHAINS.find((one) => one?.native?.name === currentChainStore?.chain),
    [currentChainStore]
  );
  const currentChainWalletAddress: string = useMemo(
    () => getCurrentChainWalletAddress(walletStore, currentChainStore?.chain),
    [walletStore, currentChainStore]
  );
  const currentChainNativeBalance = useMemo(
    () => balanceListStore?.list?.find((one) => one?.symbol === currentSupportChain?.native?.symbol)?.balance,
    [balanceListStore, currentSupportChain]
  );
  const currentChainNativePrice = useMemo(
    () => priceListStore?.list?.find((one) => one?.cmc === currentSupportChain?.native?.cmc)?.price,
    [priceListStore, currentSupportChain]
  );
  const currentCurrencySymbol: string = useMemo(() => CONST_CURRENCY_SYMBOLS[currentCurrencyStore?.currency], [currentCurrencyStore]);
  const reserve: number = useMemo(
    () => reserveListStore?.list?.find((one) => one?.currency === currentCurrencyStore?.currency)?.reserve,
    [reserveListStore, currentCurrencyStore]
  );
  const totalBalance = useMemo(() => {
    let total = 0;
    for (const supportChain of CONST_SUPPORT_CHAINS ?? []) {
      const nativeBalance = balanceListStore?.list?.find((one) => one?.symbol === supportChain?.native?.symbol)?.balance;
      const nativePrice = priceListStore?.list?.find((one) => one?.cmc === supportChain?.native?.cmc)?.price;
      total += (nativeBalance ?? 0) * (nativePrice ?? 0);

      for (const token of supportChain?.tokens ?? []) {
        const tokenBalance = balanceListStore?.list?.find((one) => one?.symbol === token?.symbol)?.balance;
        const tokenPrice = priceListStore?.list?.find((one) => one?.cmc === token?.cmc)?.price;
        total += (tokenBalance ?? 0) * (tokenPrice ?? 0);
      }
    }
    const res = total * reserve;
    return res;
  }, [balanceListStore, priceListStore, reserve]);

  const handleExplorer = useCallback(() => {
    const url = getExplorerUrl(currentSupportChain, walletStore);
    console.log(url);
    ElectronAPI.openExternalLink(url);
  }, [currentSupportChain]);

  return (
    <>
      {view === "main" && (
        <Box className={classname.main_container}>
          <Box
            onClick={() => setView("chooseProfile")}
            className={classname.user_pad}
            sx={{
              transition: "all 0.3s ease",
              cursor: "pointer",
              borderRadius: "22px 22px 0px 0px",
              "&:hover": {
                backgroundColor: "#ffffff1a",
              },
            }}
          >
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Box className="center-align">
                <Avatar onlineStatus={true} url="" size={60} status={"active"} />
              </Box>
              <Box className="center-align" sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                <Box className="fs-14-light white">{t("set-1_welcome")}</Box>
                <Box className="fs-h4 white">{accountStore?.nickName}</Box>
              </Box>
              <Box component={"img"} src={arrowImg} />
            </Box>
            <Box>
              <Button
                className="button_navbar_common"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setView("general");
                }}
                sx={{ padding: 0 }}
              >
                <img src={settingImg} />
              </Button>
            </Box>
          </Box>
          <Divider variant="middle" sx={{ backgroundColor: "#FFFFFF1A" }} />
          <Button
            onClick={() => setView("chain")}
            className="center-align common-btn"
            sx={{
              padding: "16px 16px",
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"} textAlign={"center"} alignItems={"center"}>
              <Box className="center-align" sx={{ gap: "10px" }}>
                <Box className="center-align" sx={{ position: "relative" }}>
                  <img src={walletImg} />
                  <img
                    src={currentSupportChain?.native?.logo}
                    style={{
                      position: "absolute",
                      right: "0px",
                      bottom: "0px",
                      width: "20px",
                    }}
                  />
                </Box>
                <Box
                  className="center-align"
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginLeft: "10px",
                  }}
                >
                  <Box className="fs-14-light gray">{t("set-3_connected-chain")}:</Box>
                  <Box className="fs-14-light white">{currentSupportChain?.native?.name}</Box>
                </Box>
              </Box>
              <Box className="center-align">
                <img src={arrowImg} />
              </Box>
            </Stack>
          </Button>
          <Divider variant="middle" sx={{ backgroundColor: "#FFFFFF1A" }} />
          <Box className={classname.addresss_pad}>
            <Box className={classname.wallet_add_panel} sx={{ justifyContent: "space-between" }}>
              <Box
                sx={{
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Box className="fs-14-light gray">{t("set-2_connected-wallet-address")}:</Box>
                <Box className="fs-14-light blue">{currentChainWalletAddress ?? ""}</Box>
                <Box className="fs-14-light gray">
                  {`${t("set-4_balance")} ${numeral(currentChainNativeBalance ?? 0).format("0,0.0000")} ${currentSupportChain?.native?.symbol} (${numeral(
                    (currentChainNativeBalance ?? 0) * (currentChainNativePrice ?? 0)
                  ).format("0,0.00")} ${currentCurrencySymbol})`}
                </Box>
                <Box className="fs-14-light gray">{`${t("set-88_total_balance")} ${numeral(totalBalance).format("0,0.00")} ${currentCurrencySymbol}`}</Box>
              </Box>
            </Box>
            <Divider variant="middle" sx={{ backgroundColor: "#FFFFFF1A" }} />
            <Box className={classname.icon_pad}>
              <Button className="tooltip-btn" onClick={() => navigator.clipboard.writeText(currentChainWalletAddress ?? "")}>
                <Tooltip title={t("set-79_copy-address")} classes={{ tooltip: classname.tooltip }}>
                  <Box className="center-align">
                    <img src={copyIcon} data-tooltip-id="copy-tooltip" />
                  </Box>
                </Tooltip>
              </Button>
              <Button className="tooltip-btn" onClick={handleExplorer}>
                <Tooltip title={t("set-80_open-in-explorer")} classes={{ tooltip: classname.tooltip }}>
                  <Box className="center-align">
                    <img src={searchIcon} />
                  </Box>
                </Tooltip>
              </Button>
              <Button className="tooltip-btn" onClick={() => navigate("/welcome")}>
                <Tooltip title={t("set-81_disconnect")} classes={{ tooltip: classname.tooltip }}>
                  <Box className="center-align">
                    <img src={exitIcon} />
                  </Box>
                </Tooltip>
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Main;
