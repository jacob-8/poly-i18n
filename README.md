# Poly I18n

Do-it-yourself, simple, framework agnostic i18n with type safety in under 100 lines. [Try it out](https://poly-i18n.vercel.app), learn how to [get started](https://poly-i18n.vercel.app/kitbook/docs/0-set-locales) or [play with it in Stackblitz](https://stackblitz.com/github/jacob-8/poly-i18n).

## Features

✅ Minimal - less than 100 lines of code not counting your project setup (desired locales and translation strings). It's not a library, just copy-paste into your project and use what you need\
✅ SSR safe: does not use shared server side stores to fix the race condition problems of `svelte-i18n`, `svelte-intl-precompile` and `sveltekit-i18n`\
✅ Each server instance only loads translations once, the first time they are needed. They next time they are needed, they are already in memory\
✅ Platform agnostic - built for SvelteKit, but works anywhere if you remove the conenvient SvelteKit dev warn on missing messages line\
✅ Use local data or a remote API for translation strings - you write the file import\
✅ Type-safe translation strings (if using local data), you will get TS errors if you enter an invalid key or have a missing translation string\
✅ Use a fallback locale to progressively translate your site\
✅ No external dependencies\
✅ Error on missing messages on dev\
✅ Works in both Svelte or JS/TS files\
✅ Supports basic interpolation `Hi {name}!` but none of the other i18n formatting features. If you need these, they would be easy to copy from elsewhere to implement.

## TODO

Bilingual language support to show two languages side-by-side for language learners who are jumping to a new language


