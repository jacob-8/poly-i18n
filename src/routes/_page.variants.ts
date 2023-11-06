import type { Variant, Viewport } from 'kitbook'
import type Component from './+page.svelte'

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
    description: 'default to basic locale: en',
    languages: [{ code: 'en-GB', name: 'English (UK)' }],
  },
  {
    name: 'Missing i18n key',
    description: 'Will throw an error on dev browser, but just console error on prod',
    languages: [],
    props: {
      data: {
        //@ts-expect-error - not defining t and locale and passing a broken key
        dynamicKey: 'non.existent',
      }
    },
  },
]
