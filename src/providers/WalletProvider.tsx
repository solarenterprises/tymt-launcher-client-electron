import React, { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { useSelector } from "react-redux";

import { CONST_CURRENCY_SYMBOLS } from "../const/CurrencyConsts";
import { CONST_CHAIN_NAMES, CONST_SUPPORT_CHAINS } from "../const/ChainConsts";

import { getCurrentChain } from "../store/CurrentChainSlice";
import { getCurrentCurrency } from "../store/CurrentCurrencySlice";
import { getCurrentToken } from "../store/CurrentTokenSlice";
import { getWallet } from "../store/WalletSlice";
import { getPriceList } from "../store/PriceListSlice";
import { getBalanceList } from "../store/BalanceListSlice";
import { getReserveList } from "../store/ReserveListSlice";

import {
  getCurrentChainWalletAddress,
  getExplorerUrl,
  getNativeTokenBalanceByChainName,
  getNativeTokenPriceByChainName,
  getSupportChainByName,
  getTokenBalanceBySymbol,
  getTokenPriceByCmc,
} from "../lib/helper/WalletHelper";

import { ICurrentChain, ISupportChain } from "../types/ChainTypes";
import { ICurrentCurrency, IReserveList } from "../types/CurrencyTypes";
import { IBalanceList, ICurrentToken, IWalletAddresses } from "../types/WalletTypes";
import { IPriceList } from "../types/PriceTypes";

interface WalletContextType {
  sxpPrice: number;
  sxpBalance: number;
  sxpAddress: string;
  currentSupportChain: ISupportChain;
  currentChainWalletAddress: string;
  currentChainExplorerUrl: string;
  currentCurrencyReserve: number;
  currentCurrencySymbol: string;
  currentChainNativePrice: number;
  currentChainNativeBalance: number;
  totalBalance: number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const currentChainStore: ICurrentChain = useSelector(getCurrentChain);
  const currentCurrencyStore: ICurrentCurrency = useSelector(getCurrentCurrency);
  const currentTokenStore: ICurrentToken = useSelector(getCurrentToken);
  const walletStore: IWalletAddresses = useSelector(getWallet);
  const priceListStore: IPriceList = useSelector(getPriceList);
  const balanceListStore: IBalanceList = useSelector(getBalanceList);
  const reserveListStore: IReserveList = useSelector(getReserveList);

  const sxpPrice = useMemo(() => getNativeTokenPriceByChainName(priceListStore, CONST_CHAIN_NAMES?.SOLAR), [priceListStore]);
  const sxpBalance = useMemo(() => getNativeTokenBalanceByChainName(balanceListStore, CONST_CHAIN_NAMES?.SOLAR), [balanceListStore]);
  const sxpAddress = useMemo(() => walletStore?.solar, [walletStore]);

  const currentSupportChain = useMemo(() => getSupportChainByName(currentChainStore?.chain), [currentChainStore]);
  const currentChainWalletAddress: string = useMemo(
    () => getCurrentChainWalletAddress(walletStore, currentChainStore?.chain),
    [walletStore, currentChainStore]
  );
  const currentChainExplorerUrl: string = useMemo(() => getExplorerUrl(currentSupportChain, walletStore), [currentSupportChain, walletStore]);
  const currentCurrencyReserve: number = useMemo(
    () => reserveListStore?.list?.find((one) => one?.currency === currentCurrencyStore?.currency)?.reserve,
    [reserveListStore, currentCurrencyStore]
  );
  const currentCurrencySymbol: string = useMemo(() => CONST_CURRENCY_SYMBOLS[currentCurrencyStore?.currency], [currentCurrencyStore]);
  const currentChainNativeBalance = useMemo(
    () => getTokenBalanceBySymbol(balanceListStore, currentSupportChain?.native?.symbol),
    [balanceListStore, currentSupportChain]
  );
  const currentChainNativePrice = useMemo(() => getTokenPriceByCmc(priceListStore, currentSupportChain?.native?.cmc), [priceListStore, currentSupportChain]);
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
    const res = total * currentCurrencyReserve;
    return res;
  }, [balanceListStore, priceListStore, currentCurrencyReserve]);

  return (
    <WalletContext.Provider
      value={{
        sxpPrice,
        sxpBalance,
        sxpAddress,
        currentSupportChain,
        currentChainWalletAddress,
        currentChainExplorerUrl,
        currentCurrencyReserve,
        currentChainNativePrice,
        currentChainNativeBalance,
        currentCurrencySymbol,
        totalBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
