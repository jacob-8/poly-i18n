import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'poly-i18n:unit',
    globals: true,
    includeSource: ['src/**/*.ts'],
    exclude: [...defaultExclude, '.svelte-kit', 'e2e/*.spec.ts'],
  },
})
