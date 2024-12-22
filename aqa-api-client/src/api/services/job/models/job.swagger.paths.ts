export const JOB_JSON_SCHEMA_PATHS = {
    types: {
        getAll: ['paths', '/api/v1/types', 'get', 'responses', '200', 'content', '*/*', 'schema'],
        create: ['paths', '/api/v1/types', 'post', 'responses', '200', 'content', '*/*', 'schema'],
        update: ['paths', '/api/v1/types', 'put', 'responses', '200', 'content', '*/*', 'schema'],
        addSubType: ['paths', '/api/v1/types/{typeId}/sub-types/', 'post', 'responses', '200', 'content', '*/*', 'schema'],
        delete: ['paths', '/api/v1/types/{id}', 'delete', 'responses', '200', 'description'],
    },
    subTypes: {
        update: ['paths', '/api/v1/sub-types', 'put', 'responses', '200', 'content', '*/*', 'schema'],
        delete: ['paths', '/api/v1/sub-types/{subTypeId}', 'delete', 'responses', '200', 'description'],
    },
};
