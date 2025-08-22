import { z } from "zod";

export const jwtSchema = z.string().startsWith("Bearer ");

export const authHeaderSchema = z.object({
    authorization: jwtSchema.optional(),
});

export const cdnHeaderSchema = z.object({
    authorization: jwtSchema,
});
