import { AsyncObjectCallback } from "./AsyncObjectCallback.type";

export abstract class TrailStorage<T> {
    abstract append(obj: T): Promise<void>;
    abstract getObjects(): Promise<T[]>;
    
    public async walk(callback: AsyncObjectCallback<T>):Promise<void> {
        for (const obj of await this.getObjects()) {
            await callback(obj);
        }
        return;
    };
}