import z from "zod";

export const Event = z.object({
    id: z.string(),
    time: z.number(),
    message: z.string(),
    create: z.array(z.object()).optional(),
    update: z.array(z.object({
        id: z.string(),
        update: z.object()
    })).optional(),
    delete: z.array(z.string()).optional()
})

export type Event = z.infer<typeof Event>;