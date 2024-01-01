"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_1 = require("helpers/aws");
async function imageRouter(app) {
    app.addContentTypeParser(/^image\//, { parseAs: 'buffer' }, (req, body, done) => {
        done(null, body);
    });
    app.post('/upload', {
        onRequest: [app.authenticate],
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    }
                }
            }
        },
    }, async (req, res) => {
        const fileBuffer = req.body;
        console.log(fileBuffer);
        const contentType = req.headers['Content-Type'] || req.headers['content-type'];
        const result = (0, aws_1.putPresginUrl)({ userId: req.user.id, fileData: req.body, fileType: contentType });
        return res.status(200).send(JSON.stringify(result, null, " "));
    });
}
exports.default = imageRouter;
//# sourceMappingURL=image.router.js.map