module.exports = {
    root: false,
    extends: ['eslint-config-airbnb-base'],
    rules: {
        'import/no-unresolved': 'off',
        'arrow-body-style': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'import/extensions': 'off',
        'consistent-return': 'off',
        'lines-between-class-members': 'off',
        quotes: [
            'error',
            'double',
            {
                avoidEscape: true,
            },
        ],
    },
};
