export const PRODUCT_JSON_SCHEMA_PATHS = {
    brands: {
        findAll: ['paths', '/brands', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
        create: ['paths', '/brands', 'post', 'responses', '201', 'content', 'application/json', 'schema'],
        getById: ['paths', '/brands/{id}', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
        update: ['paths', '/brands/{id}', 'put', 'responses', '200', 'content', 'application/json', 'schema'],
        patch: ['paths', '/brands/{id}', 'patch', 'responses', '200', 'content', 'application/json', 'schema'],
        exists: ['paths', '/brands/exists', 'post', 'responses', '200', 'content', 'application/json', 'schema'],
    },
};
