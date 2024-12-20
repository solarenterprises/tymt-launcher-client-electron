"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ChevronRight_svg_1 = __importDefault(require("../../assets/arrow/ChevronRight.svg"));
const SignModeButton = ({ icon, text, loading, onClick }) => {
    return ((0, jsx_runtime_1.jsx)(material_1.Button, { disabled: loading, onClick: onClick, sx: {
            textTransform: "none",
            width: "100%",
            border: "1px solid #52E1F233",
            padding: "12px 16px",
            borderRadius: "50ch",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
                background: "var(--bg-stroke-white-10-stroke-default, #FFFFFF1A)",
                border: "1px solid #ffffff33",
            },
        }, children: (0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", alignItems: "center", justifyContent: "space-between", width: "100%", children: [(0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", alignItems: "center", gap: "16px", children: [(0, jsx_runtime_1.jsx)(material_1.Box, { component: "img", src: icon }), (0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-18-regular white", children: text })] }), loading ? ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: "24px", sx: {
                        color: "#F5EBFF",
                    } })) : ((0, jsx_runtime_1.jsx)(material_1.Box, { component: "img", src: ChevronRight_svg_1.default, width: "24px", height: "24px" }))] }) }));
};
exports.default = SignModeButton;
//# sourceMappingURL=SignModeButton.js.map