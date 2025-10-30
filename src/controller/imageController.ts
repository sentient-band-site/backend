import { Request, Response, RequestHandler } from "express";
import supabase from "../lib/supabase";
import { FileParams } from "../types/common";

const bucket = process.env.SUPABASE_BUCKET_NAME!;

export const uploadImage = async (req: Request, res: Response) => {
    try {
        if(!req.file) {
            return res.status(400).json({error: "No Image File Provided"});
        }

        const file = req.file;
        const filePath = `uploads/${file.originalname}`;

        const {data, error} = await supabase.storage
        .from(bucket)
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
        });

        if (error) throw error;

        const {data: publicURLData} = supabase.storage.from(bucket).getPublicUrl(filePath);

        return res.status(200).json({
            message: "Image Stored Successfully",
            url: publicURLData.publicUrl,
            path: filePath,
        });
    } catch(err: any) {
        console.error("Upload failed:", err.message);
        res.status(500).json({error: err.message});
    }
};

export const getImage = async (req: Request<FileParams>, res: Response) => {
    try {
        const { fileName } = req.params;

        const {data, error} = await supabase.storage.from(bucket).createSignedUrl(fileName, 60 * 60);

        if(error) throw error;

        res.status(200).json({ url:data.signedUrl });
    } catch (err: any) {
        console.error("Get failed:", err.message);
        res.status(500).json({error: err.message});
    }
}

export const deleteImage =  async (req: Request<FileParams>, res: Response) => {
    try {
        const { fileName } = req.params;

        const { error } = await supabase.storage.from(bucket).remove([fileName])

        if(error) throw error;

        res.status(200).json({message: "Image deleted"});
    } catch (err: any) {
        console.error("Delete failed:", err.message);
        res.status(500).json({error: err.message});
    }
};