import { redirect } from '@sveltejs/kit'
import { DEFAULT_LOCALE, findSupportedLocaleFromAcceptedLanguages, getSupportedLocale } from '$lib/poly-i18n/locales'

const TEMPORARY_REDIRECT = 307

export const load = (({ cookies, request }) => {
  const chosenLocale = cookies.get('locale')
  const acceptedLanguage = findSupportedLocaleFromAcceptedLanguages(request.headers.get('accept-language'))

  const locale = getSupportedLocale(chosenLocale || acceptedLanguage) || DEFAULT_LOCALE
  throw redirect(TEMPORARY_REDIRECT, `/${locale}`)
})
