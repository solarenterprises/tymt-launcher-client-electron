"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const InputAdornment_1 = __importDefault(require("@mui/material/InputAdornment"));
const VisibilityOutlined_1 = __importDefault(require("@mui/icons-material/VisibilityOutlined"));
const VisibilityOffOutlined_1 = __importDefault(require("@mui/icons-material/VisibilityOffOutlined"));
const ContentCopy_1 = __importDefault(require("@mui/icons-material/ContentCopy"));
const Warning_svg_1 = __importDefault(require("../../assets/account/Warning.svg"));
const InputText = ({ id, label, type, name, setValue, value, onChange, onBlur, error, onIconButtonClick, onAddressButtonClick }) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [capsLockOn, setCapsLockOn] = (0, react_1.useState)(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    (0, react_1.useEffect)(() => {
        const handleKeyEvent = (event) => {
            setCapsLockOn(event.getModifierState("CapsLock"));
        };
        document.addEventListener("keydown", handleKeyEvent);
        document.addEventListener("keyup", handleKeyEvent);
        return () => {
            document.removeEventListener("keydown", handleKeyEvent);
            document.removeEventListener("keyup", handleKeyEvent);
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [type === "text" && ((0, jsx_runtime_1.jsxs)(material_1.FormControl, { className: "input-text", sx: { width: "100%" }, variant: "standard", children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { htmlFor: id, sx: {
                            fontFamily: "Cobe",
                            fontSize: "20px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#AFAFAF",
                            padding: "5px",
                            top: "-10px",
                        }, children: label }), (0, jsx_runtime_1.jsx)(material_1.Input, { id: id, name: name, type: "text", sx: {
                            fontFamily: "Cobe",
                            fontSize: "20px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#FFFFFF",
                            padding: "5px",
                            top: "-10px",
                        }, onChange: onChange
                            ? onChange
                            : (e) => {
                                if (setValue)
                                    setValue(e.target.value);
                            }, value: value, onBlur: onBlur, error: error, autoComplete: "off" })] })), type === "mnemonic" && ((0, jsx_runtime_1.jsxs)(material_1.FormControl, { className: "input-text", sx: { width: "100%" }, variant: "standard", children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { htmlFor: id, sx: {
                            fontFamily: "Cobe",
                            fontSize: "20px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#AFAFAF",
                            padding: "5px",
                            top: "-10px",
                        }, children: label }), (0, jsx_runtime_1.jsx)(material_1.Input, { id: id, name: name, type: "text", onChange: onChange
                            ? onChange
                            : (e) => {
                                if (setValue)
                                    setValue(e.target.value);
                            }, value: value, onBlur: onBlur, error: error, endAdornment: (0, jsx_runtime_1.jsx)(InputAdornment_1.default, { position: "end", children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { "aria-label": "toggle password visibility", onClick: onIconButtonClick, onMouseDown: handleMouseDownPassword, className: "icon-button", tabIndex: -1, children: (0, jsx_runtime_1.jsx)(ContentCopy_1.default, { className: "icon-button" }) }) }), sx: {
                            fontFamily: "Cobe",
                            fontSize: "20px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#FFFFF",
                            padding: "5px",
                            top: "-10px",
                        }, autoComplete: "off" })] })), type === "password" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: !value && ((0, jsx_runtime_1.jsxs)(material_1.Stack, { spacing: "10px", sx: {
                                marginTop: "-42px",
                                backgroundColor: "rgb(49, 53, 53)",
                                padding: "16px",
                                borderRadius: "16px",
                                border: "1px solid rgb(71, 76, 76)",
                            }, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-16-regular white", children: t("cca-4_your-password-must") }), (0, jsx_runtime_1.jsxs)(material_1.Stack, { children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { className: "fs-14-regular light", children: ["\u2022 ", t("cca-5_at-least-8")] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { className: "fs-14-regular light", children: ["\u2022 ", t("cca-6_one-uppercase-letter")] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { className: "fs-14-regular light", children: ["\u2022 ", t("cca-7_one-lowercase-letter")] }), (0, jsx_runtime_1.jsxs)(material_1.Box, { className: "fs-14-regular light", children: ["\u2022 ", t("cca-8_one-number-character")] })] })] })), PopperProps: {
                            sx: {
                                [`& .MuiTooltip-tooltip`]: {
                                    maxWidth: "600px",
                                    backgroundColor: "transparent",
                                    boxShadow: "none",
                                },
                            },
                        }, children: (0, jsx_runtime_1.jsxs)(material_1.FormControl, { sx: { width: "100%" }, variant: "standard", className: "input-text", children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { htmlFor: id, sx: {
                                        fontFamily: "Cobe",
                                        fontSize: "20px",
                                        fontWeight: "400",
                                        lineHeight: "24px",
                                        color: "#AFAFAF",
                                        padding: "5px",
                                        top: "-10px",
                                    }, children: label }), (0, jsx_runtime_1.jsx)(material_1.Input, { id: id, name: name, type: showPassword ? "text" : "password", onChange: onChange
                                        ? onChange
                                        : (e) => {
                                            if (setValue)
                                                setValue(e.target.value);
                                        }, value: value, onBlur: onBlur, error: error, endAdornment: (0, jsx_runtime_1.jsx)(InputAdornment_1.default, { position: "end", children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { "aria-label": "toggle password visibility", onClick: handleClickShowPassword, onMouseDown: handleMouseDownPassword, className: "icon-button", tabIndex: -1, children: showPassword ? (0, jsx_runtime_1.jsx)(VisibilityOutlined_1.default, { className: "icon-button" }) : (0, jsx_runtime_1.jsx)(VisibilityOffOutlined_1.default, { className: "icon-button" }) }) }), sx: {
                                        fontFamily: "Cobe",
                                        fontSize: "20px",
                                        fontWeight: "400",
                                        lineHeight: "24px",
                                        color: "#FFFFFF",
                                        padding: "5px",
                                        top: "-10px",
                                        "& input[type='password']::-ms-reveal": {
                                            display: "none",
                                        },
                                        "& input[type='password']::-ms-clear": {
                                            display: "none",
                                        },
                                    } })] }) }), capsLockOn && ((0, jsx_runtime_1.jsxs)(material_1.Stack, { direction: "row", alignItems: "center", gap: "5px", padding: "0px 6px", children: [(0, jsx_runtime_1.jsx)(material_1.Box, { component: "img", src: Warning_svg_1.default, width: "20px", height: "20px" }), (0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-16-regular orange", children: t("wc-27_caps-lock-on") })] }))] })), type === "address" && ((0, jsx_runtime_1.jsxs)(material_1.FormControl, { className: "input-text", sx: { width: "100%" }, variant: "standard", children: [(0, jsx_runtime_1.jsx)(material_1.InputLabel, { htmlFor: id, sx: {
                            fontFamily: "Cobe",
                            fontSize: "20px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#AFAFAF",
                            padding: "5px",
                            top: "-10px",
                        }, children: label }), (0, jsx_runtime_1.jsx)(material_1.Input, { id: id, name: name, type: "text", onChange: onChange
                            ? onChange
                            : (e) => {
                                if (setValue)
                                    setValue(e.target.value);
                            }, value: value, onBlur: onBlur, error: error, endAdornment: (0, jsx_runtime_1.jsxs)(InputAdornment_1.default, { position: "end", children: [(0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: onIconButtonClick, onMouseDown: handleMouseDownPassword, className: "icon-button", tabIndex: -1, children: (0, jsx_runtime_1.jsx)(ContentCopy_1.default, { className: "icon-button" }) }), (0, jsx_runtime_1.jsx)(material_1.IconButton, { onClick: onAddressButtonClick, onMouseDown: handleMouseDownPassword, className: "icon-button", tabIndex: -1, children: (0, jsx_runtime_1.jsx)("i", { className: "pi pi-book icon-button" }) })] }), sx: {
                            fontFamily: "Cobe",
                            fontSize: "20px",
                            fontWeight: "400",
                            lineHeight: "24px",
                            color: "#FFFFF",
                            padding: "5px",
                            top: "-10px",
                        }, autoComplete: "off" })] }))] }));
};
exports.default = InputText;
//# sourceMappingURL=InputText.js.map