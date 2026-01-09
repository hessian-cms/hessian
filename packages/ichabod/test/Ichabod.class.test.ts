import { NDJson } from "../src";
import Ichabod, { Event } from "../src";

const FILE = "ndjson-test.ndjson";

const MATCHING_EVENT_1: Event = {
    id: "event-1",
    time: Date.now(),
    message: "This is a test event",
    create: {
        itemA: { id: "itemA" },
        itemB: { id: "itemB" }
    },
    update: {},
    delete: []
}

const MATCHING_EVENT_2: Event = {
    id: "event-2",
    time: Date.now(),
    message: "This is a test event",
    create: {
        itemC: { id: "itemC" },
        itemD: { 
            id: "itemD",
            msg: "To be removed"
         }
    },
    update: {
        itemA: { 
            id: "itemA",
            msg: "Hello World!!!"
        }
    },
    delete: []
}

const MATCHING_EVENT_3: Event = {
    id: "event-3",
    time: Date.now(),
    message: "This is a test event",
    create: {},
    update: {
        itemD: { 
            id: "itemD",
            msg: null
        }
    },
    delete: ["itemB"]
}

describe("Ichabod class tests", () => {
    test("Ichabod state build", async () => {
        expect(1);
        const ndjson = new NDJson<Event>(FILE);
        await ndjson.append(MATCHING_EVENT_1);
        await ndjson.append(MATCHING_EVENT_2);
        await ndjson.append(MATCHING_EVENT_3);
        const ichabod = await Ichabod.getInstance(FILE);
        const state = await ichabod.getState();
        expect(state.get('itemA')?.msg).toBe("Hello World!!!");
    })
})