import type { ParamMatcher } from '@sveltejs/kit';
import { Locales } from '$lib/poly-i18n/locales';

export const match: ParamMatcher = (param) => {
  return Object.keys(Locales).includes(param)
};