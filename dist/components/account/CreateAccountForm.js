"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
// import { useDispatch, useSelector } from "react-redux";
const react_i18next_1 = require("react-i18next");
const formik_1 = require("formik");
const Yup = __importStar(require("yup"));
const material_1 = require("@mui/material");
const AccountNextButton_1 = __importDefault(require("./AccountNextButton"));
const InputText_1 = __importDefault(require("./InputText"));
const IAgreeTerms_1 = __importDefault(require("./IAgreeTerms"));
// import { IAccount } from "../../types/accountTypes";
// import { getTempAccount, setTempAccount } from "../../features/account/TempAccountSlice";
const CreateAccountForm = () => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    // const dispatch = useDispatch();
    // const tempAccountStore: IAccount = useSelector(getTempAccount);
    const [checked, setChecked] = (0, react_1.useState)(false);
    const formik = (0, formik_1.useFormik)({
        initialValues: {
            password: "",
            passwordMatch: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .test("password-requirements", t("cca-66_password-must-be"), (value) => {
                if (!value) {
                    return false;
                }
                const checks = [
                    /[a-z]/.test(value), // Check for lowercase letter
                    /[A-Z]/.test(value), // Check for uppercase letter
                    /\d/.test(value), // Check for digit
                    /^[^\s'";\\]+$/.test(value), // Exclude spaces, single quotes, double quotes, semicolons, and backslashes
                    value.length >= 8, // Check for minimum length
                ];
                const passedConditions = checks.filter(Boolean).length;
                return passedConditions >= 4;
            })
                .required(t("cca-63_required")),
            passwordMatch: Yup.string()
                .required(t("cca-63_required"))
                .oneOf([Yup.ref("password")], t("cca-64_password-must-match")),
        }),
        onSubmit: () => {
            try {
                const newPassword = formik.values.password;
                // const newTempAccountStore: IAccount = {
                //   ...tempAccountStore,
                //   password: newPassword,
                // };
                // dispatch(setTempAccount(newTempAccountStore));
                navigate("/non-custodial/signup/2");
            }
            catch (err) {
                // console.log("Failed at CreateAccountForm: ", err);
            }
        },
    });
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("form", { onSubmit: formik.handleSubmit, children: (0, jsx_runtime_1.jsxs)(material_1.Stack, { gap: "24px", children: [(0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-24-regular white", children: t("ncca-1_create-account") }), (0, jsx_runtime_1.jsxs)(material_1.Stack, { children: [(0, jsx_runtime_1.jsx)(InputText_1.default, { id: "password", label: t("ncca-3_password"), type: "password", name: "password", value: formik.values.password, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.password && formik.errors.password ? true : false }), formik.touched.password && formik.errors.password && (0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-16-regular red", children: formik.errors.password })] }), (0, jsx_runtime_1.jsxs)(material_1.Stack, { children: [(0, jsx_runtime_1.jsx)(InputText_1.default, { id: "repeat-password", label: t("ncca-5_repeat-password"), type: "password", name: "passwordMatch", value: formik.values.passwordMatch, onChange: formik.handleChange, onBlur: formik.handleBlur, error: formik.touched.passwordMatch && formik.errors.passwordMatch ? true : false }), formik.touched.passwordMatch && formik.errors.passwordMatch && (0, jsx_runtime_1.jsx)(material_1.Box, { className: "fs-16-regular red", children: formik.errors.passwordMatch })] }), (0, jsx_runtime_1.jsx)(IAgreeTerms_1.default, { checked: checked, setChecked: setChecked }), (0, jsx_runtime_1.jsx)(AccountNextButton_1.default, { isSubmit: true, text: t("ncca-7_next"), disabled: (formik.errors.password ? true : false || formik.errors.passwordMatch ? true : false) || !checked })] }) }) }));
};
exports.default = CreateAccountForm;
//# sourceMappingURL=CreateAccountForm.js.map