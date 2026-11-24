import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jasmine },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', ignoreRestSiblings: true }],
    },
  },
  {
    // Los archivos de prueba no se recargan en caliente: la regla de Fast Refresh no aplica
    files: ['**/*.spec.{js,jsx}', 'src/test/**'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  // ---- Jerarquía de Atomic Design: cada nivel solo puede usar niveles inferiores ----
  {
    files: ['src/components/atoms/**/*.{js,jsx}'],
    ignores: ['**/*.spec.{js,jsx}'],
    rules: { 'no-restricted-imports': ['error', { patterns: [
      { group: ['**/molecules/**', '**/organisms/**', '**/templates/**', '**/pages/**'], message: 'Un átomo no puede usar niveles superiores.' },
      { group: ['**/context/**', '**/data/**'], message: 'Un átomo no conoce el estado ni los datos de la tienda.' },
    ] }] },
  },
  {
    files: ['src/components/molecules/**/*.{js,jsx}'],
    ignores: ['**/*.spec.{js,jsx}'],
    rules: { 'no-restricted-imports': ['error', { patterns: [
      { group: ['**/organisms/**', '**/templates/**', '**/pages/**'], message: 'Una molécula solo puede usar átomos.' },
      { group: ['**/context/**', '**/data/**'], message: 'Una molécula no conoce el estado ni los datos de la tienda.' },
    ] }] },
  },
  {
    files: ['src/components/organisms/**/*.{js,jsx}'],
    ignores: ['**/*.spec.{js,jsx}'],
    rules: { 'no-restricted-imports': ['error', { patterns: [
      { group: ['**/templates/**', '**/pages/**'], message: 'Un organismo no puede usar templates ni páginas.' },
    ] }] },
  },
  {
    files: ['src/components/templates/**/*.{js,jsx}'],
    ignores: ['**/*.spec.{js,jsx}'],
    rules: { 'no-restricted-imports': ['error', { patterns: [
      { group: ['**/pages/**'], message: 'Un template no puede usar páginas.' },
    ] }] },
  },
  {
    files: ['karma.conf.cjs'],
    languageOptions: { globals: globals.node, sourceType: 'commonjs' },
  },
])
