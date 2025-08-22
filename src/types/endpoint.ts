import { z } from "zod";

export const endpointPathSchema = z
    .string()
    .max(256)
    .regex(/^(\/[a-zA-Z0-9]+([_.-][a-zA-Z0-9]+)*)*$/, "Invalid endpoint");

export const EndpointSchema = z.object({
    endpoint: endpointPathSchema,
    created_at: z.date(),
    updated_at: z.date(),
});

export type Endpoint = z.infer<typeof EndpointSchema>;
