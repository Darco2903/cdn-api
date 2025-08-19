import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    upload: {
        method: "GET",
        path: "/upload",
        responses: {
            200: apiSuccess(z.null()),
        },
    },
    uploadInit: {
        method: "GET",
        path: "/upload/init",
        responses: {
            200: apiSuccess(z.null()),
        },
    },
    uploadPart: {
        method: "GET",
        path: "/upload/:storage_id/:part",
        responses: {
            200: apiSuccess(z.null()),
        },
    },
    uploadEnd: {
        method: "GET",
        path: "/upload/end/:storage_id",
        responses: {
            200: apiSuccess(z.null()),
        },
    },
});
