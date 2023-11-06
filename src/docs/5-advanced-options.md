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

## Bilingual language support (WIP on branch)

I use i18n on a tool for language learners. Imagine an English speaker is learning Mandarin. At first they want the tool interface to be in English. But as they learn more and more Mandarin, they want to see the Mandarin translation of the interface, but not all at once. That would be overwhelming, so I want them to be able to see both languages until they are ready to switch fully to using Mandarin. You can read the source for this repo to see how this pulled off, but it's extremely simple to add since we have a DIY solution. It'd be impossible using any of the current libraries, since it's such a niche use case that no one supports. This is the reason I call my i18n solution `poly-i18n` by the way.