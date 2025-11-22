import Pathway from "../src"

const TEST_PATH = "/test/path";

describe("Pathway class tests", () => {
    test("Create", () => {
        const pathway = new Pathway(TEST_PATH);
        expect(pathway.getCurrentVersion()).toBe(0);
    })

    test("Add trails", () => {
        const pathway = new Pathway(TEST_PATH);
        pathway.append({ step: 1 });
        pathway.append({ step: 2 });
        expect(pathway.getCurrentVersion()).toBe(2);
    })

    test("Get trails", () => { 
        const pathway = new Pathway(TEST_PATH);
        const step1 = { step: 1 };
        const step2 = { step: 2 };
        pathway.append(step1);
        pathway.append(step2);
        const trails = pathway.getTrails();
        expect(trails).toEqual([step1, step2]);
    })
})