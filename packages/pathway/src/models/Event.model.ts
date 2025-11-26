import z from "zod";
import { WithId } from "./WithId.model";

export const Event = z.object({
    id: z.string(),
    time: z.number(),
    message: z.string(),
    create: z.record(z.string(), WithId).optional(),
    update: z.record(z.string(), WithId).optional(),
    delete: z.array(z.string()).optional()
})

export type Event = z.infer<typeof Event>;