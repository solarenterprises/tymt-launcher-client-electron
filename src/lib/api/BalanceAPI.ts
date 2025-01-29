import { CONST_CHAIN_NAMES, CONST_SUPPORT_CHAINS } from "../../const/ChainConsts";

import TymtCore from "../core/TymtCore";

import { getCurrentChainWalletAddress, getNativeSymbolByChainName, getSupportTokensByChainName } from "../../lib/helper/WalletHelper";

import { IBalance, IWalletAddresses } from "../../types/WalletTypes";
import { IParamsFetchChainBalance } from "../../types/APITypes/BalanceAPITypes";

export class BalanceAPI {
  static fetchBalanceList = async (walletStore: IWalletAddresses) => {
    try {
      const asyncFunctions = CONST_SUPPORT_CHAINS?.map((one) =>
        this.fetchChainBalance({
          walletStore: walletStore,
          chainName: one?.native?.name,
        })
      );
      const result = await Promise.all(asyncFunctions);
      const flattenedResult = result?.flat();
      return flattenedResult;
    } catch (err) {
      console.error("Failed to fetchBalanceList: ", err);
    }
  };

  static fetchChainBalance = async ({ walletStore, chainName }: IParamsFetchChainBalance) => {
    try {
      const walletAddress = getCurrentChainWalletAddress(walletStore, chainName);
      const supportTokens = getSupportTokensByChainName(chainName);
      let nativeBalance: IBalance;
      let tokenBalances: IBalance[] = [];
      switch (chainName) {
        case CONST_CHAIN_NAMES.ARBITRUM:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.arbitrum.wallet.getBalance(walletAddress),
          };
          tokenBalances = await TymtCore.Blockchains.arbitrum.wallet.getTokenBalance(walletAddress, supportTokens);
          break;
        case CONST_CHAIN_NAMES.AVALANCHE:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.avalanche.wallet.getBalance(walletAddress),
          };
          tokenBalances = await TymtCore.Blockchains.avalanche.wallet.getTokenBalance(walletAddress, supportTokens);
          break;
        case CONST_CHAIN_NAMES.BINANCE:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.bsc.wallet.getBalance(walletAddress),
          };
          tokenBalances = await TymtCore.Blockchains.bsc.wallet.getTokenBalance(walletAddress, supportTokens);
          break;
        case CONST_CHAIN_NAMES.BITCOIN:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.btc.wallet.getBalance(walletAddress),
          };
          break;
        case CONST_CHAIN_NAMES.ETHEREUM:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.eth.wallet.getBalance(walletAddress),
          };
          tokenBalances = await TymtCore.Blockchains.eth.wallet.getTokenBalance(walletAddress, supportTokens);
          break;
        case CONST_CHAIN_NAMES.OPTIMISM:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.op.wallet.getBalance(walletAddress),
          };
          tokenBalances = await TymtCore.Blockchains.op.wallet.getTokenBalance(walletAddress, supportTokens);
          break;
        case CONST_CHAIN_NAMES.POLYGON:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.polygon.wallet.getBalance(walletAddress),
          };
          tokenBalances = await TymtCore.Blockchains.polygon.wallet.getTokenBalance(walletAddress, supportTokens);
          break;
        case CONST_CHAIN_NAMES.SOLANA:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.solana.wallet.getBalance(walletAddress),
          };
          break;
        case CONST_CHAIN_NAMES.SOLAR:
          nativeBalance = {
            symbol: getNativeSymbolByChainName(chainName),
            balance: await TymtCore.Blockchains.solar.wallet.getBalance(walletAddress),
          };
          break;
      }
      const res = [...tokenBalances, nativeBalance];
      return res;
    } catch (err) {
      console.error("Failed to fetchChainBalance: ", err);
    }
  };
}
