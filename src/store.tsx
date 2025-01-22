import { configureStore } from "@reduxjs/toolkit";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";

// Auth
import accountReducer from "./store/AccountSlice";
import accountListReducer from "./store/AccountListSlice";
import loginReducer from "./store/LoginSlice";
import mnemonicReducer from "./store/MnemonicSlice";
// ~Auth

// Wallet
import walletReducer from "./store/WalletSlice";
import reserveListReducer from "./store/ReserveListSlice";
import balanceReducer from "./store/BalanceListSlice";
import priceReducer from "./store/PriceListSlice";
import currentCurrencyReducer from "./store/CurrentCurrencySlice";
import currentChainReducer from "./store/CurrentChainSlice";
// ~Wallet

// Setting
import walletSettingReducer from "./store/WalletSettingSlice";
import notificationSettingReducer from "./store/NotificationSettingSlice";
import languageSettingReducer from "./store/LanguageSettingSlice";
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
    login: loginReducer,
    mnemonic: mnemonicReducer,
    // ~Auth

    // Wallet
    wallet: walletReducer,
    reserveList: reserveListReducer,
    balanceList: balanceReducer,
    priceList: priceReducer,
    currentCurrency: currentCurrencyReducer,
    currentChain: currentChainReducer,
    // ~Wallet

    // Setting
    walletSetting: walletSettingReducer,
    notificationSetting: notificationSettingReducer,
    languageSetting: languageSettingReducer,
    // ~Setting
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stateSyncMiddleware),
});

initMessageListener(store);

export type AppDispatch = typeof store.dispatch;
export default store;
