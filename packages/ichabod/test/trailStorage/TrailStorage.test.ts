import { InMemoryTrailStorage } from "../../src";

interface TestObject {
    a: number;
    b: number;
};

const OBJ_1 = { a: 1, b: 1 };
const OBJ_2 = { a: 2, b: 2 };
const OBJ_3 = { a: 3, b: 3 };

[InMemoryTrailStorage].forEach((StorageClass) => {
    describe(`TrailStorage (${StorageClass.name}) tests`, () => {
        test("Appended objects are retrievable", async () => {
            expect(1);
            const storage = new StorageClass<TestObject>();
            await storage.append(OBJ_1);
            await storage.append(OBJ_2);
            await storage.append(OBJ_3);
            expect(storage.getObjects()).resolves.toEqual([OBJ_1, OBJ_2, OBJ_3]);
        })

        test("Walking objects with callback", async () => {
            expect(1);
            const storage = new StorageClass<TestObject>();
            await storage.append(OBJ_1);
            await storage.append(OBJ_2);
            await storage.append(OBJ_3);
            let count = 0;
            await storage.walk(async (item) => {
                count += item.a + item.b
            })
            expect(count).toBe(12);
        })

        test("Concurrent access executed in right order", async () => {
            expect(1);
            const storage = new StorageClass<TestObject>();

            const promises: Promise<void>[] = [];

            promises.push(storage.append(OBJ_1));
            promises.push(storage.append(OBJ_2));
            promises.push(storage.append(OBJ_3));

            await Promise.all(promises);

            const result = await storage.getObjects();

            expect(result).toEqual([OBJ_1, OBJ_2, OBJ_3]);
        })
    });
})