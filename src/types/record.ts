import z from "zod";
import { userPublicIdSchema } from "@darco2903/auth-api/client";
import { endpointPublicSchema, endpointSchema } from "./endpoint.js";
import { STORAGE_PUBLIC_ID_LENGTH } from "../consts.js";

export const storagePublicIdSchema = z
    .string()
    .length(STORAGE_PUBLIC_ID_LENGTH);

export const recordPublicSchema = z.object({
    storage_id: storagePublicIdSchema,
    filename: z.string(),
    size: z.number().int().gte(0),
    mime_type: z.string(),
    endpoints: z.array(endpointPublicSchema),
});

export type RecordPublic = z.infer<typeof recordPublicSchema>;

export const recordTypeSchema = z.enum(["service", "system", "user"]);

export type RecordType = z.infer<typeof recordTypeSchema>;

export const recordSchema = recordPublicSchema.extend({
    endpoints: z.array(endpointSchema),
    role: z.number().int().min(-1).max(255),
    user_id: userPublicIdSchema.nullable(),
    type: recordTypeSchema,
    visible: z.boolean(),
    active: z.boolean(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
});

export type Record = z.infer<typeof recordSchema>;
