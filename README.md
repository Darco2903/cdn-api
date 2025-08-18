# CDN API

## Description

This API is a TypeScript client for the Darco2903 CDN service.

## Installation

```bash
npm install cdn-api-<version>.tgz
npm install @ts-rest/core zod@3.22.3
```

## Usage

Create an instance of the API

```ts
import { initClient } from "@ts-rest/core";
import { contract } from "cdn-api";

const api = initClient(contract, {
    baseUrl: "https://api.example.com",
});
```
