import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    endpointCreate: {
        method: "POST",
        path: "/endpoint/:storage_id",
        body: z.null(),
        responses: {
            200: apiSuccess(z.null()),
        },
    },
    endpointDelete: {
        method: "DELETE",
        path: "/endpoint/:endpoint_id",
        responses: {
            200: apiSuccess(z.null()),
        },
    },
});
