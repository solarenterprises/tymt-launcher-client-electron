import { createSlice } from "@reduxjs/toolkit";
import TymtStorage from "../lib/storage/TymtStorage";
import { TymtLogoType } from "../types/HomeTypes";
import { compareJSONStructure } from "../lib/helper/JSONHelper";

const init: TymtLogoType = {
  isDrawerExpanded: true,
};

const loadData: () => TymtLogoType = () => {
  const data = TymtStorage.get(`tymtLogo`);
  if (data === null || data === "" || data === undefined) {
    TymtStorage.set(`tymtLogo`, JSON.stringify(init));
    return init;
  } else {
    if (compareJSONStructure(JSON.parse(data), init)) {
      return JSON.parse(data);
    } else {
      TymtStorage.set(`tymtLogo`, JSON.stringify(init));
      return init;
    }
  }
};

const initialState = {
  data: loadData(),
  status: "tymtLogo",
  msg: "",
};

const tymtLogoSlice = createSlice({
  name: "tymtLogo",
  initialState,
  reducers: {
    setCurrentLogo(state, action) {
      state.data = action.payload;
      TymtStorage.set(`tymtLogo`, JSON.stringify(action.payload));
    },
  },
});

export const getCurrentLogo = (state: any) => state.tymtLogo.data;

export default tymtLogoSlice.reducer;

export const { setCurrentLogo } = tymtLogoSlice.actions;
