import en from './locales/en.json'
import { DEFAULT_LOCALE, type LocaleCode } from './locales'
import type { TranslationKeys } from './types'
import { interpolate } from './interpolate'
import { browser, dev } from '$app/environment'
import { merge } from './merge'

const loadedTranslations: Record<string, typeof en> = {
  en, // start with default language, don't lazy load because I know I want it as a fallback
}

export async function getTranslator(locale: LocaleCode) {
  if (!loadedTranslations[locale])
    loadedTranslations[locale] = await import(`./locales/${locale}.json`)

  return (key: TranslationKeys, options?: { values?: Record<string, string> }): string => {
    if (!key.includes('.'))
      throw new Error('Incorrect i18n key. Must be nested 1 level (contain 1 period).')

    const [section, item] = key.split('.') as [string, string]

    // @ts-expect-error - we already typecheck the key argument and types don't know how to properly distinguish the allowed items for a chosen section if we do type the line above properly so we ignore here
    const localeResult = loadedTranslations[locale][section]?.[item]
    if (localeResult)
      return interpolate(localeResult, options?.values)
    console.warn(`Missing ${locale} translation for ${key}`)

    if (locale !== DEFAULT_LOCALE) {
      // @ts-expect-error - same issue as above
      const fallbackResult = loadedTranslations[DEFAULT_LOCALE][section]?.[item]
      if (fallbackResult)
        return interpolate(fallbackResult, options?.values)
      console.warn(`Missing fallback for: ${key}`)
    }

    if (dev && browser)
      throw new Error(`Missing i18n key: ${key}`)

    return key
  }
}

// Optional alternative to the above method if you don't need any interpolation features
export async function getDirectTranslator(locale: LocaleCode) {
  if (locale === 'en')
    return en

  if (!loadedTranslations[locale])
    loadedTranslations[locale] = await import(`./locales/${locale}.json`)

  return merge({ fallback: en, translation: loadedTranslations[locale] })
}
