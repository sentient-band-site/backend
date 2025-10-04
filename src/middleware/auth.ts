import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface AuthReqest extends Request {
    user?: {
        id: number;
        role: string;
        email: string;
    }
};

export const authenticateToken = (req: AuthReqest, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({error: "No token provided"});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: number;
            role: string;
            email: string;
        };
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(403).json({error: "Invalid token"});
    };
};

export const requireAdmin = (req: AuthReqest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({error: "Admin access required" });
    }
    next();
};