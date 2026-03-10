# CDN API

## Description

This package provides an API for interacting with Darco2903's CDN service, including functionalities for uploading, managing, and retrieving media assets. It includes both client and server utilities to facilitate the integration of CDN functionalities across multiple applications.

## Installation

```bash
npm install @darco2903/cdn-api
```

## Usage

### Creating a client

```ts
import { createClient } from "@darco2903/cdn-api/client";

const SERVER_ORIGIN = "https://cdn.example.com";
const cdnApi = createClient(SERVER_ORIGIN);
```

### Signing a JWT token

```ts
import { CdnAssetTokenData, JWTSign } from "@darco2903/cdn-api/server";
import { Hour } from "@darco2903/secondthought";

const JWT_PRIVATE_KEY = "..."; // Private key here
const tokenData: CdnAssetTokenData = {
    user_public_id: "user_public_id",
    endpoint: "/test",
    service: "auth",
    type: "avatar",
};
const expiresIn = new Hour(1); // Token expires in 1 hour. Also accepts a number of seconds (e.g., 3600).

await JWTSign(tokenData, JWT_PRIVATE_KEY, expiresIn).match(
    (signedToken) => {
        console.log("JWT signing successful:", signedToken);
    },
    (err) => {
        console.error(`JWT signing failed: ${err.message}`);
    }
);
```

### Verifying a JWT token

```ts
import { JWTVerify } from "@darco2903/cdn-api/server";

const JWT_PUBLIC_KEY = "..."; // Public key here
const accessToken = "..."; // JWT token here

await JWTVerify(accessToken, JWT_PUBLIC_KEY).match(
    (decodedToken) => {
        console.log("JWT verification successful:", decodedToken);
    },
    (err) => {
        console.error(`JWT verification failed: ${err.message}`);
    }
);
```
