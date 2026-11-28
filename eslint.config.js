const js = require('@eslint/js')
const { defineConfig } = require('eslint/config')
const globals = require('globals')
const tseslint = require('typescript-eslint')
const reactHooks = require('eslint-plugin-react-hooks')
const reactRefresh = require('eslint-plugin-react-refresh').default
const jsxA11y = require('eslint-plugin-jsx-a11y')

module.exports = defineConfig([
  { ignores: ['build/**', 'coverage/**', 'playwright-report/**', 'test-results/**'] },
  {
    files: ['*.{js,ts}'],
    extends: [js.configs.recommended],
    languageOptions: { parser: tseslint.parser, globals: globals.node },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: { globals: globals.browser },
    // Keep existing draft synchronization and store findings visible during migration.
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'no-case-declarations': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
    },
  },
])
