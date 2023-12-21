import { defineConfig } from 'kitbook/defineConfig'
import { Locales } from './src/lib/poly-i18n/locales'

export default defineConfig({
  title: 'Poly I18n',
  description: 'Do-it-yourself, simple, framework agnostic i18n with type safety in under 100 lines.',
  viewports: [
    {
      name: 'Mobile',
      width: 320,
      height: 568,
    },
    {
      name: 'Tablet',
      width: 768,
      height: 1024,
    },
  ],
  languages: Object.entries(Locales).map(([code, name]) => ({ code, name })),
  addLanguageToUrl: ({ code, url }) => url.replace(/^.[^/]+/, `/${code}`),  
  kitbookRoute: '/[locale=locale]/kitbook',
  githubURL: 'https://github.com/jacob-8/poly-i18n/tree/main',
  expandTree: true,
})
