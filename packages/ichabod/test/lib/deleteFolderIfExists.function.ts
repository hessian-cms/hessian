import { TEST_FOLDER } from "./props";
import { existsSync, rmSync } from "fs";

export function deleteTestingFolder(path: string = TEST_FOLDER) {
    if (existsSync(path)) {
        rmSync(path, { recursive: true, force: true });
    }
}