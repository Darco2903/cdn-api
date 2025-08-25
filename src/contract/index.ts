import { initContract } from "@ts-rest/core";
import endpoint from "./endpoint.js";
import key from "./key.js";
import list from "./list.js";
import record from "./record.js";
import service from "./service.js";
import stats from "./stats.js";
import upload from "./upload.js";

const c = initContract();

export default c.router(
    {
        // ...endpoint,
        ...key,
        ...list,
        // ...record,
        service,
        // ...stats,
        // ...upload,
    },
    {
        pathPrefix: "/api/v2",
    }
);
