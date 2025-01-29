import { createSlice } from "@reduxjs/toolkit";
import TymtStorage from "../lib/storage/TymtStorage";
import { compareJSONStructure } from "../lib/helper/JSONHelper";
import { INotificationSetting } from "../types/SettingTypes";

const init: INotificationSetting = {
  status: "active",
  sound: true,
  inAppNotification: true,
  nativeNotification: true,
};

const loadNotificationSetting: () => INotificationSetting = () => {
  const data = TymtStorage.get(`notificationSetting`);
  if (!data) {
    TymtStorage.set(`notificationSetting`, JSON.stringify(init));
    return init;
  } else {
    if (compareJSONStructure(JSON.parse(data), init)) {
      return JSON.parse(data);
    } else {
      TymtStorage.set(`notificationSetting`, JSON.stringify(init));
      return init;
    }
  }
};

const initialState = {
  data: loadNotificationSetting(),
  status: "notificationSetting",
  msg: "",
};

export const notificationSettingSlice = createSlice({
  name: "notificationSetting",
  initialState,
  reducers: {
    setNotificationSetting: (state, action) => {
      state.data = action.payload;
      TymtStorage.set(`notificationSetting`, JSON.stringify(action.payload));
    },
  },
});

export const getNotificationSetting = (state: any) => state.notificationSetting.data;
export const { setNotificationSetting } = notificationSettingSlice.actions;

export default notificationSettingSlice.reducer;
