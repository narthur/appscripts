module.exports = {
    root: true,
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2017,
    },
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        
    ],
    plugins: ["prettier", "googleappsscript"],
    rules: {
        "no-console": "error",
        "prettier/prettier": "error",
        "complexity": "error"
    },
    env: {
        node: true,
        "googleappsscript/googleappsscript": true,
        "jest/globals": true,
    },
    overrides: [
        {
            files: ['projects/*/build/**/*.js'],
            rules: {
                "no-unused-vars": 0,
            }
        },
        {
            files: ['**/*.ts'],
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
                "@typescript-eslint/no-unused-vars": 2,
            }
        },
        {
            files: ['projects/*/src/index.ts'],
            plugins: ["jsdoc"],
            extends: ["plugin:jsdoc/recommended"],
            rules: {
                "jsdoc/check-tag-names": ["error", {
                    "definedTags": ["customfunction"]
                }],
                "@typescript-eslint/no-unused-vars": "off",
            }
        },
    ]
};
