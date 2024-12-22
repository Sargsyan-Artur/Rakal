export const AUTH_JSON_SCHEMA_PATHS = {
    auth: {
        auth: ['paths', '/auth', 'post', 'responses', '200', 'content', '*/*', 'schema'],
        fatToken: ['paths', '/token/fat-token', 'post', 'responses', '200', 'content', '*/*', 'schema'],
    },
};
