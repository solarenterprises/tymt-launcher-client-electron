"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const react_i18next_1 = require("react-i18next");
const en_json_1 = __importDefault(require("./en.json"));
const jp_json_1 = __importDefault(require("./jp.json"));
i18next_1.default.use(react_i18next_1.initReactI18next).init({
    resources: {
        en: Object.assign({}, en_json_1.default),
        jp: Object.assign({}, jp_json_1.default),
    },
    lng: "en",
});
exports.default = i18next_1.default;
//# sourceMappingURL=i18n.js.map