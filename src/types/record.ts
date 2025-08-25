import { z } from "zod";
import { endpointPublicSchema, endpointSchema } from "./endpoint.js";

export const recordPublicSchema = z.object({
    storage_id: z.string(),
    filename: z.string(),
    // size: z.bigint().min(0n),
    size: z.string().regex(/^\d+$/), // Store as string to avoid bigint issues in JSON
    type: z.string(),
    endpoints: z.array(endpointPublicSchema),
});

export type RecordPublic = z.infer<typeof recordPublicSchema>;

export const recordSchema = recordPublicSchema.extend({
    endpoints: z.array(endpointSchema),
    role: z.number().int().min(-1).max(255),
    user_id: z.string(),
    visible: z.boolean(),
    active: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
});

export type Record = z.infer<typeof recordSchema>;
