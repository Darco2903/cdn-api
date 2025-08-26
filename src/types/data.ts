import { z } from "zod";

export const bigintAsString = z.string().regex(/^\d+$/);
