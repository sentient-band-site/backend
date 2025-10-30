import { Request } from "express";
import {ParamsDictionary} from "express-serve-static-core"

export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: string;
        email: string;
    }
};

export interface jwtPayload {
    id: number;
    role: string;
    email: string;
}

export interface FileParams extends ParamsDictionary {
    fileName: string;
}