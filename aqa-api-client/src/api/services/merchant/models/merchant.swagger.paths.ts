export const MERCHANT_JSON_SCHEMA_PATHS = {
    merchantAdmin: {
        all: ['paths', '/api/v1/admin/merchants', 'get', 'responses', '200', 'content', '*/*', 'schema'],
        byId: ['paths', '/api/v1/admin/merchants/{merchantId}', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
        children: ['paths', '/api/v1/admin/merchants/{merchantId}/children', 'get', 'responses', '200', 'content', '*/*', 'schema'],
        create: ['paths', '/api/v1/admin/merchants', 'post', 'responses', '201', 'content', 'application/json', 'schema'],
        update: ['paths', '/api/v1/admin/merchants/{merchantId}', 'put', 'responses', '204'],
    },
    merchant: {
        all: ['paths', '/api/v1/merchants', 'get', 'responses', '200', 'content', '*/*', 'schema'],
        byId: ['paths', '/api/v1/merchants/{merchantId}', 'get', 'responses', '200', 'content', 'application/json', 'schema'],
        children: ['paths', '/api/v1/merchants/{merchantId}/children', 'get', 'responses', '200', 'content', '*/*', 'schema'],
    },
};
