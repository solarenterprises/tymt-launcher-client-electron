"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const framer_motion_1 = require("framer-motion");
const material_1 = require("@mui/material");
const SplashLogo_svg_1 = __importDefault(require("../../assets/welcome/SplashLogo.svg"));
const Splash = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [progress, setProgress] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    // navigate("/get-started");
                    navigate("/main_window/start");
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 100);
        return () => {
            clearInterval(timer);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, style: {
                    alignSelf: "center",
                }, children: (0, jsx_runtime_1.jsx)("div", { className: "splash-logo", children: (0, jsx_runtime_1.jsx)(material_1.Box, { component: "img", src: SplashLogo_svg_1.default }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "red-blur" }), (0, jsx_runtime_1.jsx)("div", { className: "blue-blur" }), (0, jsx_runtime_1.jsx)(material_1.LinearProgress, { variant: "determinate", value: progress, sx: {
                    backgroundColor: "#00000000",
                    height: "10px",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "#EF4444",
                    },
                } })] }));
};
exports.default = Splash;
//# sourceMappingURL=Splash.js.map