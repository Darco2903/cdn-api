import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    recordGet: {
        method: "GET",
        path: "/record/:storage_id",
        responses: {
            200: apiSuccess(z.null()),
        },
    },
    recordUpdate: {
        method: "POST",
        path: "/record/:storage_id",
        body: z.null(),
        responses: {
            200: apiSuccess(z.null()),
        },
    },
    recordDelete: {
        method: "DELETE",
        path: "/record/:storage_id",
        responses: {
            200: apiSuccess(z.null()),
        },
    },
});
