"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const react_router_dom_1 = require("react-router-dom");
require("./locale/i18n");
require("./styles/app.scss");
const Splash_1 = __importDefault(require("./pages/welcome/Splash"));
const Welcome_1 = __importDefault(require("./pages/welcome/Welcome"));
const root = (0, client_1.createRoot)(document.body);
// root.render(<h2>Hello from React!</h2>);
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/main_window", element: (0, jsx_runtime_1.jsx)(Splash_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/main_window/start", element: (0, jsx_runtime_1.jsx)(Welcome_1.default, {}) })] }) }) }));
//# sourceMappingURL=app.js.map