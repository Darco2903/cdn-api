import z from "zod";

const jwtSchema = z.string().startsWith("Bearer ");

export const cdnHeaderSchema = z.object({
    authorization: jwtSchema,
});
