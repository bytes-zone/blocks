<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    value,
    absent,
    present,
  }: { value: Date | undefined; absent: Snippet; present: Snippet<[Date]> } = $props();
</script>

{#if value}
  {@render present(value)}
{:else}
  {@render absent()}
{/if}
