import { z } from "zod";

export function jsonStringAs<T extends z.ZodTypeAny>(
    schema: T
): z.ZodEffects<z.ZodString, z.infer<T>> {
    return z.string().transform((str, ctx) => {
        try {
            return schema.parse(JSON.parse(str));
        } catch {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Invalid JSON",
            });
            return z.NEVER;
        }
    });
}
