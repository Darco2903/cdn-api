import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { cdnHeaderSchema } from "../types/creds.js";

const c = initContract();

export default c.router({
    update: {
        method: "POST",
        path: "/service/asset",
        headers: cdnHeaderSchema,
        contentType: "multipart/form-data",
        body: z.object({}),
        responses: {
            200: apiSuccess(z.null()),
            400: apiError(z.literal("BAD_REQUEST"), z.string()),
            401: apiError(
                z.literal("UNAUTHORIZED"),
                z.literal("Invalid CDN token")
            ),
            429: apiError(z.literal("TOO_MANY_REQUESTS"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    delete: {
        method: "DELETE",
        path: "/service/asset",
        headers: cdnHeaderSchema,
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(
                z.literal("UNAUTHORIZED"),
                z.literal("Invalid CDN token")
            ),
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Service asset not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
