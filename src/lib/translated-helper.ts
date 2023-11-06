import { get } from 'svelte/store'
import { page } from '$app/stores'

export function sayHi() {
  const { data: { t } } = get(page)
  alert(t('hello.world'))
}
