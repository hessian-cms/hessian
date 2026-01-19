import { TEST_FOLDER } from "./props";
import { existsSync, rmSync } from "fs";

export function deleteIfExists(path: string = TEST_FOLDER) {
    if (existsSync(path)) {
        rmSync(path, { recursive: true, force: true });
    }
}