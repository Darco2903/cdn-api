import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    endpointCreate: {
        method: "POST",
        path: "/endpoint",
        body: z.object({
            storage_id: z.string().nonempty(),
            endpoint: z.string().nonempty(),
        }),
        responses: {
            200: apiSuccess(z.null()),
        },
    },
    endpointDelete: {
        method: "DELETE",
        path: "/endpoint",
        body: z.object({
            // storage_id: z.string().nonempty(),
            endpoint: z.string().nonempty(),
        }),
        responses: {
            200: apiSuccess(z.null()),
        },
    },
});
