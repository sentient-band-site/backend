import { Router } from "express";
import {getReleases, updateRelease, deleteRelease, createRelease} from "../controller/releaseController"

const router = Router();

router.get("/", getReleases);
router.post("/", createRelease);
router.put("/:id", updateRelease);
router.delete("/:id", deleteRelease);

export default router;