/**
 * A callback function that takes an object of type T and returns a Promise that resolves to void.
 */
export type AsyncObjectCallback<T> = (obj: T) => Promise<void>;