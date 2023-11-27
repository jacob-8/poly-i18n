<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";

  $: if(browser) document.documentElement.lang = $page.data.locale;
</script>

<div dir={$page.data.t('page.dir')}>
  <slot />
</div>