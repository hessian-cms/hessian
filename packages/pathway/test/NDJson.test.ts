import { existsSync, rm, rmSync } from "node:fs";
import { NDJson } from "../src";

const OBJ_1 = { a: 1, b: 1 };
const OBJ_2 = { a: 2, b: 2 };
const OBJ_3 = { a: 3, b: 3 };

const FILE = "dump/ndjson-test.ndjson";

describe("NDJson test cases", () => {
    beforeEach(async () => {
        if (existsSync(FILE)) {
            rmSync(FILE);
        }
    });

    afterEach(async () => {
        if (existsSync(FILE)) {
            rmSync(FILE);
        }
    })

    test("Create and append 3 objects", async () => {
        expect(3);
        const ndjson = new NDJson<any>(FILE);
        await ndjson.appendJson(OBJ_1);
        await ndjson.appendJson(OBJ_2);
        await ndjson.appendJson(OBJ_3);
        const objects = await ndjson.getObjects();
        expect(objects[0]?.a).toBe(OBJ_1.a);
        expect(objects[1]?.a).toBe(OBJ_2.a);
        expect(objects[2]?.a).toBe(OBJ_3.a);
    })

    test("Create and walk 3 objects", async () => {
        expect(1);
        const ndjson = new NDJson(FILE);
        await ndjson.appendJson(OBJ_1);
        await ndjson.appendJson(OBJ_2);
        await ndjson.appendJson(OBJ_3);

        let i = 0;
        async function inc() {
            i++;
        }

        await ndjson.walkJsons(inc);

        expect(i).toBe(3);
    })
})