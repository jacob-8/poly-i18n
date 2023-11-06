import { goto } from "$app/navigation";
import type { LocaleCode } from "./locales";

export function changeLocale(locale: LocaleCode, url: URL) {
  setLocaleCookie(locale);
  url.searchParams.set('lang', locale);
  goto(url, { invalidateAll: true }) // SvelteKit method - invalidateAll required to force layout loads to re-run if using switches from language A to B and back to A
  // location.assign(url.href); // framework-agnostic method
}

function setLocaleCookie(locale: LocaleCode) {
  const HUNDRED_YEARS = 60 * 60 * 24 * 365 * 100; // seconds * minutes * hours * days * years
  document.cookie = `locale=${locale}; max-age=${HUNDRED_YEARS}; path=/; samesite=strict`;
}
