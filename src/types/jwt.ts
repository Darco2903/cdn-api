import { z } from "zod";
import { userIdSchema } from "./user.js";
import { endpointPathSchema } from "./endpoint.js";

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
    service: z.literal("auth"),
    endpoint: z.string(),
    user_public_id: userIdSchema,
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
    endpoint: z.string(),
});

export const cdnFeedbackTokenDecodedSchema = z.intersection(
    cdnFeedbackTokenDataSchema,
    JWTData
);

export type CdnFeedbackTokenData = z.infer<typeof cdnFeedbackTokenDataSchema>;
export type CdnFeedbackTokenDataDecoded = z.infer<
    typeof cdnFeedbackTokenDecodedSchema
>;
