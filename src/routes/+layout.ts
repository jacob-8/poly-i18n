import type { LayoutLoad } from './$types'
import { getTranslator } from '$lib/poly-i18n'
import { getSupportedLocale } from '$lib/poly-i18n/locales'

export const load: LayoutLoad = async ({ url: { searchParams }, data: { serverLocale } }) => {
  const urlLocale = searchParams.get('lang')
  const locale = getSupportedLocale(urlLocale || serverLocale)
  const t = await getTranslator(locale )
  return { locale, t }
}