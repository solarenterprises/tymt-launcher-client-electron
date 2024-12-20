"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_i18next_1 = require("react-i18next");
const OrLine = () => {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", alignItems: "center", sx: {
            height: "18px",
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    width: "220px",
                    height: "1px",
                    backgroundColor: "#FFFFFF16",
                } }), (0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-14-regular", sx: {
                    width: "80px",
                    textAlign: "center",
                    color: "#AFAFAF",
                    fontFeatureSettings: "'calt' off",
                }, children: t("ncca-58_or") }), (0, jsx_runtime_1.jsx)(material_1.Box, { sx: {
                    width: "220px",
                    height: "1px",
                    backgroundColor: "#FFFFFF16",
                } })] }));
};
exports.default = OrLine;
//# sourceMappingURL=OrLine.js.map