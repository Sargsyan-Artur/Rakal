export const COMMERCE_ADAPTER_JSON_SCHEMA_PATHS = {
    categories: {
        find: ['paths', '/categories/{merchantId}', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
        add: ['paths', '/categories/{merchantId}', 'post', 'responses', '200', 'content', 'application/json', 'schema'],
        delete: ['paths', '/categories/{merchantId}/{categoryId}', 'delete', 'responses', '200', 'content', 'application/json', 'schema'],
    },
};
