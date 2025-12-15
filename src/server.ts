export * from "./common.js";
import jwt from "jsonwebtoken";
import { type Result, err, ok } from "neverthrow";
import {
    cdnAssetTokenDataDecodedSchema,
    type JWTVerifyError,
    type CdnFeedbackTokenData,
    type CdnAssetTokenDataDecoded,
    type JWTSignError,
} from "./common.js";

export async function JWTVerify(
    token: string,
    pubKey: string
): Promise<Result<CdnAssetTokenDataDecoded, JWTVerifyError>> {
    return new Promise((resolve) => {
        jwt.verify(token, pubKey, { algorithms: ["RS256"] }, (e, decoded) => {
            if (e) {
                resolve(
                    err({
                        name: e.name as JWTVerifyError["name"],
                        message: e.message,
                    } satisfies JWTVerifyError)
                );
            } else if (decoded === undefined) {
                resolve(
                    err({
                        name: "InvalidToken",
                        message: "Token is undefined",
                    } satisfies JWTVerifyError)
                );
            } else {
                const res = cdnAssetTokenDataDecodedSchema.safeParse(decoded);
                if (res.success) {
                    resolve(ok(res.data));
                } else {
                    resolve(
                        err({
                            name: "InvalidTokenData",
                            message: "Invalid token data",
                        } satisfies JWTVerifyError)
                    );
                }
            }
        });
    });
}

export async function JWTSign(
    payload: CdnFeedbackTokenData,
    privKey: string,
    expiresIn: number
): Promise<Result<string, JWTSignError>> {
    return new Promise((resolve) => {
        jwt.sign(
            payload,
            privKey,
            {
                algorithm: "RS256",
                expiresIn: expiresIn,
            },
            (e, token) => {
                if (e || token === undefined) {
                    resolve(
                        err({
                            name: "JsonWebTokenError",
                            message: e?.message ?? "Failed to sign token",
                        })
                    );
                } else {
                    resolve(ok(token));
                }
            }
        );
    });
}
