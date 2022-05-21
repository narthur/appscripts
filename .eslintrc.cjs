module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    rules: {
        "@typescript-eslint/explicit-function-return-type": [2, {
            "allowExpressions": true
        }],
        "no-console": 1
    }
};