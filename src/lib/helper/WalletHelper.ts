import * as bip39 from "bip39";

import { CONST_CHAIN_NAMES, CONST_SUPPORT_CHAINS } from "../../const/ChainConsts";

import tymtCore from "../core/tymtCore";

import { IWalletAddresses } from "../../types/WalletTypes";

export const checkMnemonic = (_mnemonic: string) => {
  if (_mnemonic.split(" ").length == 24) {
    return (
      (bip39.validateMnemonic(_mnemonic.split(" ").slice(0, 12).join(" ")) && bip39.validateMnemonic(_mnemonic.split(" ").slice(12, 24).join(" "))) ||
      bip39.validateMnemonic(_mnemonic)
    );
  } else if (_mnemonic.split(" ").length == 12) {
    return bip39.validateMnemonic(_mnemonic);
  }
  return false;
};

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = array.slice(); // Clone the array to avoid mutating the original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

export const getMnemonic = (_length: number) => {
  if (_length === 12) {
    return `${bip39.generateMnemonic()}`;
  } else if (_length === 24) {
    return `${bip39.generateMnemonic()} ${bip39.generateMnemonic()}`;
  }
  return "";
};

export const getWalletAddressesFromPassphrase = async (_passphrase: string) => {
  try {
    const solarAddr = await tymtCore.Blockchains.solar.wallet.getAddress(_passphrase);
    const bscAddr = await tymtCore.Blockchains.bsc.wallet.getAddress(_passphrase);
    const ethereumAddr = await tymtCore.Blockchains.eth.wallet.getAddress(_passphrase);
    const bitcoinAddr = await tymtCore.Blockchains.btc.wallet.getAddress(_passphrase);
    const solanaAddr = await tymtCore.Blockchains.solana.wallet.getAddress(_passphrase);
    const polygonAddr = await tymtCore.Blockchains.polygon.wallet.getAddress(_passphrase);
    const avalancheAddr = await tymtCore.Blockchains.avalanche.wallet.getAddress(_passphrase);
    const arbitrumAddr = await tymtCore.Blockchains.arbitrum.wallet.getAddress(_passphrase);
    const optimismAddr = await tymtCore.Blockchains.op.wallet.getAddress(_passphrase);

    const res: IWalletAddresses = {
      arbitrum: arbitrumAddr,
      avalanche: avalancheAddr,
      bitcoin: bitcoinAddr,
      binance: bscAddr,
      ethereum: ethereumAddr,
      optimism: optimismAddr,
      polygon: polygonAddr,
      solana: solanaAddr,
      solar: solarAddr,
    };

    return res;
  } catch (err) {
    console.error("Failed to getWalletAddressesFromPassphrase: ", err);
  }
};

export const getCurrentChainWalletAddress = (walletStore: IWalletAddresses, chainName: string) => {
  try {
    let res: string = "";
    switch (chainName) {
      case CONST_CHAIN_NAMES.ARBITRUM:
        res = walletStore?.arbitrum;
        break;
      case CONST_CHAIN_NAMES.AVALANCHE:
        res = walletStore?.avalanche;
        break;
      case CONST_CHAIN_NAMES.BINANCE:
        res = walletStore?.binance;
        break;
      case CONST_CHAIN_NAMES.BITCOIN:
        res = walletStore?.bitcoin;
        break;
      case CONST_CHAIN_NAMES.ETHEREUM:
        res = walletStore?.ethereum;
        break;
      case CONST_CHAIN_NAMES.OPTIMISM:
        res = walletStore?.optimism;
        break;
      case CONST_CHAIN_NAMES.POLYGON:
        res = walletStore?.polygon;
        break;
      case CONST_CHAIN_NAMES.SOLANA:
        res = walletStore?.solana;
        break;
      case CONST_CHAIN_NAMES.SOLAR:
        res = walletStore?.solar;
        break;
    }
    return res;
  } catch (err) {
    console.error("Failed to getCurrentChainWalletAddress: ", err);
  }
};

export const getSupportChainByName = (chainName: string) => {
  try {
    const res = CONST_SUPPORT_CHAINS?.find((one) => one?.native?.name === chainName);
    return res;
  } catch (err) {
    console.error("Failed to getSupportChainByName: ", err);
  }
};

export const getNativeSymbolByChainName = (chainName: string) => {
  try {
    const supportChain = getSupportChainByName(chainName);
    const res = supportChain?.native?.symbol;
    return res;
  } catch (err) {
    console.error("Failed to getNativeSymbolByChainName: ", err);
  }
};

export const getSupportTokensByChainName = (chainName: string) => {
  try {
    const res = getSupportChainByName(chainName)?.tokens;
    return res;
  } catch (err) {
    console.error("Failed to getSupportTokensByChainName: ", err);
  }
};
