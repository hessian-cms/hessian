/**
 * Executes a function after a specified time.
 * @param time 
 * @param func 
 * @returns 
 */
export function executeAfterTime(time: number, func: () => void) {
    return new Promise<void>(resolve => setTimeout(() => {
        func();
        resolve();
    }, time));
}