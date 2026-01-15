import { Mutex } from "../src/Mutex.class";

const wait = (time: number) => {
    return new Promise<void>(resolve => setTimeout(() => {
        resolve();
    }, time));
}

const mutex = new Mutex();

const mutexedWait = mutex.lock(wait);

describe("Mutex class", () => {
    test("Testing", async () => {
        expect(1);

        await mutexedWait(1000);
        await mutexedWait(2000);
        await mutexedWait(1000);

        expect(1 + 1).toBe(2);
    })
})