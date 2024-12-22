// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
export function extractJsonSchema(doc: any, path: string[]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let schema: any;
    for (const item of path) {
        schema = !schema ? doc[item] : schema[item];
        if (!schema) {
            throw new Error(`There is no match for ${item} path property for json schema location`);
        }
    }
    return schema;
}
