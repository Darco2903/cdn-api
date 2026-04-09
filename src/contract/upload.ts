import { initContract, ZodErrorSchema } from "@ts-rest/core";
import z from "zod";
import { authHeaderSchema } from "@darco2903/auth-api/client";
import { apiError, apiSuccess, jsonStringAs } from "../types.js";
import { uploadDataSchema, uploadInitSchema } from "../types/index.js";

const c = initContract();

export default c.router({
    upload: {
        method: "POST",
        path: "/upload",
        headers: authHeaderSchema,
        contentType: "multipart/form-data",
        body: z.object({
            file: z.any(),
            data: jsonStringAs(uploadDataSchema),
        }),
        responses: {
            204: apiSuccess(z.undefined()),
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("BAD_REQUEST"), z.string()),
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    uploadInit: {
        method: "POST",
        path: "/upload/init",
        body: uploadInitSchema,
        responses: {
            200: apiSuccess(
                z.object({
                    uploadId: z.string(),
                })
            ),
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("BAD_REQUEST"), z.string()),
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    uploadPart: {
        method: "POST",
        path: "/upload/part/:upload_id/:part",
        contentType: "multipart/form-data",
        body: z.object({
            file: z.any(),
        }),
        responses: {
            204: apiSuccess(z.undefined()),
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("BAD_REQUEST"), z.string()),
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            404: apiError(z.literal("NOT_FOUND"), z.string()),
            409: apiError(z.literal("CONFLICT"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    uploadEnd: {
        method: "POST",
        path: "/upload/end/:upload_id",
        body: z.undefined(),
        responses: {
            204: apiSuccess(z.undefined()),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            404: apiError(z.literal("NOT_FOUND"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
