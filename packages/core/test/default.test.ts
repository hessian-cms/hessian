import { Hessian } from "../src";

describe("Default tests", () => {
    test('1 + 1 = 2', () => {
        expect(1 + 1).toBe(2);
    })

    test('1 + 1 != 2', () => {
        expect(1 + 1).not.toBe(3);
    })

    test('Initialization responds initial value', () => {
        expect((new Hessian(1)).getId()).toBe(1);
    })

    test('Initialization responds initial value', () => {
        expect((new Hessian(1)).getId()).not.toBe(2);
    })
})