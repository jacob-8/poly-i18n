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
