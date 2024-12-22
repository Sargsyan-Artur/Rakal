// tslint:disable-next-line:no-any
export function extractConstValue<T>(obj: any, path: string): T {
    const pathData = path.split('.');

    if (pathData.length === 1) {

        if (!obj.hasOwnProperty(pathData[0])) {
            throw new Error(`There in no match in constants for passed key: ${path}`);
        }

        if (typeof obj[pathData[0]!] === 'object') {
            throw new Error(`The final value in constants should have one of the following type: string, number, boolean. Current: ${typeof obj[pathData[0]!]}`);
        }

        return obj[pathData[0]!] as T;
    }

    let data = JSON.parse(JSON.stringify(obj));

    for (const item of pathData) {

        if (!data.hasOwnProperty(item)) {
            throw new Error(`There in no match in constants for passed key: ${item}. Full path: ${path}`);
        }

        if (typeof data[item] !== 'object') {
            return data[item] as T;
        }

        data = data[item];
    }

    throw new Error(`There in no match in constants for passed path: ${path}`);
}
