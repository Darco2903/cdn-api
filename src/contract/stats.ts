import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    stats: {
        method: "GET",
        path: "/stats",
        responses: {
            200: apiSuccess(z.null()),
        },
    },
});
