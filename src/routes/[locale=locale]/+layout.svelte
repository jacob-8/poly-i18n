<script lang="ts">
  import { page } from "$app/stores";
</script>

<div dir={$page.data.t('page.dir')}>
  <slot />
</div>