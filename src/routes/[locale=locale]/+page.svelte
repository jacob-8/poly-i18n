<script lang="ts">
  import { sayHi } from "$lib/translated-helper";
  import { page } from "$app/stores";
  import { changeLocale } from "$lib/poly-i18n/changeLocale.js";
  import { Locales, type LocaleCode } from "$lib/poly-i18n/locales.js";
  import type { TranslationKeys } from "$lib/poly-i18n/types";

  const locales = Object.entries(Locales) as [LocaleCode, Locales][];

  export let dynamicKey = "hello.world" as TranslationKeys;
</script>

<div style="display: flex; border-bottom: 1px solid black; padding: 8px 0;">
  <a href="/" style="font-weight: bold; flex-grow: 1;">
    poly-i18n
  </a>
  <div>
    {#each locales as [code, name]}
      <button type="button" style="padding: 0 4px;" class:active={$page.data.locale === code} on:click={() => changeLocale(code, $page.url.href)}>{name}</button>
    {/each}
  </div>
</div>

<div style="padding: 8px;">
  <i>Translated hello.world</i> {$page.data.t("hello.world")}<br />
  <i>Fallbacked fruit.banana</i> {$page.data.t("fruit.banana")}<br />
  <i>Interpolated hello.person</i> {$page.data.t("hello.person", { values: { name: "John" } })}<br />
  
  {#if dynamicKey}
  <i>Dynamic key</i> {dynamicKey} {$page.data.t(dynamicKey)}<br />
  {/if}
  
  <br />
  <button type="button" on:click={sayHi}>{$page.data.t("say.hi")}</button><br />
  <br />
  
  <i>direct/keyed method (`$page.data.i18n.hello.world`)</i>: {$page.data.i18n.hello.world}<br />
  <i>direct/keyed method needing fallback</i> {$page.data.i18n.hello.person}<br />

  <br />
  <a href="/en/kitbook" style="font-weight: bold;">Read the docs >></a>
</div>

<style>
  .active {
    font-weight: bold;
  }
</style>