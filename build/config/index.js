"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkExpireTime = exports.awsBucketName = exports.awsConfig = void 0;
const path_1 = __importDefault(require("path"));
const env_schema_1 = __importDefault(require("env-schema"));
const fluent_json_schema_1 = __importDefault(require("fluent-json-schema"));
exports.awsConfig = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
};
exports.awsBucketName = process.env.AWS_BUCKET_NAME;
exports.linkExpireTime = process.env.AWS_LINK_EXPIRE;
function loadConfig() {
    const result = require('dotenv').config({
        path: path_1.default.join(__dirname, '..', '..', '.env'),
    });
    if (result.error) {
        throw new Error(result.error);
    }
    (0, env_schema_1.default)({
        data: result.parsed,
        schema: fluent_json_schema_1.default.object()
            .prop('NODE_ENV', fluent_json_schema_1.default.string().enum(['development', 'testing', 'production']).required())
            .prop('API_HOST', fluent_json_schema_1.default.string().required())
            .prop('API_PORT', fluent_json_schema_1.default.string().required())
            .prop('DATABASE_URL', fluent_json_schema_1.default.string().required())
            .prop('APP_JWT_SECRET', fluent_json_schema_1.default.string().required())
            .valueOf()
    });
}
exports.default = loadConfig;
//# sourceMappingURL=index.js.map