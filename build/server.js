"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastify = void 0;
const fastify_1 = __importDefault(require("fastify"));
const pino_1 = __importDefault(require("pino"));
const config_1 = __importDefault(require("./config"));
(0, config_1.default)();
function getLoggerOptions(environment) {
    if (process.env.NODE_ENV === 'production') {
        return true;
    }
    else if (process.env.NODE_ENV === 'development') {
        return {
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname',
                },
            },
            level: 'debug',
        };
    }
    else {
        return true;
    }
}
exports.fastify = (0, fastify_1.default)({ logger: (0, pino_1.default)({ level: 'info' }) });
//# sourceMappingURL=server.js.map