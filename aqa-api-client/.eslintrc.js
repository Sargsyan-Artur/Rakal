module.exports = {
    root: true,
    ignorePatterns: [
        '/node_modules',
        '/build',
        '/artifacts',
        '/src/api/services/**/models/*.ts',
        '/src/core/mocha/reporters/multi.reporter.js',
    ],
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
    ],
};
