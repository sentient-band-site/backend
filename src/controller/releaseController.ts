import { Request, Response } from "express";
import * as releaseService from "../service/releaseService";

export const getReleases = async (_req: Request, res: Response) => {
    const releases = await releaseService.getAll();
    res.json(releases);
}

export const createRelease = async (req: Request, res: Response) => {
    const newRelease = await releaseService.createRelease(req.body);
    res.status(201).json(newRelease);
};

export const updateRelease = async(req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await releaseService.updateRelease( Number(id) , req.body);
    res.json(updated)
}

export const deleteRelease = async(req: Request, res: Response) => {
    const { id } = req.params;
    await releaseService.deleteRelease(Number(id));
    res.status(204).send();
}