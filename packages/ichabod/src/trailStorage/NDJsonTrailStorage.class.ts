import { appendFile, open } from "node:fs/promises";
import { AsyncObjectCallback } from "./AsyncObjectCallback.type";
import { TrailStorage } from "./TrailStorage.abstract.class";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";

const FILE_ENCODING = "utf-8";
const NEWLINE = "\n";


async function ensureDirectoryExistence(filePath: string) {
    const storePath = path.dirname(filePath);

    if (!existsSync(storePath)) {
        mkdirSync(storePath, { recursive: true });
    }
}

export class NDJsonTrailStorage<T> extends TrailStorage<T> {
    public constructor(private filePath: string) {
        super();
    }

    private async readFile() {
        await ensureDirectoryExistence(this.filePath);
        const fh = await open(this.filePath, "a+");
        const fileContent = await fh.readFile(FILE_ENCODING);
        await fh.close();
        return fileContent;
    }

    public async append(obj: T) {
        await ensureDirectoryExistence(this.filePath);
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