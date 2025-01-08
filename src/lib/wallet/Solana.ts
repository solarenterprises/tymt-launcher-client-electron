import * as bip39 from "bip39";
import * as ed25519 from "ed25519-hd-key";
import { Keypair, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { validate } from "multicoin-address-validator";
import * as bs58 from "bs58";

import { CONFIG_NETWORK_NAME } from "../../config/MainConfig";

export class Solana {
  static async getAddress(mnemonic: string): Promise<string> {
    try {
      const keypair = await this.getKeyPair(mnemonic);
      const publicKey = keypair.publicKey.toBase58();
      return publicKey;
    } catch (err) {
      console.error("Failed to Solana.getAddress: ", err);
      return "";
    }
  }

  static validateAddress(addr: string) {
    if (!addr) return false;
    return validate(addr, "sol");
  }

  static async getKeyPair(mnemonic: string): Promise<Keypair> {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const derivationPath = "m/44'/501'/0'/0'";
    const derivedSeed = ed25519.derivePath(derivationPath, seed.toString("hex")).key;
    const keypair = Keypair.fromSeed(derivedSeed);
    return keypair;
  }
}

export default Solana;
