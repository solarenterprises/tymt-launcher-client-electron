import { createSlice } from "@reduxjs/toolkit";

import TymtStorage from "../lib/storage/TymtStorage";
import { compareJSONStructure } from "../lib/helper/JSONHelper";

import { ICurrentCurrency } from "../types/CurrencyTypes";

const init: ICurrentCurrency = {
  currency: "USD",
};

const loadCurrentCurrency: () => ICurrentCurrency = () => {
  const data = TymtStorage.get(`currentCurrency`);
  if (!data || !compareJSONStructure(JSON.parse(data), init)) {
    TymtStorage.set(`currentCurrency`, JSON.stringify(init));
    return init;
  }
  return JSON.parse(data);
};

const initialState = {
  data: loadCurrentCurrency(),
  status: "currentCurrency",
  msg: "",
};

export const currentCurrencySlice = createSlice({
  name: "currentCurrency",
  initialState,
  reducers: {
    setCurrentCurrency: (state, action) => {
      state.data.currency = action.payload;
      TymtStorage.set(`currentCurrency`, JSON.stringify(action.payload));
    },
  },
});

export const getCurrentCurrency = (state: any) => state.currentCurrency.data;
export const { setCurrentCurrency } = currentCurrencySlice.actions;

export default currentCurrencySlice.reducer;
