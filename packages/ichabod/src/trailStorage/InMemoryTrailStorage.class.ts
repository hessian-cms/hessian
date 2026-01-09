import { TrailStorage } from "./TrailStorage.abstract.class";

export class InMemoryTrailStorage<T> extends TrailStorage<T> {
    private storage = new Array<T>();

    async append(obj: T): Promise<void> {
        this.storage.push(obj);
        return;
    }

    async getObjects(): Promise<T[]> {
        return this.storage;
    }
}