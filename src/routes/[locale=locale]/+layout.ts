import type { LayoutLoad } from './$types'
import { getDirectTranslator, getTranslator } from '$lib/poly-i18n'
import type { LocaleCode } from '$lib/poly-i18n/locales'

export const load: LayoutLoad = async ({ params: { locale } }) => {
  const t = await getTranslator(locale as LocaleCode)
  const i18n = await getDirectTranslator(locale as LocaleCode)
  return { locale, t, i18n }
}