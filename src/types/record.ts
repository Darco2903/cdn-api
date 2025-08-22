import { z } from "zod";
import { EndpointSchema } from "./endpoint.js";

export const RecordPublicSchema = z.object({
    filename: z.string(),
    // size: z.bigint().min(0n),
    size: z.string().regex(/^\d+$/), // Store as string to avoid bigint issues in JSON
    type: z.string(),
    endpoints: z.array(EndpointSchema),
});

export type RecordPublic = z.infer<typeof RecordPublicSchema>;

export const RecordSchema = RecordPublicSchema.extend({
    storage_id: z.string(),
    role: z.number().int().min(-1).max(255),
    user_id: z.string(),
    visible: z.boolean(),
    active: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
});

export type Record = z.infer<typeof RecordSchema>;
