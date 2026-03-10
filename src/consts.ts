import type { Algorithm } from "jsonwebtoken";

export const API_VERSION = "v2";
export const API_PATH_PREFIX = `/api/${API_VERSION}`;

export const JWT_ALGORITHM: Algorithm = "ES256";

export const STORAGE_PUBLIC_ID_LENGTH = 8;
