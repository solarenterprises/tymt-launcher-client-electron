import { ethers } from "ethers";
import * as ethereumjsWallet from "ethereumjs-wallet";
import * as bip39 from "bip39";
import { validate } from "multicoin-address-validator";

import { CONFIG_ETH_API_URL, CONFIG_ETH_API_KEY, CONFIG_ETH_RPC_URL, CONFIG_NETWORK_NAME } from "../../config/MainConfig";

import { ISupportToken } from "../../types/ChainTypes";
import { IBalance } from "../../types/WalletTypes";

export class Ethereum {
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
    const wallet = await Ethereum.getWalletFromMnemonic(mnemonic.normalize("NFD"));
    return wallet.address;
  }

  static validateAddress(addr: string) {
    if (!addr) return false;
    return validate(addr, "eth");
  }

  static async signMessage(message: string, passphrase: string): Promise<string> {
    try {
      const wallet = await Ethereum.getWalletFromMnemonic(passphrase);
      const signature = await wallet.signMessage(message);
      return signature;
    } catch (error) {
      // console.error("Error signing message:", error);
      throw error;
    }
  }

  static async verifyMessage(message: string, signature: string, address: string): Promise<boolean> {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      // console.log(recoveredAddress);
      return recoveredAddress === address;
    } catch (error) {
      // console.error("Error verifying message:", error);
      return false;
    }
  }
}

export default Ethereum;
