import { z, type ZodType } from "zod";
import type { ContractNoBodyType } from "@ts-rest/core";

export const apiSuccess = <T extends ZodType | ContractNoBodyType>(schema: T) =>
    schema;

export const apiError = <T, U>(code: ZodType<T>, error: ZodType<U>) =>
    z.object({
        code,
        error,
        name: z.literal("APIError"),
    });

export const apiErrorData = <T, U, V>(
    code: ZodType<T>,
    error: ZodType<U>,
    data: ZodType<V>
) =>
    z.object({
        code,
        error,
        name: z.literal("APIError"),
        data,
    });

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
