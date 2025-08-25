import { z } from "zod";

export const endpointPathSchema = z
    .string()
    .max(256)
    .regex(/^(\/[a-zA-Z0-9]+([_.-][a-zA-Z0-9]+)*)*$/, "Invalid endpoint");

export const endpointPublicSchema = z.object({
    endpoint: endpointPathSchema,
});

export type EndpointPublic = z.infer<typeof endpointPublicSchema>;

export const endpointSchema = endpointPublicSchema.extend({
    created_at: z.date(),
    updated_at: z.date(),
});

export type Endpoint = z.infer<typeof endpointSchema>;
