"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const IAgreeTerms = ({ checked, setChecked }) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    return ((0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", alignItems: "center", spacing: "8px", onClick: () => {
            setChecked(!checked);
        }, sx: {
            cursor: "pointer",
        }, children: [(0, jsx_runtime_1.jsx)(material_1.Checkbox, { checked: checked, sx: {
                    width: "20px",
                    height: "20px",
                    color: "#7C7C7C",
                } }), (0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-16-regular white", children: t("ncca-6_agree-terms-privacy") })] }));
};
exports.default = IAgreeTerms;
//# sourceMappingURL=IAgreeTerms.js.map