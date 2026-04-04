import { Mutex2 } from "./helpers";
import { Event, WithId } from "./models";
import { InMemoryTrailStorage, TrailStorage } from "./trailStorage";

export default class Ichabod<T extends Event> {
    private mutex = new Mutex2();

    private state: Map<string, WithId> = new Map<string, WithId>();

    private constructor(private trailStorage: TrailStorage<T>) {
        this.findOne = this.mutex.lock(this.findOne.bind(this));
        this.find = this.mutex.lock(this.find.bind(this));
        this.deleteOne = this.mutex.lock(this.deleteOne.bind(this));
        this.delete = this.mutex.lock(this.delete.bind(this));
        this.updateOne = this.mutex.lock(this.updateOne.bind(this));
        this.update = this.mutex.lock(this.update.bind(this));
        this.insert = this.mutex.lock(this.insert.bind(this));
    }

    public static async getInstance<T extends Event>(trailStorage: TrailStorage<T> = new InMemoryTrailStorage()): Promise<Ichabod<T>> {
        const ichabod = new Ichabod(trailStorage);
        await ichabod.build();
        return ichabod;
    }

    private async build(): Promise<void> {
        await this.trailStorage.walk(async (evnt: Event) => {
            if (evnt.create) {
                evnt.create.forEach((item: any) => {
                    if (!this.state.has(item.id)) {
                        this.state.set(item.id, { ...item });
                    }
                });
            }
            if (evnt.update) {
                evnt.update?.forEach((item: any) => {
                    if (this.state.has(item.id)) {
                        this.state.set(item.id, { ...item })
                    }
                });
            }
            if (evnt.delete) {
                evnt.delete?.forEach((id: string) => {
                    this.state.delete(id);
                })
            };
        });
    }

    public async findOne() {}

    public async find() {}

    public async deleteOne() {}

    public async delete() {}

    public async updateOne() {}

    public async update() {}

    public async insert() {}

    public async getState() {
        return this.state;
    }
}