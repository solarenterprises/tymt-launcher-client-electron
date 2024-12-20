"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const AccountNextButton = ({ isSubmit, text, onClick, disabled, loading }) => {
    return ((0, jsx_runtime_1.jsxs)(material_1.Button, { fullWidth: true, className: "red-button", onClick: onClick, type: isSubmit ? "submit" : undefined, disabled: disabled, children: [loading && ((0, jsx_runtime_1.jsx)(material_1.CircularProgress, { sx: {
                    color: "#F5EBFF",
                } })), !loading && text] }));
};
exports.default = AccountNextButton;
//# sourceMappingURL=AccountNextButton.js.map