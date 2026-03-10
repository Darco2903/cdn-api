import { describe, it, expect } from "vitest";
import {
    type CdnFeedbackTokenData,
    JWTSign,
    JWTVerify,
} from "../../src/index.js";
import { Hour } from "@darco2903/secondthought";
import { PRIVATE_KEY, PUBLIC_KEY } from "../keys.js";

//////////////////////////
// Tests for JWT Sign & Verify

describe("JWT Sign & Verify", () => {
    it("should resolve after the specified time", async () => {
        const data: CdnFeedbackTokenData = {
            user_public_id: "abcdefgh",
            endpoint: "/test",
            service: "auth",
            type: "avatar",
        };

        const res = await JWTSign(data, PRIVATE_KEY, new Hour(1));
        expect(res.isOk()).toBeTruthy();

        const signedToken = res._unsafeUnwrap();
        expect(signedToken).toBeTypeOf("string");

        const verifyRes = await JWTVerify(signedToken, PUBLIC_KEY);
        expect(verifyRes.isOk()).toBeTruthy();

        const decodedData = verifyRes._unsafeUnwrap();
        expect(decodedData).toMatchObject({
            ...data,
            iat: expect.any(Number),
            exp: expect.any(Number),
        });
    });
});
