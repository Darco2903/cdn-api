import { z } from "zod";

export const statsGlobalSchema = z.object({
    record_count: z.number().int().gte(0),
    total_size: z.number().int().gte(0),
    max_size: z.number().int().gte(0),
});

export type StatsGlobal = z.infer<typeof statsGlobalSchema>;
