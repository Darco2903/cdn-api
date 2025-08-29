import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema } from "auth-api";

const c = initContract();

export default c.router({
    access: {
        method: "GET",
        path: "/auth/access",
        headers: authHeaderSchema,
        responses: {
            200: apiSuccess(
                z.object({
                    access: z.boolean(),
                })
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
