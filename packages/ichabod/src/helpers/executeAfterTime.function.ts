export function executeAfterTime(time: number, func: () => void) {
    return new Promise<void>(resolve => setTimeout(() => {
        func();
        resolve();
    }, time));
}