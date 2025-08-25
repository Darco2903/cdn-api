import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema } from "../types/creds.js";
import { recordSchema, recordPublicSchema } from "../types/record.js";

const c = initContract();

export default c.router({
    list: {
        method: "GET",
        path: "/list",
        headers: authHeaderSchema,
        responses: {
            200: apiSuccess(z.array(recordPublicSchema)),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    listAdmin: {
        method: "GET",
        path: "/list/admin",
        headers: authHeaderSchema,
        responses: {
            200: apiSuccess(z.array(recordSchema)),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
