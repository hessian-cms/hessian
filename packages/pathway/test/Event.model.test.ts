import { ZodError } from "zod";
import { Event } from "../src";

const NON_MATCHING_EVENT = {
    id: 1
}

const MATCHING_EVENT: Event = {
    id: "event-1",
    time: Date.now(),
    message: "This is a test event",
    create: [],
    update: [],
    delete: []
}

describe("Test Event model", () => {
    test("Test matching event", async () => {
        expect(1);
        expect(Event.parseAsync(MATCHING_EVENT)).resolves.toEqual(MATCHING_EVENT);
    })

    test("Test non matching event", async () => {
        expect(1);
        expect(Event.parseAsync(NON_MATCHING_EVENT)).rejects.toBeInstanceOf(ZodError);
    })
})