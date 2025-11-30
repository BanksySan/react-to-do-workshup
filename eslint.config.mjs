import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
    // Ignore build / tooling output
    {
        ignores: ['dist', 'node_modules', '.yarn'],
    },
    // Main config for source files
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettierPlugin,
            // NOTE: do NOT add 'react-x' or 'react-dom' here, they are already
            // registered by reactX.configs[...] and reactDom.configs.recommended.
        },
        extends: [
            // Base JS rules
            js.configs.recommended,

            // TypeScript, type-aware
            ...tseslint.configs.recommendedTypeChecked,

            // React + React DOM rules for TS
            reactX.configs['recommended-typescript'],
            reactDom.configs.recommended,
        ],
        rules: {
            // React hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // Vite fast refresh safety
            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true},
            ],

            // Let Prettier handle formatting; surface format issues as ESLint errors
            'prettier/prettier': 'error',
        },
    }
);