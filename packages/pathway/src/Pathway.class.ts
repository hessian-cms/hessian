type Walker = (obj: Object) => boolean;

export default class Pathway {
    private trails: Object[] = [];
    constructor(private path: string) { }

    append(obj: Object) {
        this.trails.push(obj);
    }

    walk(callback: Walker) {
        for (const trail of this.trails) {
            callback(trail);
        }
    }

    getCurrentVersion() {
        return this.trails.length;
    }

    getTrails() {
        return this.trails;
    }
}