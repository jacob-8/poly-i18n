import type { LayoutLoad } from './$types'
import { getDirectTranslator, getTranslator } from '$lib/poly-i18n'
import { getSupportedLocale } from '$lib/poly-i18n/locales'

export const load: LayoutLoad = async ({ url: { searchParams }, data: { serverLocale } }) => {
  const urlLocale = searchParams.get('lang')
  const locale = getSupportedLocale(urlLocale || serverLocale) || 'en'
  const t = await getTranslator(locale)
  const i18n = await getDirectTranslator(locale)
  return { locale, t, i18n }
}