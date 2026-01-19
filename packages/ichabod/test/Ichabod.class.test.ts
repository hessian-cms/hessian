import Ichabod, { Event, InMemoryTrailStorage, NDJsonTrailStorage } from "../src";
import { deleteIfExists } from "./lib/deleteIfExists.function";
import { TEST_FOLDER } from "./lib/props";

const MATCHING_EVENT_1: Event = {
    id: "event-1",
    time: Date.now(),
    message: "This is a test event",
    create: [
        { id: "itemA" },
        { id: "itemB" }
    ]
}

const MATCHING_EVENT_2: Event = {
    id: "event-2",
    time: Date.now(),
    message: "This is a test event",
    create: [
        { id: "itemC" },
        {
            id: "itemD",
            msg: "To be removed"
        }
    ],
    update: [
        {
            id: "itemA",
            msg: "Hello World!!!"
        }
    ]
}

const MATCHING_EVENT_3: Event = {
    id: "event-3",
    time: Date.now(),
    message: "This is a test event",
    update: [
        {
            id: "itemD",
            msg: null
        }
    ],
    delete: ["itemB"]
}

const FILE_PATH = `${TEST_FOLDER}/test_ichabod.ndjson`;

describe("Ichabod class tests", () => {
    beforeAll(() => {
        deleteIfExists(FILE_PATH);
    })

    afterAll(() => {
        deleteIfExists(FILE_PATH);
    });

    test(`Ichabod state build with NDJsonTrailStorage`, async () => {
        expect(1);
        const storage = new NDJsonTrailStorage<Event>(FILE_PATH);
        await storage.append(MATCHING_EVENT_1);
        await storage.append(MATCHING_EVENT_2);
        await storage.append(MATCHING_EVENT_3);
        const ichabod = await Ichabod.getInstance(storage);
        const state = await ichabod.getState();
        expect(state.get('itemA')?.msg).toEqual("Hello World!!!");
    })

    test(`Ichabod state build with InMemoryTrailStorage`, async () => {
        expect(1);
        const storage = new InMemoryTrailStorage<Event>();
        await storage.append(MATCHING_EVENT_1);
        await storage.append(MATCHING_EVENT_2);
        await storage.append(MATCHING_EVENT_3);
        const ichabod = await Ichabod.getInstance(storage);
        const state = await ichabod.getState();
        expect(state.get('itemA')?.msg).toEqual("Hello World!!!");
    })
})