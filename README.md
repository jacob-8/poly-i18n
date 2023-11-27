# Poly I18n

Do-it-yourself, simple, framework agnostic i18n with type safety in under 100 lines. [Try it out](https://poly-i18n.vercel.app), learn how to [get started](https://poly-i18n.vercel.app/kitbook/docs/0-set-locales) or [play with it in Stackblitz](https://stackblitz.com/github/jacob-8/poly-i18n).

## Features

✅ Minimal - less than 100 lines of code. It's not a library, just copy-paste into your project and adjust to your needs\
✅ SSR safe: does not use shared server side stores to fix the race condition problems of [`svelte-i18n`](https://github.com/kaisermann/svelte-i18n), [`svelte-intl-precompile`](https://github.com/cibernox/svelte-intl-precompile) and [`sveltekit-i18n`](https://github.com/sveltekit-i18n)\
✅ Efficient: Each server instance only loads translations the first time they are needed. They next time they are needed, they are already in memory\
✅ Platform agnostic: built for SvelteKit, but works anywhere\
✅ Use local data or a remote API for translation strings - you write the file import\
✅ Type-safe translation strings without a build step if using local data, you will get TS errors if you enter an invalid key or have a missing translation string\
✅ Use a fallback locale to progressively translate your site\
✅ No external dependencies\
✅ Error on missing messages on dev\
✅ Works in both Svelte or JS/TS files\
✅ Supports basic value interpolation `Hi {name}!` - for other i18n formatting features you can copy from elsewhere if needed

## Why?

I use [`svelte-i18n`](https://github.com/kaisermann/svelte-i18n) and recently started multilingual [screenshot regression testing](https://kitbook.vercel.app/docs/7-visual-regression-testing) using Kitbook and from a large number of flaky tests solely due to showing the wrong language at random times the underlying race condition problem in the current i18n offerings for SvelteKit became obvious. Previously I only noticed it every few months, but as our user base grew more reports came in about the funny language flashes as the client hydrates and switches to the correct language.

The problem lies in the way [`svelte-i18n`](https://github.com/kaisermann/svelte-i18n)'s uses shared state on the server. [This is a bad idea in SvelteKit](https://kit.svelte.dev/docs/state-management#avoid-shared-state-on-the-server) because it is causing lots of race condition issues as requests from 11 different languages come in all at once. There is a [workaround](https://github.com/kaisermann/svelte-i18n/issues/165#issuecomment-1784214747) that would be implemented like this:

```svelte
<script lang="ts">
  import { t } from "svelte-i18n";
  import { page } from "$app/stores";
</script>

{$t("hello.world", { locale: $page.data.lang })}
```

...but I don't like adding that much code across a large app.

Then [`svelte-intl-precompile`](https://github.com/cibernox/svelte-intl-precompile) also uses a shared store to keep track of current locale which has the same [race condition problem](https://github.com/cibernox/svelte-intl-precompile/issues/39). The [workaround](https://github.com/cibernox/svelte-intl-precompile/issues/39#issuecomment-1106304135) is to instantiate a new instance for each request. So there are no speed benefits to be gained from any sort of caching already loaded translation.

[`sveltekit-i18n`](https://github.com/sveltekit-i18n) also has the [same problem](https://github.com/sveltekit-i18n/lib/issues/106) if implemented as instructed. The [solution](https://github.com/sveltekit-i18n/lib/issues/106#issuecomment-1535196388) there is also to instantiate a new instance for each request.

After looking through each, I realized they all contained a lot of code not applicable to my project, none are designed to be used in a method that instantiates a new instance for each request, and that the i18n code needed to handle my i18n needs was really quite simple, less than 100 lines. Take a look and see if it's what you need for your project.

