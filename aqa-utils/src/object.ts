export function getObjectWithoutProperty<T, R extends keyof T>(initialObject: T, property: R): Omit<T, R> {
    const copy = JSON.parse(JSON.stringify(initialObject)) as T;
    const {[property]: _, ...result} = copy;
    return result;
}
