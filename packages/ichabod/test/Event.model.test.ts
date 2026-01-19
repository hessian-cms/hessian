import { ZodError } from "zod";
import { Event } from "../src";

const NON_MATCHING_EVENT = {
    id: 1
}

const MATCHING_EVENT_1: Event = {
    id: "event-1",
    time: Date.now(),
    message: "This is a test event",
    create: [
        { id: "itemA" },
        { id: "itemB" }
    ],
    update: [],
    delete: []
}

const MATCHING_EVENT_2: Event = {
    id: "event-2",
    time: Date.now(),
    message: "This is a test event",
    create: [
        { id: "itemC" },
    ],
    update: [
        {
            id: "itemA",
            msg: "Hello World!!!"
        }
    ],
    delete: []
}

const MATCHING_EVENT_3: Event = {
    id: "event-3",
    time: Date.now(),
    message: "This is a test event",
    create: [],
    update: [],
    delete: ["itemB"]
}

describe("Test Event model", () => {
    test("Test matching event", async () => {
        expect(3);
        expect(Event.parseAsync(MATCHING_EVENT_1)).resolves.toEqual(MATCHING_EVENT_1);
        expect(Event.parseAsync(MATCHING_EVENT_2)).resolves.toEqual(MATCHING_EVENT_2);
        expect(Event.parseAsync(MATCHING_EVENT_3)).resolves.toEqual(MATCHING_EVENT_3);
    })

    test("Test non matching event", async () => {
        expect(1);
        expect(Event.parseAsync(NON_MATCHING_EVENT)).rejects.toBeInstanceOf(ZodError);
    })
})