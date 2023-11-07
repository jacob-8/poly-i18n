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

Check the [source code](https://github.com/jacob-8/poly-i18n) for `page.dir` to learn how.

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


## Bilingual language support (WIP on branch)

I use i18n on a tool for language learners. Imagine an English speaker is learning Mandarin. At first they want the tool interface to be in English. But as they learn more and more Mandarin, they want to see the Mandarin translation of the interface, but not all at once. That would be overwhelming, so I want them to be able to see both languages until they are ready to switch fully to using Mandarin. You can read the source for this repo to see how this pulled off, but it's extremely simple to add since we have a DIY solution. It'd be impossible using any of the current libraries, since it's such a niche use case that no one supports. This is the reason I call my i18n solution `poly-i18n` by the way.