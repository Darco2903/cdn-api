import { z } from "zod";

export const jwtSchema = z.string().startsWith("Bearer ");

export const cdnHeaderSchema = z.object({
    authorization: jwtSchema,
});
