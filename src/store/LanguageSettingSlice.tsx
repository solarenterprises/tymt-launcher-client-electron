import { createSlice } from "@reduxjs/toolkit";
import TymtStorage from "../lib/storage/TymtStorage";
import { compareJSONStructure } from "../lib/helper/JSONHelper";
import { ILanguageSetting } from "../types/SettingTypes";

const init: ILanguageSetting = {
  lang: "en",
};

const loadLanguageSetting: () => ILanguageSetting = () => {
  const data = TymtStorage.get(`languageSetting`);
  if (!data || !compareJSONStructure(JSON.parse(data), init)) {
    TymtStorage.set(`languageSetting`, JSON.stringify(init));
    return init;
  }
  return JSON.parse(data);
};

const initialState = {
  data: loadLanguageSetting(),
  status: "languageSetting",
  msg: "",
};

export const languageSlice = createSlice({
  name: "languageSetting",
  initialState,
  reducers: {
    setLanguageSetting: (state, action) => {
      state.data.lang = action.payload;
      TymtStorage.set(`languageSetting`, JSON.stringify(action.payload));
    },
  },
});

export const getLanguageSetting = (state: any) => state.languageSetting.data;
export const { setLanguageSetting } = languageSlice.actions;

export default languageSlice.reducer;
