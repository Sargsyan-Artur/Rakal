module.exports = {
    root: true,
    ignorePatterns: ['/node_modules', '/build', '/artifacts'],
    env: {
        browser: true,
        es6: true,
    },
    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: ['tsconfig.json'],
            },
            extends: ['./.lint-configs/.eslint-javascript', './.lint-configs/.eslint-typescript', 'prettier'],
        },
        {
            files: ['*.js'],
            extends: ['./.lint-configs/.eslint-javascript', 'prettier'],
        },
        {
            files: ['__mocks__/**/*.ts', 'tests/unit/**/*.ts'],
            env: {
                'jest/globals': true,
            },
            extends: ['./.lint-configs/.eslint-javascript', './.lint-configs/.eslint-jest', 'prettier'],
        },
        {
            files: ['tests/e2e/**/*.ts', 'tests/e2e/**/*.feature'],
            plugins: ['cucumber'],
        },
    ],
};
