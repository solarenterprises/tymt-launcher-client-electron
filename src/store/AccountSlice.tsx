import { createSlice } from "@reduxjs/toolkit";

import TymtStorage from "../lib/storage/TymtStorage";
import { compareJSONStructure } from "../lib/helper/JSONHelper";

import { IAccount } from "../types/AccountTypes";

const init: IAccount = {
  uid: "",
  avatar: "",
  nickName: "",
  password: "",
  sxpAddress: "",
  mnemonic: "",
  rsaPubKey: "",
};

const loadAccount: () => IAccount = () => {
  const data = TymtStorage.get(`account`);
  if (!data || !compareJSONStructure(JSON.parse(data), init)) {
    TymtStorage.set(`account`, JSON.stringify(init));
    return init;
  }
  return JSON.parse(data);
};

const initialState = {
  data: loadAccount(),
  status: "account",
  msg: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.data = action.payload;
      TymtStorage.set(`account`, JSON.stringify(state.data));
    },
  },
});

export const getAccount = (state: any) => state.account.data;
export const { setAccount } = accountSlice.actions;

export default accountSlice.reducer;
