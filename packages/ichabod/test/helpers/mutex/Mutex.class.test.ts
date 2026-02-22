import { executeAfterTime, Mutex, Mutex2 } from "../../../src";

const expectedResults: number[] = [1, 2, 3];

[Mutex, Mutex2].forEach((MutexClass) => {
    const mutex = new MutexClass();
    const mutexedExectuteAfterTime = mutex.lock(executeAfterTime);

    describe(`${MutexClass.name} class`, () => {
        test("Testing", async () => {
            expect(1);
            const arr: number[] = [];
            const promises: Promise<void>[] = [];
            promises.push(mutexedExectuteAfterTime(500, () => { arr.push(1); }));
            promises.push(mutexedExectuteAfterTime(250, () => { arr.push(2); }));
            promises.push(mutexedExectuteAfterTime(125, () => { arr.push(3); }));
            await Promise.all(promises);
            expect(arr).toEqual(expectedResults);
        });
    });
});