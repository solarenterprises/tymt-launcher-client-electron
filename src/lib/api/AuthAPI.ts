import axios from "axios";
import { CONFIG_TYMT_BACKEND_URL } from "../../config/MainConfig";
import tymtCore from "../core/tymtCore";
import { getPublicKey } from "../helper/WalletHelper";
import { IUser } from "../../types/UserTypes";

export class AuthAPI {
  static async requestMessage(publicKey: string): Promise<string> {
    try {
      const res = await axios.post(`${CONFIG_TYMT_BACKEND_URL}/auth/request-message`, { publicKey });
      return res?.data?.data;
    } catch (err) {
      console.error("Failed to requestMessage: ", err.response?.data ?? err);
      throw new Error(err.response?.data?.error ?? "Failed to requestMessage");
    }
  }

  static async signup(nickname: string, sxpAddress: string, passphrase: string): Promise<IUser> {
    try {
      const publicKey = getPublicKey(passphrase);
      const message = await AuthAPI.requestMessage(publicKey);
      const signedMessage = await tymtCore.Blockchains.solar.wallet.signMessage(message, passphrase);
      const res = await axios.post(`${CONFIG_TYMT_BACKEND_URL}/auth/signup`, { nickname, sxpAddress, publicKey, signedMessage });
      return res?.data?.data;
    } catch (err) {
      console.error("Failed to signup: ", err.response?.data ?? err);
      throw new Error(err.response?.data?.error ?? "Failed to signup");
    }
  }

  static async login(sxpAddress: string, passphrase: string): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    try {
      const publicKey = getPublicKey(passphrase);
      const message = await AuthAPI.requestMessage(publicKey);
      const signedMessage = await tymtCore.Blockchains.solar.wallet.signMessage(message, passphrase);
      const res = await axios.post(`${CONFIG_TYMT_BACKEND_URL}/auth/login`, { sxpAddress, publicKey, signedMessage });
      return res?.data?.data;
    } catch (err) {
      console.error("Failed to login: ", err.response?.data ?? err);
      throw new Error(err.response?.data?.error ?? "Failed to login");
    }
  }

  static async refreshtoken(refreshToken: string) {
    try {
      const res = await axios.post(`${CONFIG_TYMT_BACKEND_URL}/auth/refresh-token`, { refreshToken });
      return res?.data?.data;
    } catch (err) {
      console.error("Failed to refreshtoken: ", err.response?.data ?? err);
      throw new Error(err.response?.data?.error ?? "Failed to refreshtoken");
    }
  }
}
