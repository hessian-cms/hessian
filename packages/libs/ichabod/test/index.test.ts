import { describe, expect, test } from "vitest";

async function add(a: number, b: number) {
    return a + b;
}

/**
 * Initial test file for ichabod package
 */
describe("Index tests", () => {
    test("1+1=2", async () => {
        await expect(add(1,1)).resolves.toEqual(2);
    })
})