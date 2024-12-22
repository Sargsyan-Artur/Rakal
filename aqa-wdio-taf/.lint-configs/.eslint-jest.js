module.exports = {
    root: false,
    plugins: ['jest'],
    extends: ['plugin:jest/all', './.eslint-typescript'],
    rules: {
        'jest/no-hooks': 'off',
        'jest/consistent-test-it': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/prefer-lowercase-title': [
            'error',
            {
                ignore: ['describe', 'test'],
            },
        ],
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error',
        'jest/require-hook': 'off',
    },
};
