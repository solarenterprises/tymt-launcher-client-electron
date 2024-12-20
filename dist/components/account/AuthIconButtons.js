"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Mail_png_1 = __importDefault(require("../../assets/account/Mail.png"));
const FacebookIcon_svg_1 = __importDefault(require("../../assets/account/FacebookIcon.svg"));
const GoogleIcon_svg_1 = __importDefault(require("../../assets/account/GoogleIcon.svg"));
const DiscordIcon_svg_1 = __importDefault(require("../../assets/account/DiscordIcon.svg"));
const BinanceIcon_svg_1 = __importDefault(require("../../assets/account/BinanceIcon.svg"));
const AuthIconButton_1 = __importDefault(require("./AuthIconButton"));
const list = [
    {
        icon: Mail_png_1.default,
    },
    {
        icon: GoogleIcon_svg_1.default,
    },
    {
        icon: FacebookIcon_svg_1.default,
    },
    {
        icon: DiscordIcon_svg_1.default,
    },
    {
        icon: BinanceIcon_svg_1.default,
    },
];
const AuthIconButtons = () => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", children: list.map((one, index) => ((0, jsx_runtime_1.jsx)(AuthIconButton_1.default, { icon: one.icon }, index))) }) }));
};
exports.default = AuthIconButtons;
//# sourceMappingURL=AuthIconButtons.js.map