import { appendFile, FileHandle, mkdir, open } from "node:fs/promises";

export type AsyncObjectCallback<T> = (obj: T) => Promise<void>;

const FILE_ENCODING = "utf-8";
const NEWLINE = "\n";

export class NDJson<T> {
    public constructor(private filePath: string) { }

    private async readFile() {
        const fh = await open(this.filePath, "a+");
        const fileContent = await fh.readFile(FILE_ENCODING);
        await fh.close();
        return fileContent;
    }

    public async appendJson(obj: T) {
        return await appendFile(this.filePath, JSON.stringify(obj) + NEWLINE, { encoding: FILE_ENCODING });
    }

    public async getObjects(): Promise<T[]> {
        const fileContent = await this.readFile();
        const lines = fileContent.split(NEWLINE).filter(line => line.trim().length > 0);
        return lines.map(line => JSON.parse(line));
    }

    public async walkJsons(callback: AsyncObjectCallback<T>) {
        for (const obj of await this.getObjects()) {
            await callback(obj);
        }
    }
}