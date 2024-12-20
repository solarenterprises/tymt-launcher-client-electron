"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const AccountHeader = ({ title, text }) => {
    return ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, children: (0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-h1 white", sx: {
                        leadingTrim: "both",
                        textEdge: "cap",
                    }, children: title }) }), text && ((0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, xs: 12, mt: "24px", children: (0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-18-light light", children: text }) }))] }));
};
exports.default = AccountHeader;
//# sourceMappingURL=AccountHeader.js.map