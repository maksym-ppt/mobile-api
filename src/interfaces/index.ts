
import { FastifyRequest } from 'fastify';
import { Prisma, User } from '@prisma/client';

export interface IUserRequest extends FastifyRequest {
    body: IVerifyCode
    authUser: User
}

export interface IVerifyPhone  {
    phone: string;
}

export interface IVerifyCode {
    phone: string;
    code: string;
}

export interface IUserAuthToken {
    id: number;
    email: string;
}

export interface IGetPresign {
    fileName: string;
}

export interface IPutPresign {
    userId: number;
    fileData: Buffer;
    // fileName: string;
    fileType: string;
}