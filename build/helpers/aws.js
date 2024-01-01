"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPresginUrl = exports.getPresginUrl = void 0;
const aws_sdk_1 = require("aws-sdk");
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("config");
const s3 = new aws_sdk_1.S3({
    accessKeyId: config_1.awsConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: config_1.awsConfig.AWS_SECRET_KEY,
    region: config_1.awsConfig.AWS_REGION,
});
const getPresginUrl = async (data) => {
    return await s3.getSignedUrlPromise('getObject', {
        Bucket: config_1.awsBucketName,
        Key: data.fileName,
        Expires: config_1.linkExpireTime,
    });
};
exports.getPresginUrl = getPresginUrl;
// export const putPresginUrl = async (data: IPutPresign) => {
//   const { userId, fileName } = data
//   return await s3.getSignedUrlPromise('putObject', {
//     Bucket: awsBucketName,
//     Key: `${Date.now()}_${userId}_${fileName}`,
//     Expires: linkExpireTime,
//   })
// }
const putPresginUrl = async (data) => {
    const { userId, fileData, fileType } = data;
    const filename = crypto_1.default.randomUUID() + getExtension(fileType); // Generate a unique filename
    const signedRequest = await s3.getSignedUrlPromise('putObject', {
        Bucket: config_1.awsBucketName,
        Key: filename,
        Body: fileData,
        Expires: config_1.linkExpireTime,
        ContentType: fileType,
        ACL: 'public-read'
    });
    return {
        signedRequest: signedRequest,
        url: `https://${config_1.awsBucketName}.s3.amazonaws.com/${filename}`
    };
};
exports.putPresginUrl = putPresginUrl;
function getExtension(contentType) {
    switch (contentType) {
        case 'image/jpeg':
            return '.jpg';
        case 'image/png':
            return '.png';
        case 'image/gif':
            return '.gif';
        default:
            return '';
    }
}
//# sourceMappingURL=aws.js.map