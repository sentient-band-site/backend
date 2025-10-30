import express, { RequestHandler } from "express";

import { uploadImage, getImage, deleteImage } from "../controller/imageController";
import upload from "../middleware/upload";
import { authenticateToken, requireAdmin} from "../middleware/auth";
import { FileParams } from "../types/common";

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
    authenticateToken as RequestHandler<FileParams>, 
    requireAdmin as RequestHandler<FileParams>, 
    deleteImage as RequestHandler<FileParams>
);

export default router;