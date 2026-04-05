import { Event } from "../../src";

export const STORAGE_DATA: Event[] = [
    {
        id: "1",
        time: Date.now(),
        message: "1st event",
        create: [
            { id: "itemA" },
            { id: "itemB" },
            { id: "itemC" }
        ]
    }, {
        id: "2",
        time: Date.now(),
        message: "2nd event",
        delete: [
            "itemB"
        ],
        update: [
            { id: "itemA", msg: "Hello World!!!" }
        ]
    }, {
        id: "3",
        time: Date.now(),
        message: "3rd event",
        delete: [
            "itemC"
        ]
    }
];