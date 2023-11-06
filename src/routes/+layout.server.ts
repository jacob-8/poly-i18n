import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = ({ cookies, request }) => {
  const chosenLocale = cookies.get('locale')
  const acceptedLanguage = request.headers.get('accept-language')?.split(',')[0].trim()
  
  return {
    serverLocale: chosenLocale || acceptedLanguage,
  }
}