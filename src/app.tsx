import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";

import "./locale/i18n";
import "./styles/app.scss";

import Splash from "./pages/welcome/Splash";
import Welcome from "./pages/welcome/Welcome";

const root = createRoot(document.body);
// root.render(<h2>Hello from React!</h2>);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/start" element={<Welcome />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
