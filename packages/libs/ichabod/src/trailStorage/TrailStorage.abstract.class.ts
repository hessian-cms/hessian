import { Mutex2 } from "../helpers";
import { AsyncObjectCallback } from "./AsyncObjectCallback.type";
import { TrailStorageMeta } from "./meta";

/**
 * Abstract class representing a storage mechanism for trail objects.
 */
export abstract class TrailStorage<T> {
    // Mutex to ensure thread safety when accessing the trail storage.
    private mutex = new Mutex2();

    constructor() {
        // Lock the methods to ensure thread safety when accessing the trail storage.
        this.append = this.mutex.lock(this.append.bind(this));
        // Lock the createSnapshot method to ensure thread safety when creating snapshots of the trail storage.
        this.createSnapshot = this.mutex.lock(this.createSnapshot.bind(this));
        // Lock the walk method to ensure thread safety when walking through the objects in the trail storage.
        this.walk = this.mutex.lock(this.walk.bind(this));
    }

    /**
     * Appends an object to the trail storage.
     * @param obj 
     */
    abstract append(obj: T): Promise<void>;

    /**
     * Retrieves all objects from the trail storage.
     */
    abstract getObjects(): Promise<T[]>;

    /**
     * Creates a snapshot of the current state of the trail storage. The implementation of this method will depend on the specific storage mechanism being used (e.g., in-memory, file-based, database, etc.). The snapshot can be used to restore the state of the trail storage at a later point in time.
     */
    abstract createSnapshot(): Promise<string>;

    /**
     * Retrieves metadata about the trail storage, such as the number of objects stored, the size of the storage, and any other relevant information. The specific metadata returned will depend on the implementation of the trail storage.
     */
    abstract getMeta(): Promise<TrailStorageMeta>;

    /**
     * Walks through all objects in the trail storage and applies the provided callback function to each object.
     * @param callback 
     * @returns 
     */
    public async walk(callback: AsyncObjectCallback<T>): Promise<void> {
        for (const obj of await this.getObjects()) {
            await callback(obj);
        }
    };
}