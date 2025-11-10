import express from "express";

import { uploadImage, getImage, deleteImage } from "../controller/imageController";
import upload from "../middleware/image";
import { authenticateToken, requireAdmin} from "../middleware/auth";

const router = express.Router();

router.post(
    "/upload",
    authenticateToken,
    requireAdmin,
    upload.single("file"),
    uploadImage
);

router.get(
    "/:fileName",
    getImage
);

router.delete(
    "/:fileName", 
    authenticateToken, 
    requireAdmin, 
    deleteImage
);

export default router;