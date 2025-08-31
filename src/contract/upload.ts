import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema } from "auth-api/client";
import { endpointPathSchema } from "../types/endpoint.js";
import { jsonStringAs } from "../types/data.js";

const c = initContract();

export default c.router({
    upload: {
        method: "POST",
        path: "/upload",
        headers: authHeaderSchema,
        contentType: "multipart/form-data",
        body: z.object({
            file: z.any(),
            data: jsonStringAs(
                z.object({
                    filename: z.string().min(3).max(100),
                    role: z.number().int().min(0).max(255),
                    visible: z.boolean(),
                    active: z.boolean(),
                })
            ),
        }),
        responses: {
            200: apiSuccess(z.null()),
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("BAD_REQUEST"), z.string()),
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            429: apiError(z.literal("TOO_MANY_REQUESTS"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    uploadInit: {
        method: "POST",
        path: "/upload/init",
        contentType: "multipart/form-data",
        body: z.object({
            endpoint: endpointPathSchema.optional(),
        }),
        responses: {
            200: apiSuccess(z.null()),
            400: apiError(z.literal("BAD_REQUEST"), z.string()),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
        },
    },
    uploadPart: {
        method: "POST",
        path: "/upload/part/:storage_id/:part",
        contentType: "multipart/form-data",
        body: z.object({}),
        responses: {
            200: apiSuccess(z.null()),
            400: apiError(z.literal("BAD_REQUEST"), z.string()),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
        },
    },
    uploadEnd: {
        method: "POST",
        path: "/upload/end/:storage_id",
        contentType: "multipart/form-data",
        body: z.object({}),
        responses: {
            200: apiSuccess(z.null()),
            400: apiError(z.literal("BAD_REQUEST"), z.string()),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
        },
    },
});
