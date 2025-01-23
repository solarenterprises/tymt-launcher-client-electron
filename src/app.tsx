import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import store from "./store";

import "./locale/i18n";
import "./styles/app.scss";

// Layout
import HomeLayout from "./layouts/HomeLayout";
// ~Layout

// Auth
import Splash from "./pages/welcome/Splash";
import Welcome from "./pages/welcome/Welcome";
import NonCustodialLogin1 from "./pages/account/non-custodial/NonCustodialLogin1";
import NonCustodialLogIn2 from "./pages/account/non-custodial/NonCustodialLogIn2";
import NonCustodialSignUp2 from "./pages/account/non-custodial/NonCustodialSignUp2";
import NonCustodialSignUp3 from "./pages/account/non-custodial/NonCustodialSignUp3";
import NonCustodialSignUp4 from "./pages/account/non-custodial/NonCustodialSignUp4";
import NonCustodialImport1 from "./pages/account/non-custodial/NonCustodialImport1";
import ConfirmInformation from "./pages/account/ConfirmInformation";
// ~Auth

// Home
import Homepage from "./pages/main/Homepage";
import GameOverview from "./pages/main/GameOverview";
// ~Home

//Wallet
import Wallet from "./pages/wallet/Wallet";
import WalletVote from "./pages/wallet/WalletVote";
import WalletSend from "./pages/wallet/WalletSend";
//~Wallet

import { Buffer } from "buffer";
window.Buffer = Buffer;

const root = createRoot(document.body);

root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/non-custodial-login-1" element={<NonCustodialLogin1 />} />
          <Route path="/non-custodial-login-2" element={<NonCustodialLogIn2 />} />
          <Route path="/non-custodial-signup-2" element={<NonCustodialSignUp2 />} />
          <Route path="/non-custodial-signup-3" element={<NonCustodialSignUp3 />} />
          <Route path="/non-custodial-signup-4/:mode" element={<NonCustodialSignUp4 />} />
          <Route path="/non-custodial-import-1/:mode" element={<NonCustodialImport1 />} />
          <Route path="/confirm-information/:mode" element={<ConfirmInformation />} />
          <Route path="/" element={<HomeLayout />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/game/:gameid" element={<GameOverview />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/wallet-vote" element={<WalletVote />} />
            <Route path="/wallet-send" element={<WalletSend />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  </React.StrictMode>
);
