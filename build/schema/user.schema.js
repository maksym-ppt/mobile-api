"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCodeSchema = exports.verifyPhoneSchema = exports.signupSchema = exports.loginSchema = void 0;
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
exports.loginSchema = {
    body: fluent_json_schema_1.default.object()
        .prop('email', fluent_json_schema_1.default.string().required())
        .prop('password', fluent_json_schema_1.default.string().minLength(8).required()),
    queryString: fluent_json_schema_1.default.object(),
    params: fluent_json_schema_1.default.object(),
    headers: fluent_json_schema_1.default.object(),
};
exports.signupSchema = {
    body: fluent_json_schema_1.default.object(),
    queryString: fluent_json_schema_1.default.object(),
    params: fluent_json_schema_1.default.object(),
    headers: fluent_json_schema_1.default.object(),
};
exports.verifyPhoneSchema = {
    body: fluent_json_schema_1.default.object().prop('phone', fluent_json_schema_1.default.string().required()),
    queryString: fluent_json_schema_1.default.object(),
    params: fluent_json_schema_1.default.object(),
    headers: fluent_json_schema_1.default.object(),
};
exports.verifyCodeSchema = {
    body: fluent_json_schema_1.default.object()
        .prop('phone', fluent_json_schema_1.default.string().required())
        .prop('code', fluent_json_schema_1.default.string().minLength(4).required()),
    queryString: fluent_json_schema_1.default.object(),
    params: fluent_json_schema_1.default.object(),
    headers: fluent_json_schema_1.default.object(),
};
//# sourceMappingURL=user.schema.js.map