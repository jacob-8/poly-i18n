import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { DEFAULT_LOCALE, getSupportedLocale } from '$lib/poly-i18n/locales';

const TEMPORARY_REDIRECT = 307

export const load = (async ({ params, url: { search } }) => {
  const [urlLocale, ...rest] = params.catchlocale.split('/')
  if (urlLocale === 'kitbook')
    throw redirect(TEMPORARY_REDIRECT, `/en/kitbook/${rest.join('/')}${search}`)
  const locale = getSupportedLocale(urlLocale) || DEFAULT_LOCALE
  throw redirect(TEMPORARY_REDIRECT, `/${locale}/${rest.join('/')}${search}`)
}) satisfies PageLoad;