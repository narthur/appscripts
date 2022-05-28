module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2017,
    },
    extends: [
        'eslint:recommended',
    ],
    rules: {
        "no-console": 1
    },
    env: {
        node: true,
    },
    overrides: [
        {
            files: ['*/build/**/*.js'],
            rules: {
                "no-unused-vars": 0,
            }
        },
        {
            files: ['*/src/**/*.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                "plugin:@typescript-eslint/recommended-requiring-type-checking"
            ],
            plugins: [
                '@typescript-eslint',
            ],
            rules: {
                "@typescript-eslint/explicit-function-return-type": [2, {
                    "allowExpressions": true
                }],
            }
        }
    ]
};