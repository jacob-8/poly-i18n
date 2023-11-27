# Advanced Options

## Check all user's accepted languages

Sometimes a user's 1st locale is not supported but they have another preference that is. You can update a few files to account for that:

```ts title="lib/poly-i18n/locales.ts"
export function findSupportedLocaleFromAcceptedLangauges(acceptedLanguageHeader: string | null) {
  const locales = acceptedLanguageHeader
    ?.split(',')
    ?.map(lang => lang.split(";")[0].trim()) ?? []

  for (const locale of locales) {
    const supportedLocale = getSupportedLocale(locale)
    if (supportedLocale) {
      return supportedLocale
    }
  }
}

export function getSupportedLocale(userLocale: string | undefined) {
  return Object.keys(Locales).find((supportedLocale) => {
    return userLocale?.includes(supportedLocale)
  }) as LocaleCode | undefined
}
```

## Right-to-left support

```svelte title="src/routes/+layout.svelte"
<script>
  import { page } from "$app/stores";
</script>

<div dir={$page.data.t('page.dir')}>
  <slot />
</div>
```

According to the "Text Direction" section of [T18S' SEO page](https://t18s.sigrist.dev/seo) there's a browser native way to do this but it requires checking for locale in your `src/hooks.server.js` file - this is trivial but so far I've avoided duplicating my locale checking between the server hooks file and `+layout.ts` for simplicity sake (it's optional in the server hooks file, but mandatory in `+layout.ts` as you need the locale checking page data setting to run on every client side url update which doesn't include the server hooks).

## Set page lang tag

On the client do this:

```svelte title="src/routes/+layout.svelte" {5}
<script>
  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  $: if (browser) document.documentElement.lang = $page.data.locale;
</script>

<slot />
```

On the server you can do as described in the "On the Server" section of [T18S' SEO page](https://t18s.sigrist.dev/seo).

## Dynamic Keys

Type-safety is great, but sometimes you may need the ability to use dynamic keys and then provide a specific fallback. The implementation would look like this:

```svelte
{$page.data.t({ dynamicKey: `semanticDomain.${domain.key}`, fallback: domain.name })}
```

To set that up you can adjust the `getTranslator` function to accept the options first or second:

```ts title="lib/poly-i18n/index.ts"
interface TranslateOptions {
  values?: Record<string, string>
  dynamicKey?: string
  fallback?: string
}

export async function getTranslator(locale: LocaleCode) {
  // load locales as previously shown...

  return (keyOrOptions: TranslationKeys | TranslateOptions, options?: TranslateOptions): string => {
    let key: string

    if (typeof keyOrOptions === 'string') {
      key = keyOrOptions
    } else {
      options = keyOrOptions
      key = options.dynamicKey
    }
    // continue with the rest of the function as shown previously...
  }
}
```

## Use actual translations in unit tests

With the setup used in `poly-i18n` you can easily use the actual translations in your unit tests. For example, I have a function that transforms incoming parts of speech keys in database data into a shape usable through the UI without having to translate these everywhere they show up. This enable the UI to just receive the values and show them. Here's a simplified example:

```ts title="translateSemanticDomains.ts"
import type { TranslateFunction } from '$lib/i18n/types';
import { en } from '$lib/i18n';

export function translateSemanticDomains(semanticDomainKey: string, t: TranslateFunction) {
  return t({ dynamicKey: `semanticDomain.${semanticDomainKey}`, fallback: semanticDomainKey })
}

if (import.meta.vitest) {
  describe(translateSemanticDomains, () => {
    const t = ((key: string) => {
      const [section, item] = key.split('.')
      return en[section][item];
    }) as TranslateFunction

    it('translates key into word', () => {
      const result = translateSemanticDomains('n', t)
      expect(result).toEqual('noun')
    })
  })
}
```

## Direct/keyed method

If you only use translation strings without any interpolation features, you're in a great position to try an even more powerful method that gives you the ability to click directly to your source translation files from usage without needing any editor extension. It looks like this:

![direct autocomplete](/direct-autocomplete.png)

To get this working, you can simplify your `getTranslator` function to look like this:

```ts title="lib/poly-i18n/index.ts"
export async function getTranslator(locale: LocaleCode) {
  if (locale === 'en')
    return en

  if (!loadedTranslations[locale])
    loadedTranslations[locale] = await import(`./locales/${locale}.json`)

  return merge({ fallback: en, translation: loadedTranslations[locale]})
}
```

That merge function looks like this:

```ts title="lib/poly-i18n/merge.ts"
import type en from './locales/en.json'

export function merge({fallback, translation}: {fallback: Record<string, any>, translation: Record<string, any>}) {
  const result = { ...fallback };

  Object.keys(translation).forEach(key => {
    if (translation[key] && typeof translation[key] === 'object') {
      result[key] = merge({fallback: result[key] || {}, translation: translation[key]});
    } else if (translation[key]) {
      result[key] = translation[key];
    }
  });

  return result as typeof en;
}
```

If you don't need a fallback, just skip the merge function and return the translation directly.

Now you can use `$page.data.t.hello.world` instead of `$page.data.t('hello.world)`. This repo actually demoes both methods, so you'll see that I have named the value for this direct method as `i18n` and so use it as `$page.data.i18n.hello.world`.

## Bilingual language support (WIP on branch)

I use i18n on a tool for language learners. Imagine an English speaker is learning Mandarin. At first they want the tool interface to be in English. But as they learn more and more Mandarin, they want to see the Mandarin translation of the interface, but not all at once. That would be overwhelming, so I want them to be able to see both languages until they are ready to switch fully to using Mandarin. You can read the source for this repo to see how this pulled off, but it's extremely simple to add since we have a DIY solution. It'd be impossible using any of the current libraries, since it's such a niche use case that no one supports. This is the reason I call my i18n solution `poly-i18n` by the way.