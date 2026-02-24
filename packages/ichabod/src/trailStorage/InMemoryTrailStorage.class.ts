import { IchabodError } from "../errors";
import { InMemoryTrailStorageMeta } from "./meta";
import { TrailStorage } from "./TrailStorage.abstract.class";

/**
 * InMemoryTrailStorage is a simple implementation of TrailStorage that stores objects in memory.
 */
export class InMemoryTrailStorage<T> extends TrailStorage<T> {
    constructor(private storage: T[] = []) {
        super();
    }

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
        return JSON.parse(JSON.stringify(this.storage));
    }

    /**
     * Retrieves metadata about the in-memory trail storage.
     * @returns 
     */
    async getMeta(): Promise<InMemoryTrailStorageMeta> {
        return {
            createdAt: new Date()
        }
    }

    /**
     * Not implemented for in-memory storage, as it does not support snapshotting. Throws an error if called.
     */
    async createSnapshot(): Promise<string> {
        throw new IchabodError("Snapshot creation is not supported for InMemoryTrailStorage.");
    }
}