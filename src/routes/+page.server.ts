import { redirect } from '@sveltejs/kit'
import { getSupportedLocale } from '$lib/poly-i18n/locales'
const TEMPORARY_REDIRECT = 307

export const load = (({ cookies, request }) => {
  const chosenLocale = cookies.get('locale')
  const acceptedLanguage = request.headers.get('accept-language')?.split(',')[0].trim()

  const locale = getSupportedLocale(chosenLocale || acceptedLanguage)
  throw redirect(TEMPORARY_REDIRECT, `/${locale}`)
})
