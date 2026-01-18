import { InMemoryTrailStorage, NDJsonTrailStorage, TrailStorage } from "../../src";
import { existsSync, rmSync } from "fs";
import { TEST_FOLDER } from "../lib/props";
import { deleteTestingFolder } from "../lib/deleteFolderIfExists.function";

const OBJ_1 = { a: 1, b: 1 };
const OBJ_2 = { a: 2, b: 2 };
const OBJ_3 = { a: 3, b: 3 };

const FILE_PATH = `${TEST_FOLDER}/test_trail_storage.ndjson`;

describe("TrailStorage test cases", () => {
    beforeAll(() => {
        deleteTestingFolder();
    })

    afterAll(() => {
        deleteTestingFolder();
    })

    const storages: { name: string, storage: TrailStorage<any> }[] = [
        { name: "InMemoryTrailStorage", storage: new InMemoryTrailStorage<any>() },
        { name: "NDJsonTrailStorage", storage: new NDJsonTrailStorage<any>(FILE_PATH) }
    ];

    storages.forEach(({ name, storage }) => {
        test(`${name} append and getObjects`, async () => {
            expect(3);
            await storage.append(OBJ_1);
            await storage.append(OBJ_2);
            await storage.append(OBJ_3);
            const objects = await storage.getObjects();
            expect(objects[0]?.a).toBe(OBJ_1.a);
            expect(objects[1]?.a).toBe(OBJ_2.a);
            expect(objects[2]?.a).toBe(OBJ_3.a);
        })

        test(`${name} walk`, async () => {
            expect(1);
            let count = 0;
            await storage.walk(async (obj) => {
                count++;
            });
            expect(count).toBe(3);
        });
    });
});