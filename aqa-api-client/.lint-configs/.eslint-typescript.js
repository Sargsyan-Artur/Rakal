module.exports = {
    root: false,
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
    rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
        '@typescript-eslint/consistent-type-assertions': [
            'error',
            {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'allow',
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            { accessibility: 'explicit', overrides: { constructors: 'no-public' } },
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: {
                    memberTypes: [
                        'public-static-field',
                        'protected-static-field',
                        'private-static-field',

                        'public-abstract-field',
                        'protected-abstract-field',
                        'private-abstract-field',

                        'public-decorated-field',
                        'protected-decorated-field',
                        'private-decorated-field',

                        'public-instance-field',
                        'protected-instance-field',
                        'private-instance-field',

                        'constructor',

                        'signature',

                        'public-static-get',
                        'public-static-set',
                        'protected-static-get',
                        'protected-static-set',
                        'private-static-get',
                        'private-static-set',

                        'public-abstract-get',
                        'public-abstract-set',
                        'protected-abstract-get',
                        'protected-abstract-set',
                        'private-abstract-get',
                        'private-abstract-set',

                        'public-decorated-get',
                        'public-decorated-set',
                        'protected-decorated-get',
                        'protected-decorated-set',
                        'private-decorated-get',
                        'private-decorated-set',

                        'public-instance-get',
                        'public-instance-set',
                        'protected-instance-get',
                        'protected-instance-set',
                        'private-instance-get',
                        'private-instance-set',

                        'public-static-method',
                        'protected-static-method',

                        'public-abstract-method',
                        'protected-abstract-method',
                        'private-abstract-method',

                        'public-instance-method',
                        'protected-instance-method',
                        'private-instance-method',
                        'private-static-method',
                    ],
                },
            },
        ],
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: true,
            },
        ],
        '@typescript-eslint/no-meaningless-void-operator': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
        '@typescript-eslint/no-unnecessary-condition': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-reduce-type-parameter': 'error',
        '@typescript-eslint/prefer-return-this-type': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': 'error',
        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'error',
        'no-duplicate-imports': 'off',
        '@typescript-eslint/no-duplicate-imports': 'error',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        'no-throw-literal': 'off',
        '@typescript-eslint/no-throw-literal': 'error',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'error',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/no-base-to-string': 'warn',
        '@typescript-eslint/unified-signatures': 'warn',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': [
            'error',
            {
                ignoreRestArgs: true,
            },
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off', // TODO
        '@typescript-eslint/no-unsafe-call': 'off', // TODO
        '@typescript-eslint/no-unsafe-member-access': 'off', // TODO
        '@typescript-eslint/no-unsafe-argument': 'off', // TODO
        '@typescript-eslint/explicit-module-boundary-types': 'off', // TODO
        '@typescript-eslint/no-unsafe-return': 'off', // TODO
        'no-console': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'no-underscore-dangle': [
            'error',
            {
                allowAfterThis: true,
            },
        ],
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'no-await-in-loop': 'off',
        'no-param-reassign': 'off',
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': 'off',
        'no-restricted-syntax': 'off',
        'import/no-extraneous-dependencies': 'off',
        'guard-for-in': 'off',
        'no-prototype-builtins': 'off',
        'no-continue': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        quotes: 'off',
        '@typescript-eslint/quotes': [
            'error',
            'double',
            {
                avoidEscape: true,
            },
        ],
        '@typescript-eslint/require-await': 'off',
    },
};