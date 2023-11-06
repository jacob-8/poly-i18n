import { findSupportedLocaleFromAcceptedLangauges } from '$lib/poly-i18n/locales'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ cookies, request }) => {
  const chosenLocale = cookies.get('locale')
  const acceptedLanguage = findSupportedLocaleFromAcceptedLangauges(request.headers.get('accept-language'))
  
  return {
    serverLocale: chosenLocale || acceptedLanguage,
  }
}