import { NDJson } from "../src";
import { Event, WithId } from "./models";

type Walker = (obj: Object) => boolean;

export default class Ichabod {
    private constructor(private path: string, private state: Map<string, WithId>, ndjson: NDJson<Event>) {
    }

    public static async getInstance(path: string): Promise<Ichabod> {
        const ndjson = new NDJson<Event>(path);
        const state = await Ichabod.build(path, ndjson);
        return new Ichabod(path, state, ndjson);
    }

    private static async build(path: string, ndjson: NDJson<Event>): Promise<Map<string, WithId>> {
        const state = new Map<string, WithId>();

        await ndjson.walkJsons(async (evnt: Event) => {
            if (evnt.create) {
                Object.entries(evnt.create).forEach(create => {
                    state.set(create[0], create[1]);
                });
            }
            if (evnt.update) {
                Object.entries(evnt.update).forEach(update => {
                    const current = state.get(update[0]);
                    if (current) {
                        state.set(update[0], {
                            ...current,
                            ...update[1]
                        })
                    }
                });
            }
            if (evnt.delete) {
                evnt.delete.forEach(id => {
                    state.delete(id);
                })
            };
        })
        return state;
    }

    public async getState(): Promise<any> {
        return Object.fromEntries(this.state);
    }
}