import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist'] },

  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],

    files: ['**/*.{ts,tsx}'],

    rules: {
      // React Hooks (QUAN TRỌNG)
      ...reactHooks.configs.recommended.rules,

      // TypeScript
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }
);