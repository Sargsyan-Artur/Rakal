module.exports = {
    root: false,
    plugins: ['jest'],
    extends: ['plugin:jest/all', './.eslint-typescript'],
    rules: {
        'jest/no-hooks': 'off',
        'jest/consistent-test-it': 'off',
        'jest/prefer-lowercase-title': [
            'error',
            {
                ignore: ['describe', 'test'],
            },
        ],
    },
};
