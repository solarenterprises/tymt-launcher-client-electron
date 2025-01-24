import { Managers, Identities, Transactions, Crypto } from "@solar-network/crypto";
import { generateMnemonic } from "bip39";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

// import { IWallet } from "./IWallet";
import Big from "big.js";
// import SolarAPI from "../api/SolarAPI";
// import { net_name, solar_api_url } from "../../configs/index";
// import { IRecipient } from "../../features/wallet/CryptoApi";
// import { testAccountTokens } from "../../consts/testMnemonics";
// import { IPriceList } from "../../types/walletTypes";
// import { getSupportChainByName, getTokenPriceByCmc } from "../helper/WalletHelper";
// import { ChainNames } from "../../consts/Chains";

import { CONFIG_NETWORK_NAME, CONFIG_SOLAR_API_URL } from "../../config/MainConfig";

export class Solar {
  static async generateMnemonic(): Promise<string> {
    const passphrase = generateMnemonic();
    return passphrase;
  }

  static async getAddress(mnemonic: string): Promise<string> {
    Managers.configManager.setFromPreset(CONFIG_NETWORK_NAME === "mainnet" ? "mainnet" : "testnet");
    return Identities.Address.fromPassphrase(mnemonic.normalize("NFD"));
  }

  static async addTxToQueue(body: any, url: string): Promise<AxiosResponse<any, any>> {
    return await axios.post(`${url}/transactions`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  static async getData(query: any, url: string): Promise<AxiosResponse<any, any>> {
    const config: AxiosRequestConfig = {
      params: query,
    };
    return await axios.get(`${CONFIG_SOLAR_API_URL}/${url}`, config);
  }

  static async getBlockchain() {
    return this.getData({}, "blockchain");
  }

  static async get53Delegates(page: number) {
    const query1 = {
      page: page,
      limit: 53,
      isResigned: false,
      orderBy: "rank:asc",
    };
    return this.getData(query1, "delegates");
  }

  static async getAllDelegates() {
    const query1 = {
      page: 1,
      limit: 100,
      isResigned: false,
      orderBy: "address:asc",
    };
    const res1: any = await this.getData(query1, "delegates");
    const numberOfDelegates = res1.data.meta.totalCount;
    const numberOfPages = Math.ceil(numberOfDelegates / 100);
    let queries = [];
    for (let i = 2; i <= numberOfPages; i++) {
      queries.push({
        page: i,
        limit: 100,
        isResigned: false,
        orderBy: "address:asc",
      });
    }
    const res2: any[] = await Promise.all(queries.map((query) => this.getData(query, "delegates")));
    let res3: any[] = res1.data.data;
    for (let i = 0; i < res2.length; i++) {
      res3 = [...res3, ...res2[i].data.data];
    }
    return res3;
  }

  static async getVotingData(address: string) {
    try {
      const query2 = {
        page: 1,
        limit: 1,
      };
      return this.getData(query2, `wallets/${address}/votes`);
    } catch (err) {
      console.error("Failed to getVotingData: ", err);
    }
  }

  static async getCurrentNonce(address: string): Promise<number> {
    try {
      const response = await axios.get(`${CONFIG_SOLAR_API_URL}/wallets/${address}`);
      return parseInt(response.data.data.nonce);
    } catch (e) {
      throw new Error(`Failed to get current nonce: ${e.message}`);
    }
  }

  static async vote(passphrase: string, addr: string, votesAsset: any, feeUSD: string, sxpPriceUSD: number) {
    Managers.configManager.setFromPreset(CONFIG_NETWORK_NAME === "mainnet" ? "mainnet" : "testnet");
    let nonce = await this.getCurrentNonce(addr);
    let tx = Transactions.BuilderFactory.vote()
      .nonce((nonce + 1).toString())
      .votesAsset(votesAsset)
      .fee(
        Big(feeUSD)
          .times((10 ** 8 / Number(sxpPriceUSD)) as number)
          .toFixed(0)
      )
      .sign(passphrase);
    let txJson = tx.build().toJson();
    let res = this.addTxToQueue(JSON.stringify({ transactions: [txJson] }), CONFIG_SOLAR_API_URL ?? "");
    return res;
  }

  static async getBalance(addr: string): Promise<number> {
    try {
      const response = await axios.get(`${CONFIG_SOLAR_API_URL}/wallets/${addr}`);
      return response.data.data.balance / 1e8;
    } catch {
      return 0;
    }
  }

  static validateAddress(address: string): boolean {
    Managers.configManager.setFromPreset(CONFIG_NETWORK_NAME === "mainnet" ? "mainnet" : "testnet");
    return Identities.Address.validate(address);
  }
}

export default Solar;
