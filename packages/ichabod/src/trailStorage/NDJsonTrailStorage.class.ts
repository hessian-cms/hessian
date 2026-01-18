import { appendFile, open } from "node:fs/promises";
import { AsyncObjectCallback } from "./AsyncObjectCallback.type";
import { TrailStorage } from "./TrailStorage.abstract.class";

const FILE_ENCODING = "utf-8";
const NEWLINE = "\n";

export class NDJsonTrailStorage<T> extends TrailStorage<T> {
    public constructor(private filePath: string) {
        super();
    }

    private async readFile() {
        const fh = await open(this.filePath, "a+");
        const fileContent = await fh.readFile(FILE_ENCODING);
        await fh.close();
        return fileContent;
    }

    public async append(obj: T) {
        return await appendFile(this.filePath, JSON.stringify(obj) + NEWLINE, { encoding: FILE_ENCODING });
    }

    public async getObjects() {
        const fileContent = await this.readFile();
        const lines = fileContent.split(NEWLINE).filter(line => line.trim().length > 0);
        return lines.map(line => JSON.parse(line));
    }

    public async walk(callback: AsyncObjectCallback<T>) {
        for (const obj of await this.getObjects()) {
            await callback(obj);
        }
    }
}