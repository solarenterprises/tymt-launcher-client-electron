import { Managers, Identities, Transactions, Crypto } from "@solar-network/crypto";
import { generateMnemonic } from "bip39";
// import { IWallet } from "./IWallet";
import Big from "big.js";
// import SolarAPI from "../api/SolarAPI";
// import { net_name, solar_api_url } from "../../configs/index";
// import { IRecipient } from "../../features/wallet/CryptoApi";
// import { testAccountTokens } from "../../consts/testMnemonics";
// import { IPriceList } from "../../types/walletTypes";
// import { getSupportChainByName, getTokenPriceByCmc } from "../helper/WalletHelper";
// import { ChainNames } from "../../consts/Chains";

import { CONFIG_NETWORK_NAME } from "../../config/MainConfig";

export class Solar {
  static async generateMnemonic(): Promise<string> {
    const passphrase = generateMnemonic();
    return passphrase;
  }

  static async getAddressFromMnemonic(mnemonic: string): Promise<string> {
    Managers.configManager.setFromPreset(CONFIG_NETWORK_NAME === "mainnet" ? "mainnet" : "testnet");
    return Identities.Address.fromPassphrase(mnemonic.normalize("NFD"));
  }
}

export default Solar;
