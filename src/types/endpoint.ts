import { z } from "zod";

export const EndpointSchema = z.object({
    endpoint: z
        .string()
        .regex(/^(\/[a-zA-Z0-9]+([_.-][a-zA-Z0-9]+)*)*$/, "Invalid endpoint"),
    created_at: z.date(),
    updated_at: z.date(),
});

export type Endpoint = z.infer<typeof EndpointSchema>;
