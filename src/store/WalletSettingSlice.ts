import { createSlice } from "@reduxjs/toolkit";

import TymtStorage from "../lib/storage/TymtStorage";
import { compareJSONStructure } from "../lib/helper/JSONHelper";

import { IWalletSetting } from "../types/SettingTypes";

const init: IWalletSetting = {
  pageRefreshed: false,
  hideZeroBalance: false,
  currentCurrency: "USD",
  feeLevel: "minimum",
  feeUSD: "0.0183",
};

const loadWalletSetting: () => IWalletSetting = () => {
  const data = TymtStorage.get(`walletSetting`);
  if (!data || !compareJSONStructure(JSON.parse(data), init)) {
    TymtStorage.set(`walletSetting`, JSON.stringify(init));
    return init;
  }
  return JSON.parse(data);
};

const initialState = {
  data: loadWalletSetting(),
  status: "walletSetting",
  msg: "",
};

export const walletSettingSlice = createSlice({
  name: "walletSetting",
  initialState,
  reducers: {
    setWalletSetting: (state, action) => {
      state.data = action.payload;
      TymtStorage.set(`walletSetting`, JSON.stringify(state.data));
    },
  },
});

export const getWalletSetting = (state: any) => state.walletSetting.data;
export const { setWalletSetting } = walletSettingSlice.actions;

export default walletSettingSlice.reducer;
