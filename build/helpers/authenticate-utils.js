"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
async function authenticate(fastify, jwtToken) {
    const verificationResult = await fastify.jwt.verify(jwtToken);
    const { userId } = verificationResult;
    return userId;
}
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate-utils.js.map