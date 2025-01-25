import { ipcMain } from "electron";

import tymtCore from "../lib/core/tymtCore";
import { BalanceAPI } from "../lib/api/BalanceAPI";

import { decrypt } from "../lib/helper/EncryptHelper";

import { IAccount } from "../types/AccountTypes";
import { IVotingData, IWalletAddresses } from "../types/WalletTypes";
import { IWalletSetting } from "../types/SettingTypes";

ipcMain.handle("sxp-vote", async (event, accountStore: IAccount, walletStore: IWalletAddresses, sxpFee: number, password: string, voteAsset: IVotingData) => {
  try {
    const passphrase: string = await decrypt(accountStore?.mnemonic, password);
    const res = await tymtCore.Blockchains.solar.wallet.vote(passphrase.normalize("NFD"), walletStore?.solar, voteAsset, sxpFee.toString(), 1);
    if (res.data.data.invalid[0]) {
      const temp = res.data.data.invalid[0];
      const err = res.data.errors[temp].message;
      throw new Error(err);
    }
    return { success: true };
  } catch (err) {
    console.error("Failed to handleVoteClick: ", err);
    return { success: false, error: err.message };
  }
});

ipcMain.handle("fetch-balance-list", async (event, walletStore: IWalletAddresses) => {
  return await BalanceAPI.fetchBalanceList(walletStore);
});
