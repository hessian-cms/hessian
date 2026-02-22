import { Event, WithId } from "./models";
import { TrailStorage } from "./trailStorage";

export default class Ichabod {
    private state: Map<string, WithId> = new Map<string, WithId>();

    private constructor(private trailStorage: TrailStorage<Event>) {
    }

    public static async getInstance(trailStorage: TrailStorage<Event>): Promise<Ichabod> {
        const ichabod = new Ichabod(trailStorage);
        await ichabod.build();
        return ichabod;
    }

    private async build(): Promise<void> {
        await this.trailStorage.walk(async (evnt: Event) => {
            if (evnt.create) {
                evnt.create.forEach(item => {
                    if (!this.state.has(item.id)) {
                        this.state.set(item.id, { ...item });
                    }
                });
            }
            if (evnt.update) {
                evnt.update?.forEach(item => {
                    if (this.state.has(item.id)) {
                        this.state.set(item.id, { ...item })
                    }
                });
            }
            if (evnt.delete) {
                evnt.delete?.forEach(id => {
                    this.state.delete(id);
                })
            };
        });
    }

    public async getState() {
        return this.state;
    }
}