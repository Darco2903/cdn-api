import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { statsGlobalSchema } from "../types/stats.js";
// import { authHeaderSchema } from "auth-api";

const c = initContract();

export default c.router({
    global: {
        method: "GET",
        path: "/stats",
        responses: {
            200: apiSuccess(statsGlobalSchema),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    // globalAdmin: {
    //     method: "GET",
    //     path: "/stats/admin",
    //     responses: {
    //         200: apiSuccess(statsGlobalSchema),
    //         401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
    //         403: apiError(z.literal("FORBIDDEN"), z.literal("Forbidden")),
    //         500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
    //     },
    // },
    // user: {
    //     method: "GET",
    //     path: "/stats/:public_id",
    //     headers: authHeaderSchema,
    //     responses: {
    //         200: apiSuccess(
    //             z.object({
    //                 record_count: z.number().int().nonnegative(),
    //                 total_size: z.number().int().nonnegative(),
    //                 max_size: z.number().int().nonnegative(),
    //             })
    //         ),
    //         500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
    //     },
    // },
});
