import express from "express"
import { registerUser, loginUser, deleteUser, getToken, changeUserRole } from "../service/authService";
import { authenticateToken } from "../middleware/auth";
import { AuthRequest } from "../types/common";

const router = express.Router();
const SUPER_ADMINS = ["bcook2289@gmail.com"]

router.post("/register", async(req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await registerUser({ email, password });
        return res.status(201).json({
            id: user.id, 
            email: user.email, 
            role: user.role
        });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const {token, user } = await loginUser(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "Login Successful",
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            }
        })
    } catch (err: any) {
        if(err.message.includes("password") || err.message.includes("User not found")) {
            return res.status(401).json({error: "Invalid email or password"});
        } 
        console.error("Unexpected error: ", err);
        return res.status(500).json({error: "Something went wrong on our end"});
    }
});

router.post("/logout", async (_req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        return res.status(200).json({
            message: "Logout Successful"
        })
    } catch (err: any) {
        return res.status(500).json({error: "Failed to logout"});
    }
})

router.get("/me", authenticateToken, async( req: AuthRequest, res) => {
    return res.json({user: req.user});
})

router.delete("/delete", async(req, res) => {
    const {email} = req.body;
    if(!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        await deleteUser(email);
        return res.status(200).json({message: `User with email ${email} deleted.`});
    } catch (err: any) {
        return res.status(400).json({error: err.message});
    }
});

router.post("/token", async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            error: "Email and password required"
        });
    }

    try {
        const token = await getToken(email, password);
        return res.status(200).json({token})
    } catch (err: any) {
        return res.status(400).json({ error: err.message })
    }
});

// DEV ONLY
router.put("/role", authenticateToken, async (req: any, res) => {
    const {email, role} = req.body;

    if(!SUPER_ADMINS.includes(req.user.email)) {
        return res.status(403).json({error: "You do not have permission to change roles"})
    }

    try {
        const updatedUser = await changeUserRole(email, role);
        return res.status(200).json({
            message: `User ${email} role updated to ${role}`,
            user: updatedUser,
        });
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
});

export default router;