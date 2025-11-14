import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type {AuthRequest, jwtPayload} from "../types/common"

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("Cookies received:", req.cookies)
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({error: "No token provided"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwtPayload;
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(403).json({error: "Invalid token"});
    };
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({error: "Admin access required" });
    }
    next();
};