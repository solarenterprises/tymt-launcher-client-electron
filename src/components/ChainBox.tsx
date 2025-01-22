import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Box, Button, Stack } from "@mui/material";

import { CONST_CURRENCY_SYMBOLS } from "../const/CurrencyConsts";

import { getWallet } from "../store/WalletSlice";
import { getPriceList } from "../store/PriceListSlice";
import { getBalanceList } from "../store/BalanceListSlice";
import { getReserveList } from "../store/ReserveListSlice";
import { getCurrentCurrency } from "../store/CurrentCurrencySlice";
import { getCurrentChain } from "../store/CurrentChainSlice";

import { formatBalance } from "../lib/helper/NumberHelper";
import { getCurrentChainWalletAddress, getTokenBalanceBySymbol, getTokenPriceByCmc } from "../lib/helper/WalletHelper";

import { IPriceList } from "../types/PriceTypes";
import { ICurrentChain, ISupportChain } from "../types/ChainTypes";
import { ICurrentCurrency, IReserveList } from "../types/CurrencyTypes";
import { IBalanceList, IWalletAddresses } from "../types/WalletTypes";

export interface IPropsChainBox {
  supportChain: ISupportChain;
  onClick: () => void;
}

const ChainBox = ({ supportChain, onClick }: IPropsChainBox) => {
  const reserveListStore: IReserveList = useSelector(getReserveList);
  const currentCurrencyStore: ICurrentCurrency = useSelector(getCurrentCurrency);
  const currentChainStore: ICurrentChain = useSelector(getCurrentChain);
  const walletStore: IWalletAddresses = useSelector(getWallet);
  const balanceListStore: IBalanceList = useSelector(getBalanceList);
  const priceListStore: IPriceList = useSelector(getPriceList);

  const isActive: boolean = useMemo(() => currentChainStore?.chain === supportChain?.native?.name, [currentChainStore]);
  const reserve: number = useMemo(
    () => reserveListStore?.list?.find((one) => one?.currency === currentCurrencyStore?.currency)?.reserve ?? 0,
    [reserveListStore, currentCurrencyStore]
  );
  const symbol: string = useMemo(() => CONST_CURRENCY_SYMBOLS[currentCurrencyStore?.currency], [currentCurrencyStore]);
  const balance = useMemo(() => getTokenBalanceBySymbol(balanceListStore, supportChain?.native?.symbol) ?? 0, [balanceListStore]);
  const price = useMemo(() => getTokenPriceByCmc(priceListStore, supportChain?.native?.cmc) ?? 0, [priceListStore]);

  return (
    <Button
      onClick={onClick}
      className={`common-btn ${isActive ? `active` : null}`}
      sx={{
        display: "block",
        textTransform: "none",
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"} sx={{ padding: "20px" }}>
        <Stack gap={2} direction={"row"} justifyContent={"flex-start"}>
          <Box component={"img"} src={supportChain?.native?.logo} width={"32px"} height={"32px"} />
          <Stack direction={"column"} alignItems={"flex-start"} textAlign={"center"} justifyContent={"space-between"} gap={"5px"}>
            <Box className="fs-h5 white">{supportChain?.native?.name}</Box>
            <Box className="fs-12-light blue">{getCurrentChainWalletAddress(walletStore, supportChain?.native?.name)}</Box>
          </Stack>
        </Stack>
        <Stack direction={"column"} alignItems={"flex-end"} gap={"5px"} justifyContent={"space-between"}>
          <Box className="fs-18-light white">{formatBalance(balance, 4)}</Box>
          <Box className="fs-12-light gray">{`${symbol} ${formatBalance(Number(price) * Number(balance) * reserve)}`}</Box>
        </Stack>
      </Stack>
    </Button>
  );
};

export default ChainBox;
