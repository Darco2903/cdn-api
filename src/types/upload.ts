import z from "zod";

export const uploadDataSchema = z.object({
    filename: z.string().min(3).max(100),
    role: z.number().int().min(0).max(255),
    visible: z.boolean(),
    active: z.boolean(),
});

export type UploadData = z.infer<typeof uploadDataSchema>;

export const uploadInitSchema = uploadDataSchema.extend({
    size: z.number().int().min(1),
    mimeType: z.string().max(100),
    parts: z.number().int().min(1),
});

export type UploadInit = z.infer<typeof uploadInitSchema>;
