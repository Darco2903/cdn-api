import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema } from "../types/creds.js";
import { userIdSchema } from "../types/user.js";

const c = initContract();

export default c.router({
    profilePictureGet: {
        method: "GET",
        path: "/profile/:userId/picture",
        pathParams: z.object({
            userId: userIdSchema,
        }),
        responses: {
            200: apiSuccess(z.string().url().nullable()),
            400: ZodErrorSchema,
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Profile picture not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    profilePictureUpdate: {
        method: "POST",
        path: "/profile/picture",
        headers: authHeaderSchema,
        contentType: "multipart/form-data",
        body: z.object({}),
        responses: {
            200: apiSuccess(z.null()),
            400: apiError(z.literal("BAD_REQUEST"), z.literal("Missing file")),
            401: apiError(
                z.literal("UNAUTHORIZED"),
                z.literal("Unauthorized access")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    profilePictureDelete: {
        method: "DELETE",
        path: "/profile/picture",
        headers: authHeaderSchema,
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(
                z.literal("UNAUTHORIZED"),
                z.literal("Unauthorized access")
            ),
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Profile picture not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
