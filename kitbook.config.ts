import { defineConfig } from 'kitbook/defineConfig'

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
  // languages: [
  //   {
  //     name: 'English',
  //     code: 'en',
  //   },
  //   {
  //     name: 'Spanish',
  //     code: 'es',
  //   },
  // ],
  githubURL: 'https://github.com/jacob-8/poly-i18n',
  expandTree: true,
})
