import { z } from "zod";
import { endpointPublicSchema, endpointSchema } from "./endpoint.js";

export const recordPublicSchema = z.object({
    storage_id: z.string(),
    filename: z.string(),
    size: z.number().int().gte(0),
    mime_type: z.string(),
    endpoints: z.array(endpointPublicSchema),
});

export type RecordPublic = z.infer<typeof recordPublicSchema>;

export const recordSchema = recordPublicSchema.extend({
    endpoints: z.array(endpointSchema),
    role: z.number().int().min(-1).max(255),
    user_id: z.string().nullable(),
    type: z.enum(["service", "system", "user"]),
    visible: z.boolean(),
    active: z.boolean(),
    created_at: z.date(),
    updated_at: z.date(),
});

export type Record = z.infer<typeof recordSchema>;
