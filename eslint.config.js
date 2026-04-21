import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js}'],
    extends: ['eslint:recommended'],
    plugins: ['react', 'prettier'],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': ['error', { allow: ['error'] }],
    },
  },
]);
