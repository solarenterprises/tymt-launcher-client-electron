import { configureStore } from "@reduxjs/toolkit";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";

// Auth
import accountReducer from "./store/AccountSlice";
import accountListReducer from "./store/AccountListSlice";
// ~Auth

// Wallet
import walletReducer from "./store/WalletSlice";
import currentCurrencyReducer from "./store/CurrentCurrencySlice";
import reserveListReducer from "./store/ReserveListSlice";
// ~Wallet

// Setting
import walletSettingReducer from "./store/WalletSettingSlice";
// ~Setting

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

    // Wallet
    wallet: walletReducer,
    currentCurrency: currentCurrencyReducer,
    reserveList: reserveListReducer,
    // ~Wallet

    // Setting
    walletSetting: walletSettingReducer,
    // ~Setting
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateSyncMiddleware),
});

initMessageListener(store);

export type AppDispatch = typeof store.dispatch;
export default store;
