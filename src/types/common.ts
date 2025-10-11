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