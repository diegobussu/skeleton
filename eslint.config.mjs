import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'all',
          bracketSpacing: true,
          printWidth: 120,
          tabWidth: 2,
          singleAttributePerLine: true,
          bracketSameLine: false,
          htmlWhitespaceSensitivity: 'ignore',
          overrides: [
            {
              files: '*.html',
              options: {
                parser: 'html',
              },
            },
          ],
        },
      ],
      'no-else-return': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-irregular-whitespace': 'error',
      'no-useless-constructor': 'off',
      'no-extra-bind': 'error',
      'block-spacing': ['error', 'always'],
      'no-console': 'warn',
      'no-useless-catch': 'error',
      'no-useless-return': 'error',
      'eol-last': ['error', 'always'],
    },
  },
];
