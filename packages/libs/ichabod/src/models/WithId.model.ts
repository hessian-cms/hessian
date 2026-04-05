import z from "zod";

export const WithId = z.looseObject({
    id: z.string()
})

export type WithId = z.infer<typeof WithId>;