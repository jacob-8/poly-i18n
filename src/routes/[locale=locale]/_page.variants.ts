import type { Variant, Viewport } from 'kitbook'
import type Component from './+page.svelte'
import type { TranslationKeys } from '$lib/poly-i18n/types'

export const viewports: Viewport[] = [
  { name: 'Mobile', width: 400, height: 300 },
]

export const variants: Variant<Component>[] = [
  {
    props: {
      //@ts-expect-error - not defining t and locale
      data: {
        dynamicKey: 'hello.world',
      }
    },
  },
  {
    name: 'Regional Variant (en-GB)',
    description: 'defaults to closest matching locale (en) and keeps rest of the url route',
    languages: [{ code: 'en-GB', name: 'English (UK)' }],
  },
  {
    name: 'Missing i18n key',
    description: 'Will throw an error on dev browser, but just console error on prod',
    languages: [],
    props: {
      dynamicKey: 'non.existent' as TranslationKeys,
    },
  },
]
