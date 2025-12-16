import { z } from "zod";
import { userIdSchema } from "./user.js";
import {
    authAssetTypeSchema,
    authServiceSchema,
} from "@darco2903/auth-api/client";

export type JWTVerifyError = {
    name:
        | "TokenExpiredError"
        | "JsonWebTokenError"
        | "NotBeforeError"
        | "InvalidToken"
        | "InvalidTokenData";
    message: string;
};

export type JWTSignError = {
    name: "InvalidTokenData" | "JsonWebTokenError";
    message: string;
};

const JWTData = z.object({
    iat: z.number(),
    exp: z.number(),
});

export const jwtSchema = z.string().startsWith("Bearer ");

///////////////////////////////////

export const cdnAssetHeaderSchema = z.object({
    "x-cdn-asset": jwtSchema.optional(),
});

export const cdnAssetTokenDataSchema = z.object({
    service: authServiceSchema,
    type: z.literal("avatar"),
    endpoint: z.string(),
    user_public_id: userIdSchema,
    file_size_max: z.number().min(0).optional(),
    allowed_file_types: z.array(z.string()).optional(),
    callback_url: z.string().url().optional(),
});

export const cdnAssetTokenDataDecodedSchema = z.intersection(
    cdnAssetTokenDataSchema,
    JWTData
);

export type CdnAssetTokenData = z.infer<typeof cdnAssetTokenDataSchema>;
export type CdnAssetTokenDataDecoded = z.infer<
    typeof cdnAssetTokenDataDecodedSchema
>;

///////////////////////////////////

export const cdnFeedbackHeaderSchema = z.object({
    authorization: jwtSchema.optional(),
});

export const cdnFeedbackTokenDataSchema = z.object({
    service: authServiceSchema,
    type: authAssetTypeSchema,
    endpoint: z.string(),
    user_public_id: userIdSchema,
});

export const cdnFeedbackTokenDecodedSchema = z.intersection(
    cdnFeedbackTokenDataSchema,
    JWTData
);

export type CdnFeedbackTokenData = z.infer<typeof cdnFeedbackTokenDataSchema>;
export type CdnFeedbackTokenDataDecoded = z.infer<
    typeof cdnFeedbackTokenDecodedSchema
>;
