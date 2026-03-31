import { describe, expect, test } from "vitest";
import { executeAfterTime, Mutex, Mutex2 } from "../../../src";

const expectedResults: number[] = [1, 2, 3];

[Mutex, Mutex2].forEach((MutexClass) => {
    const mutex = new MutexClass();
    const mutexedExectuteAfterTime = mutex.lock(executeAfterTime);

    describe(`${MutexClass.name} class`, () => {
        test("Testing", async () => {
            const arr: number[] = [];
            const promises: Promise<void>[] = [];
            promises.push(mutexedExectuteAfterTime(500, () => { arr.push(1); }));
            promises.push(mutexedExectuteAfterTime(250, () => { arr.push(2); }));
            promises.push(mutexedExectuteAfterTime(125, () => { arr.push(3); }));
            
            await expect(Promise.all(promises)).resolves.toEqual([undefined, undefined, undefined]);
            expect(arr).toEqual(expectedResults);
        });
    });
});