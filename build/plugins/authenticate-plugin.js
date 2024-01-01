"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatePlugin = void 0;
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const jwt_1 = require("@fastify/jwt");
exports.authenticatePlugin = (0, fastify_plugin_1.default)(async (fastify) => {
    await fastify.register(jwt_1.fastifyJwt, { secret: process.env.APP_JWT_SECRET });
    fastify.decorate('authenticate', async (request, reply) => {
        try {
            const verificationResult = await request.jwtVerify();
            const { userId } = verificationResult;
            request.user = await fastify.prisma.user.findFirstOrThrow({ where: { id: userId } });
        }
        catch (error) {
            reply.status(401);
            reply.send({ description: 'Unauthorized', error });
        }
    });
});
//# sourceMappingURL=authenticate-plugin.js.map