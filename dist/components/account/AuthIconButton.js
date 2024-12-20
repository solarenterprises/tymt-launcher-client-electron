"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const AuthIconButton = ({ icon }) => {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Button, { sx: {
                textTransform: "none",
                width: "56px",
                minWidth: "12px",
                height: "56px",
                border: "1px solid #52E1F233",
                padding: "16px",
                borderRadius: "50ch",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                    background: "var(--bg-stroke-white-10-stroke-default, #FFFFFF1A)",
                    border: "1px solid #ffffff33",
                },
            }, children: (0, jsx_runtime_1.jsx)(material_1.Box, { component: "img", src: icon, width: "24px", height: "24px" }) }) }));
};
exports.default = AuthIconButton;
//# sourceMappingURL=AuthIconButton.js.map