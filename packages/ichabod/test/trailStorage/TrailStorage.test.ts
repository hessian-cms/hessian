import { InMemoryTrailStorage } from "../../src";

const OBJ_1 = { a: 1, b: 1 };
const OBJ_2 = { a: 2, b: 2 };
const OBJ_3 = { a: 3, b: 3 };

describe("TrailStorage test cases", () => {
    test("In memory trail storage append and getObjects", async () => {
        expect(1);
        const trailStorage = new InMemoryTrailStorage<any>();
        await trailStorage.append(OBJ_1);
        await trailStorage.append(OBJ_2);
        await trailStorage.append(OBJ_3);
        const objects = await trailStorage.getObjects();
        expect(objects[0]?.a).toBe(OBJ_1.a);
        expect(objects[1]?.a).toBe(OBJ_2.a);
        expect(objects[2]?.a).toBe(OBJ_3.a);
    })

    test("In memory trail storage append and getObjects", async () => {
        expect(1);
        const trailStorage = new InMemoryTrailStorage<any>();
        await trailStorage.append(OBJ_1);
        await trailStorage.append(OBJ_2);
        await trailStorage.append(OBJ_3);

        let count = 0;

        await trailStorage.walk(async () => { count++ });
        expect(count).toBe(3);
    })
});