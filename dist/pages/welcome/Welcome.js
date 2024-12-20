"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_i18next_1 = require("react-i18next");
const framer_motion_1 = require("framer-motion");
const material_1 = require("@mui/material");
const AccountHeader_1 = __importDefault(require("../../components/account/AccountHeader"));
const SignModeButton_1 = __importDefault(require("../../components/account/SignModeButton"));
const CreateAccountForm_1 = __importDefault(require("../../components/account/CreateAccountForm"));
const AuthIconButtons_1 = __importDefault(require("../../components/account/AuthIconButtons"));
const OrLine_1 = __importDefault(require("../../components/account/OrLine"));
const tymt1_png_1 = __importDefault(require("../../assets/account/tymt1.png"));
const Guest_svg_1 = __importDefault(require("../../assets/account/Guest.svg"));
const Import_svg_1 = __importDefault(require("../../assets/account/Import.svg"));
const Welcome = () => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handlePlayGuest = () => { };
    const handleImportWallet = () => {
        // navigate("/non-custodial/login/2");
    };
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, className: "basic-container", children: (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, container: true, justifyContent: "center", children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, style: {
                        alignSelf: "center",
                    }, children: (0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", alignItems: "center", justifyContent: "center", gap: "64px", children: [(0, jsx_runtime_1.jsx)(material_1.Stack, { alignItems: "center", justifyContent: "center", children: (0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, justifyContent: "center", children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, container: true, sx: {
                                            width: "520px",
                                            padding: "10px 0px",
                                        }, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(AccountHeader_1.default, { title: t("ncca-63_hello") }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, mt: "48px", children: (0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", alignItems: "center", gap: "16px", children: [(0, jsx_runtime_1.jsx)(SignModeButton_1.default, { icon: Guest_svg_1.default, text: t("ncca-64_play-as-guest"), onClick: handlePlayGuest }), (0, jsx_runtime_1.jsx)(SignModeButton_1.default, { icon: Import_svg_1.default, text: t("ncl-8_import-wallet"), onClick: handleImportWallet })] }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, mt: "32px", children: (0, jsx_runtime_1.jsx)(material_1.Divider, { variant: "fullWidth", sx: { backgroundColor: "#FFFFFF1A" } }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, mt: "32px", children: (0, jsx_runtime_1.jsx)(CreateAccountForm_1.default, {}) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, mt: "32px", children: (0, jsx_runtime_1.jsx)(OrLine_1.default, {}) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, mt: "32px", children: (0, jsx_runtime_1.jsx)(AuthIconButtons_1.default, {}) })] }) }) }), (0, jsx_runtime_1.jsx)(material_1.Box, { component: "img", src: tymt1_png_1.default, sx: {
                                    height: "calc(100vh - 64px)",
                                } })] }) }) }) }) }));
};
exports.default = Welcome;
//# sourceMappingURL=Welcome.js.map