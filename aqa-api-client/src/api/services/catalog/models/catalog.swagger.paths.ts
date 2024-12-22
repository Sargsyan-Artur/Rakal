export const CATALOG_JSON_SCHEMA_PATHS = {
    catalogs: {
        findAll: ['paths', '/catalogs/{merchantId}', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
        findAllDefault: ['paths', '/catalogs/default', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
        addCategories: ['paths', '/catalogs/{merchantId}', 'post', 'responses', '201', 'content', 'application/json', 'schema'],
        removeCategory: ['paths', '/catalogs/{merchantId}/category/{categoryId}', 'delete', 'responses', '204'],
    },
};
