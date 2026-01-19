import { NDJsonTrailStorage } from "../src/trailStorage";
import { deleteIfExists } from "./lib/deleteIfExists.function";
import { TEST_FOLDER } from "./lib/props";

const OBJ_1 = { a: 1, b: 1 };
const OBJ_2 = { a: 2, b: 2 };
const OBJ_3 = { a: 3, b: 3 };

const FILE_PATH = `${TEST_FOLDER}/ndjson-test.ndjson`;

describe("NDJson test cases", () => {
    beforeEach(() => {
        deleteIfExists(FILE_PATH);
    })

    afterEach(() => {
        deleteIfExists(FILE_PATH);
    })

    test("Create and append 3 objects", async () => {
        expect(3);
        const ndjson = new NDJsonTrailStorage<any>(FILE_PATH);
        await ndjson.append(OBJ_1);
        await ndjson.append(OBJ_2);
        await ndjson.append(OBJ_3);
        const objects = await ndjson.getObjects();
        expect(objects[0]?.a).toBe(OBJ_1.a);
        expect(objects[1]?.a).toBe(OBJ_2.a);
        expect(objects[2]?.a).toBe(OBJ_3.a);
    })

    test("Create and walk 3 objects", async () => {
        expect(1);
        const ndjson = new NDJsonTrailStorage<any>(FILE_PATH);
        await ndjson.append(OBJ_1);
        await ndjson.append(OBJ_2);
        await ndjson.append(OBJ_3);

        let i = 0;
        async function inc() {
            i++;
        }

        await ndjson.walk(inc);

        expect(i).toBe(3);
    })
})