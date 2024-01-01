"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function userRouter(app) {
    app.post('/verify-phone', {
        schema: {
            body: {
                type: 'object',
                additionalProperties: false,
                required: ['phone'],
                properties: {
                    phone: { type: 'string' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    }
                }
            }
        }
    }, async (req, res) => {
        const { phone } = req.body;
        const verificationCode = "0000"; // Implement this function
        await app.prisma.verificationCode.upsert({
            where: { phone: phone },
            update: { code: verificationCode },
            create: { phone: phone, code: verificationCode }
        });
        res.statusCode = 200;
        return { message: 'Confirmation SMS sent. Please check your phone to complete registration.' };
    });
    app.post('/verify-code', {
        schema: {
            body: {
                type: 'object',
                additionalProperties: false,
                required: ['phone', 'code'],
                properties: {
                    phone: { type: 'string' },
                    code: { type: 'string' }
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        user: { type: 'object' },
                        token: { type: 'string' }
                    }
                }
            }
        }
    }, async (req, res) => {
        const { phone, code } = req.body;
        const verificationRecord = await app.prisma.verificationCode.findUnique({ where: { phone } });
        if (verificationRecord && verificationRecord.code === code) {
            // Check if user exists
            let user = await app.prisma.user.findUnique({ where: { phone } });
            if (!user) {
                // Create new user
                user = await app.prisma.user.create({ data: { phone } });
            }
            // Delete the verification code after successful verification
            await app.prisma.verificationCode.delete({ where: { id: verificationRecord.id } });
            // Generate JWT token
            const token = app.jwt.sign({ userId: user.id }); // Implement JWT token generation
            return {
                user,
                token: app.jwt.sign({ userId: user.id })
            };
        }
        else {
            res.status(400).send("Invalid code or phone number");
        }
    });
}
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map