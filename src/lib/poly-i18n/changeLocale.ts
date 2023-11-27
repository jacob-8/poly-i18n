import { goto } from "$app/navigation";
import type { LocaleCode } from "./locales";
import { page } from '$app/stores'
import { get } from 'svelte/store'

export function changeLocale(locale: LocaleCode, url: string) {
  const { data: { locale: currentLocale } } = get(page)
  setLocaleCookie(locale);
  goto(url.replace(currentLocale, locale), { invalidateAll: true }) // SvelteKit method - invalidateAll required to force layout loads to re-run if using switches from language A to B and back to A
  // location.assign(url.href); // framework-agnostic method
}

function setLocaleCookie(locale: LocaleCode) {
  const HUNDRED_YEARS = 60 * 60 * 24 * 365 * 100; // seconds * minutes * hours * days * years
  document.cookie = `locale=${locale}; max-age=${HUNDRED_YEARS}; path=/; samesite=strict`;
}
