import { ethers } from "ethers";
import * as ethereumjsWallet from "ethereumjs-wallet";
import * as bip39 from "bip39";

import { CONFIG_NETWORK_NAME, CONFIG_OP_API_KEY, CONFIG_OP_API_URL, CONFIG_POL_RPC_URL } from "../../config/MainConfig";

import { ISupportToken } from "../../types/wallet/ChainTypes";
import { IBalance } from "../../types/wallet/WalletTypes";

export class Optimism {
  static async getWalletFromMnemonic(mnemonic: string): Promise<any> {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const hdNode = ethereumjsWallet.hdkey.fromMasterSeed(seed);
    const node = hdNode.derivePath(`m/44'/60'/0'`);
    const change = node.deriveChild(0);
    const childNode = change.deriveChild(0);
    const childWallet = childNode.getWallet();
    const wallet = new ethers.Wallet(childWallet.getPrivateKey().toString("hex"));
    return wallet;
  }

  static async getAddress(mnemonic: string): Promise<string> {
    const wallet = await Optimism.getWalletFromMnemonic(mnemonic.normalize("NFD"));
    return wallet.address;
  }
}

export default Optimism;
