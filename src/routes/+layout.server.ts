import { findSupportedLocaleFromAcceptedLangauges } from '$lib/poly-i18n/locales'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ cookies, request }) => {
  const acceptedLanguage = findSupportedLocaleFromAcceptedLangauges(request.headers.get('accept-language'))
  const chosenLocale = cookies.get('locale')
  return { acceptedLanguage, chosenLocale }
}