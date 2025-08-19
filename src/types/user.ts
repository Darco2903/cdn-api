import { z } from "zod";
import { PUBLIC_ID_LENGTH } from "../consts.js";

export const userIdSchema = z.string().length(PUBLIC_ID_LENGTH);
