export * from "./common.js";
import { type JwtPayload, verify } from "jsonwebtoken";

export async function JWTVerify(
    token: string,
    pubKey: string
): Promise<JwtPayload | string | undefined> {
    if (typeof window !== "undefined") {
        throw new Error(
            "JWTverify should not be called in the browser context"
        );
    }

    return new Promise(async (resolve) => {
        verify(token, pubKey, (err, decoded) => {
            resolve(err ? undefined : decoded);
        });
    });
}
