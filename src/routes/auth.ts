import express from "express"
import { registerUser, loginUser, deleteUser, getToken, changeUserRole } from "../service/authService";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();
const SUPER_ADMINS = ["bcook2289@gmail.com"]

router.post("/register", async(req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await registerUser({ email, password });
        res.status(201).json({id: user.id, email: user.email, role: user.role});
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const {token, user } = await loginUser(email, password);
        res.json({token, user: {id: user.id, email: user.email, role: user.role } });
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
});

router.delete("/delete", async(req, res) => {
    const {email} = req.body;
    if(!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        await deleteUser(email);
        res.status(200).json({message: `User with email ${email} deleted.`});
    } catch (err: any) {
        res.status(400).json({error: err.message});
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
        res.status(200).json({token})
    } catch (err: any) {
        res.status(400).json({ error: err.message })
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
        res.status(200).json({
            message: `User ${email} role updated to ${role}`,
            user: updatedUser,
        });
    } catch(err: any) {
        res.status(400).json({error: err.message});
    }
});

export default router;