import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema } from "auth-api/client";
import { recordSchema } from "../types/record.js";

const c = initContract();

export default c.router({
    get: {
        method: "GET",
        path: "/record/:storage_id",
        headers: authHeaderSchema,
        responses: {
            200: apiSuccess(recordSchema),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Record not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    update: {
        method: "POST",
        path: "/record/:storage_id",
        headers: authHeaderSchema,
        body: z.union([
            z.object({
                filename: z.string().max(128),
                role: z.number().gte(0).optional(),
                active: z.boolean().optional(),
                visible: z.boolean().optional(),
            }),
            z.object({
                filename: z.string().max(128).optional(),
                role: z.number().gte(0),
                active: z.boolean().optional(),
                visible: z.boolean().optional(),
            }),
            z.object({
                filename: z.string().max(128).optional(),
                role: z.number().gte(0).optional(),
                active: z.boolean(),
                visible: z.boolean().optional(),
            }),
            z.object({
                filename: z.string().max(128).optional(),
                role: z.number().gte(0).optional(),
                active: z.boolean().optional(),
                visible: z.boolean(),
            }),
        ]),
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Record not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    delete: {
        method: "DELETE",
        path: "/record/:storage_id",
        headers: authHeaderSchema,
        responses: {
            200: apiSuccess(z.null()),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Record not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
