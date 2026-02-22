import { Mutex2 } from "../helpers";
import { AsyncObjectCallback } from "./AsyncObjectCallback.type";

/**
 * Abstract class representing a storage mechanism for trail objects.
 */
export abstract class TrailStorage<T> {
    constructor(private mutex = new Mutex2()) {
        this.append = this.mutex.lock(this.append.bind(this));
        this.getObjects = this.mutex.lock(this.getObjects.bind(this));
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
     * Walks through all objects in the trail storage and applies the provided callback function to each object.
     * @param callback 
     * @returns 
     */
    public async walk(callback: AsyncObjectCallback<T>): Promise<void> {
        for (const obj of await this.getObjects()) {
            await callback(obj);
        }
        return;
    };
}