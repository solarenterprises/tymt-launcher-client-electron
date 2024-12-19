import React from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Splash from "./pages/welcome/Splash";

const root = createRoot(document.body);
// root.render(<h2>Hello from React!</h2>);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/main_window" element={<Splash />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
