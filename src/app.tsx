import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";

import "./locale/i18n";
import "./styles/app.scss";

import Splash from "./pages/welcome/Splash";
import Welcome from "./pages/welcome/Welcome";
import NonCustodialLogIn2 from "./pages/account/non-custodial/NonCustodialLogIn2";
import NonCustodialSignUp2 from "./pages/account/non-custodial/NonCustodialSignUp2";
import NonCustodialSignUp3 from "./pages/account/non-custodial/NonCustodialSignUp3";
import NonCustodialSignUp4 from "./pages/account/non-custodial/NonCustodialSignUp4";
import NonCustodialImport1 from "./pages/account/non-custodial/NonCustodialImport1";
import ConfirmInformation from "./pages/account/ConfirmInformation";

import { Buffer } from "buffer";
window.Buffer = Buffer;

const root = createRoot(document.body);
// root.render(<h2>Hello from React!</h2>);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/start" element={<Welcome />} />
        <Route path="/non-custodial-login-2" element={<NonCustodialLogIn2 />} />
        <Route path="/non-custodial-signup-2" element={<NonCustodialSignUp2 />} />
        <Route path="/non-custodial-signup-3" element={<NonCustodialSignUp3 />} />
        <Route path="/non-custodial-signup-4" element={<NonCustodialSignUp4 />} />
        <Route path="/non-custodial-import-1" element={<NonCustodialImport1 />} />
        <Route path="/confirm-information/:mode" element={<ConfirmInformation />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
