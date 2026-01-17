/**
 * A simple mutex implementation for synchronizing asynchronous operations.
 */
export class Mutex {
    constructor(private promise: Promise<void> = Promise.resolve()) { }

    /**
     * Acquires a lock on the mutex, executes the provided asynchronous function, and releases the lock once the function completes.
     * @param fn 
     * @returns 
     */
    lock<T extends (...params: Parameters<T>) => Promise<Awaited<ReturnType<T>>>>(fn: T): T {
        return (async (...params: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
            const localPromise = this.promise;
            const { promise, resolve } = Promise.withResolvers<void>();
            this.promise = promise;
            await localPromise;
            const result = await fn(...params);
            resolve();
            return result;
        }) as T;
    }
}