import z from "zod";
import { WithId } from "./WithId.model";

export const CreateOrUpdateEntrys = z.record(z.string(), WithId).optional()

export type CreateOrUpdateEntrys = z.infer<typeof CreateOrUpdateEntrys>;