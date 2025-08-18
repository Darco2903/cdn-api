import fs from "fs";
import { generateOpenApi } from "@ts-rest/open-api";
import { contract } from "../src/";

import { version } from "../package.json";

console.log("Generating OpenAPI documentation...");
console.log(`API version: ${version}`);

const openApiDocument = generateOpenApi(contract, {
    info: {
        title: "CDN API",
        version,
    },
    servers: [
        {
            url: "https://cdn.darco2903.fr",
        },
        {
            url: "https://dev-cdn.darco2903.fr",
        },
    ],
});

fs.writeFileSync("openapi.json", JSON.stringify(openApiDocument, null, 2));
