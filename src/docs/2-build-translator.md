# Build Translator

Using the locales and formatting features we've already added you can  build a function that returns a translator instance (some people may call this a formatter). 

Start by importing your default language and creating a `loadingTranslations` which will serve to cache translations on the server as they are used. This way each server will only need to load translations once, regardless of how many user requests come in.

```ts title="lib/poly-i18n/index.ts"
import en from './locales/en'

const loadedTranslations: Record<string, typeof en> = {
  en, // start with default language, don't lazy load because I know I want it as a fallback
}
```

With 11 languages (1 of them not being served by Google translate), it's impossible to ensure that all the languages have translations from our translators before we update the app, so we always need a fallback loaded in. There's no reason to lazy-load what we know we need every request.

Now we create our `getTranslator` function which will be used to get a translator instance for a given locale. It will use a Vite glob import to load the translation file for that locale if it hasn't been loaded yet, and then return a function that will be used to translate strings.

```ts title="lib/poly-i18n/index.ts" {4-5}
import type { LocaleCode } from './locales'

export async function getTranslator(locale: LocaleCode) {
  if (!loadedTranslations[locale])
    loadedTranslations[locale] = (await import(`./locales/${locale}.js`)).default

  return (key) => 'todo'
}
```

We already checked that the locale is supported, so we can just use the `locale` as the filename. If you have a locale file for every one of your supported locales, it will work. But you could add error handling to that import.

Now for our returned function. The following code has these features which you should customize to your needs:
- checks key is nested 1 level
- returns the translation string if found, using interpolation if needed
- logs a warning if the translation is missing for the given locale
- returns the English translation if found
- logs an error if the English translation is missing (and throws an error in dev)

```ts title="lib/poly-i18n/index.ts"
import type { TranslationKeys } from './types'
import { interpolate } from './interpolate'
import { dev } from '$app/environment'

// inside getTranslator...
return (key: TranslationKeys, options?: { values?: Record<string, string> }): string => {
  if (!key.includes('.'))
    throw new Error('Incorrect i18n key. Must be nested 1 level (contain 1 period).')

  const [section, item] = key.split('.') as [string, string]

  // @ts-expect-error - we already typecheck the key argument and types don't know how to properly distinguish the allowed items for a chosen section if we do type the line above properly so we ignore here
  const localeResult = loadedTranslations[locale][section]?.[item]
  if (localeResult)
    return interpolate(localeResult, options?.values)
  console.warn(`Missing ${locale} translation for ${key}`)

  // @ts-expect-error - same issue as above
  const fallbackResult = loadedTranslations.en[section][item]
  if (fallbackResult)
    return interpolate(fallbackResult, options?.values)

  const error = `Missing English for: ${key}`
  if (dev)
    throw new Error(error)

  console.error(error)
  return key
}
```

Let's put it all together:

```ts title="lib/poly-i18n/index.ts"
import en from './locales/en'
import type { LocaleCode } from './locales'
import type { TranslationKeys } from './types'
import { interpolate } from './interpolate'
import { dev } from '$app/environment'

const loadedTranslations: Record<string, typeof en> = {
  en, // start with default language, don't lazy load because I know I want it as a fallback
}

export async function getTranslator(locale: LocaleCode) {
  if (!loadedTranslations[locale])
    loadedTranslations[locale] = (await import(`./locales/${locale}.js`)).default

  return (key: TranslationKeys, options?: { values?: Record<string, string> }): string => {
    if (!key.includes('.'))
      throw new Error('Incorrect i18n key. Must be nested 1 level (contain 1 period).')

    const [section, item] = key.split('.') as [string, string]

    // @ts-expect-error - we already typecheck the key argument and types don't know how to properly distinguish the allowed items for a chosen section if we do type the line above properly so we ignore here
    const localeResult = loadedTranslations[locale][section]?.[item]
    if (localeResult)
      return interpolate(localeResult, options?.values)
    console.warn(`Missing ${locale} translation for ${key}`)

    // @ts-expect-error - same issue as above
    const fallbackResult = loadedTranslations.en[section][item]
    if (fallbackResult)
      return interpolate(fallbackResult, options?.values)

    const error = `Missing English for: ${key}`
    if (dev)
      throw new Error(error)

    console.error(error)
    return key
  }
}
```

You can use the above code with any framework. Let's learn how to [[3-use-with-sveltekit]] >>

[//begin]: # "Autogenerated link references for markdown compatibility"
[3-use-with-sveltekit]: 3-use-with-sveltekit.md "Use With SvelteKit"
[//end]: # "Autogenerated link references"