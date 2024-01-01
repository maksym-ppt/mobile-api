"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { utils } from './helpers/utils';
const user_router_1 = __importDefault(require("./routes/user.router"));
const image_router_1 = __importDefault(require("./routes/image.router"));
const prisma_plugin_1 = require("./plugins/prisma-plugin");
const authenticate_plugin_1 = require("./plugins/authenticate-plugin");
const server_1 = require("./server");
const formbody_1 = __importDefault(require("@fastify/formbody"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const cors_1 = __importDefault(require("@fastify/cors"));
async function run() {
    if (process.env.NODE_ENV === 'developement') {
        await server_1.fastify.register(cors_1.default, {
            credentials: true,
        });
        await server_1.fastify.register(rate_limit_1.default, {
            max: 200,
            timeWindow: '1 minute',
        });
    }
    await server_1.fastify.register(helmet_1.default, { hidePoweredBy: true });
    await server_1.fastify.register(formbody_1.default);
    await server_1.fastify.register(multipart_1.default);
    await server_1.fastify.register(authenticate_plugin_1.authenticatePlugin);
    await server_1.fastify.register(prisma_plugin_1.prismaPlugin);
    await server_1.fastify.register(user_router_1.default, { prefix: '/api/v1/user' });
    await server_1.fastify.register(image_router_1.default, { prefix: '/api/v1/image' });
    // await fastify.register(postRouter, { prefix: '/api/v1/post' });
    server_1.fastify.setErrorHandler((error, request, reply) => {
        server_1.fastify.log.error(error);
    });
    server_1.fastify.get('/', (request, reply) => {
        reply.send({ name: 'mobile-api' });
    });
    // fastify.get('/health-check', async (request, reply) => {
    //   try {
    //     await utils.healthCheck()
    //     reply.status(200).send()
    //   } catch (e) {
    //     reply.status(500).send()
    //   }
    // })
    if (process.env.NODE_ENV === 'production') {
        for (const signal of ['SIGINT', 'SIGTERM']) {
            process.on(signal, () => server_1.fastify.close().then((err) => {
                console.log(`close application on ${signal}`);
                process.exit(err ? 1 : 0);
            }));
        }
    }
    await server_1.fastify.listen({ port: parseInt(process.env.PORT ?? '3000') });
}
run().catch((error) => {
    server_1.fastify.log.error(error);
    process.exit(1);
});
process.on('unhandledRejection', (e) => {
    server_1.fastify.log.error('Unhandled promise rejection error.');
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=index.js.map