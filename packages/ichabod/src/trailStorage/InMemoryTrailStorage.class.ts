import { TrailStorage } from "./TrailStorage.abstract.class";

/**
 * InMemoryTrailStorage is a simple implementation of TrailStorage that stores objects in memory.
 */
export class InMemoryTrailStorage<T> extends TrailStorage<T> {
    // The storage array that holds the objects in memory.
    private storage = new Array<T>();

    /**
     * Appends an object to the in-memory storage.
     * @param obj 
     * @returns 
     */
    async append(obj: T): Promise<void> {
        this.storage.push(obj);
        return;
    }

    /**
     * Retrieves all objects from the in-memory storage.
     * @returns 
     */
    async getObjects(): Promise<T[]> {
        return this.storage;
    }
}