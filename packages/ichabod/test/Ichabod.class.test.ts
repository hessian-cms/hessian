import Ichabod, { Event, InMemoryTrailStorage } from "../src";
import { STORAGE_DATA } from "./data/storage.data";

describe("Ichabod class tests", () => {
    test(`Ichabod state build with InMemoryTrailStorage`, async () => {
        expect(3);
        const storage = new InMemoryTrailStorage<Event>();
        await storage.append(STORAGE_DATA[0] as Event);
        await storage.append(STORAGE_DATA[1] as Event);
        await storage.append(STORAGE_DATA[2] as Event);
        const ichabod = await Ichabod.getInstance(storage);
        const state = await ichabod.getState();
        expect(state.get('itemA')?.msg).toEqual("Hello World!!!");
        expect(state.get('itemB')).toBeUndefined();
        expect(state.get('itemC')).toBeUndefined();
    })
});