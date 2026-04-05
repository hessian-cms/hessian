import { describe, expect, test } from "vitest";
import { executeAfterTime } from "../../src";

describe(`executeAfterTime function`, () => {
    test("Execute after 500ms", async () => {
        const start = Date.now();
        let result = 0;
        await executeAfterTime(500, () => { result = Date.now() - start; });
        await expect(result).toBeGreaterThanOrEqual(500);
    });
});