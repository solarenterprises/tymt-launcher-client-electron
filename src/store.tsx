import { configureStore } from "@reduxjs/toolkit";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";

// Auth
import accountReducer from "./store/AccountSlice";
import accountListReducer from "./store/AccountListSlice";
// ~Auth

// const blacklistActionTypes = ["intercomsupport/setChatMounted", "intercomsupport/setMountedTrue", "intercomsupport/setMountedFalse"];
const blacklistActionTypes: string[] = [];

const stateSyncConfig = {
  blacklist: blacklistActionTypes,
};

const stateSyncMiddleware = createStateSyncMiddleware(stateSyncConfig);

const store = configureStore({
  reducer: {
    // Auth
    account: accountReducer,
    accountList: accountListReducer,
    // ~Auth
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateSyncMiddleware),
});

initMessageListener(store);

export type AppDispatch = typeof store.dispatch;
export default store;
