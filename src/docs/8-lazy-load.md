# Load Strings by Route

I know you can split apart translation files and manually define routes as done in `sveltekit-i18n`, but that's difficult to pull off in a giant application. Here's a brainstorm of how we could load just the strings needed for a route in an automatic fashion:

- update the `getTranslator` function to accept a route and always pass this in from `+layout.ts`
- place all translations in 1 file
- write a Vite plugin
  - that does nothing on dev, all translations can load straight in because it's local (fast)
  - on build
    - split translations by sections into separate files
    - for each `+page.svelte` file find it's entire import tree (including lazy-loaded imports)
      - string parse each raw file looking for `i18n.{section}.{key}` and map each section to that route in a map
    - Update the i18n/index.ts translations import to return the necessary section files just for that route 

## Dependency Graph inspiration
- https://github.com/tkskto/vue-component-analyzer
- Nuxt DevTools
- https://github.com/pahen/madge
