import { AsyncObjectCallback } from "../dist";
import { Mutex } from "../src/helpers/Mutex.class";

const executeAfterTime = (time: number, func: () => void) => {
    return new Promise<void>(resolve => setTimeout(() => {
        func();
        resolve();
    }, time));
}

const mutex = new Mutex();

const mutexedExectuteAfterTime = mutex.lock(executeAfterTime);

describe("Mutex class", () => {
    test("Testing", async () => {
        expect(1);

        const arr: number[] = [];

        mutexedExectuteAfterTime(500, () => { arr.push(1); });
        mutexedExectuteAfterTime(250, () => { arr.push(2); });
        await mutexedExectuteAfterTime(125, () => { arr.push(3); });

        expect(arr).toEqual([1, 2, 3]);
    })
})