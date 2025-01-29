import { createSlice } from "@reduxjs/toolkit";

import TymtStorage from "../lib/storage/TymtStorage";
import { compareJSONStructure } from "../lib/helper/JSONHelper";

import { IAccount, IAccountList } from "../types/AccountTypes";

const init: IAccountList = {
  list: [],
};

const loadAccountList: () => IAccountList = () => {
  const data = TymtStorage.get(`accountList`);
  if (!data || !compareJSONStructure(JSON.parse(data), init)) {
    TymtStorage.set(`accountList`, JSON.stringify(init));
    return init;
  }
  return JSON.parse(data);
};

const initialState = {
  data: loadAccountList(),
  status: "accountList",
  msg: "",
};

export const accountListSlice = createSlice({
  name: "accountList",
  initialState,
  reducers: {
    setAccountList: (state, action) => {
      state.data.list = action.payload;
      TymtStorage.set(`accountList`, JSON.stringify(state.data));
    },
    addAccountList: (state, action) => {
      const account = action.payload as IAccount;
      if (!account) return;
      const rest = state.data.list.filter((one) => one.sxpAddress !== account.sxpAddress);
      state.data.list = [...rest, account];
      TymtStorage.set(`accountList`, JSON.stringify(state.data));
    },
    delAccountList: (state, action) => {
      const account = action.payload as IAccount;
      if (!account) return;
      state.data.list = state.data.list.filter((one) => one.sxpAddress !== account.sxpAddress);
      TymtStorage.set(`accountList`, JSON.stringify(state.data));
    },
  },
});

export const getAccountList = (state: any) => state.accountList.data;
export const { setAccountList, addAccountList, delAccountList } = accountListSlice.actions;

export default accountListSlice.reducer;
