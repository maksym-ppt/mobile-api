"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaPlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const client_1 = require("@prisma/client");
exports.prismaPlugin = (0, fastify_plugin_1.default)(async (fastify) => {
    fastify.log.info('Connecting to DB...');
    const prisma = new client_1.PrismaClient();
    await prisma.$connect();
    fastify.decorate('prisma', prisma);
    fastify.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
    });
    fastify.log.info('Successfully connected to DB.');
});
//# sourceMappingURL=prisma-plugin.js.map