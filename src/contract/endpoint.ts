import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema } from "@darco2903/auth-api/client";
import { endpointPathSchema } from "../types/endpoint.js";

const c = initContract();

export default c.router({
    create: {
        method: "POST",
        path: "/endpoint",
        headers: authHeaderSchema,
        body: z.object({
            storage_id: z.string().nonempty(),
            endpoint: endpointPathSchema,
        }),
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Record not found")
            ),
            409: apiError(
                z.literal("CONFLICT"),
                z.literal("Endpoint already exists")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    delete: {
        method: "DELETE",
        path: "/endpoint",
        headers: authHeaderSchema,
        body: z.object({
            endpoint: endpointPathSchema,
        }),
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Endpoint not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
