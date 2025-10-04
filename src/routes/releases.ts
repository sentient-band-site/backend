import { Router } from "express";
import {getReleases, updateRelease, deleteRelease, createRelease} from "../controller/releaseController"
import { authenticateToken, requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/", getReleases);
router.post(
    "/",
    authenticateToken,
    requireAdmin, 
    createRelease
);
router.put(
    "/:id", 
    authenticateToken,
    requireAdmin,
    updateRelease
);
router.delete(
    "/:id",
    authenticateToken,
    requireAdmin, 
    deleteRelease
);

export default router;