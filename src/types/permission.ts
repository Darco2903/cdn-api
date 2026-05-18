import z from "zod";

export const permissionObject = z.object({
    read: z.boolean(),
    write: z.boolean(),
    delete: z.boolean(),
});

export type PermissionObject = z.infer<typeof permissionObject>;
