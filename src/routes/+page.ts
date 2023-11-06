import type { TranslationKeys } from '$lib/poly-i18n/types';
import type { PageLoad } from './$types';

export const load = (async () => {
  const dynamicKey: TranslationKeys = 'hello.world';
  return { dynamicKey };
}) satisfies PageLoad;