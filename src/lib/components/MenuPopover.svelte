<script lang="ts">
  import { popover } from '$lib/popover';
  import type { Snippet } from 'svelte';

  const { id, children }: { id: string; children: Snippet } = $props();
</script>

<aside {id} class="menu" {@attach popover}>
  <div class="menu-items">
    {@render children()}
  </div>
</aside>

<style>
  aside {
    padding: var(--size-2);
    border-radius: var(--size-2);
    background: light-dark(var(--gray-3), var(--gray-9));

    & > .menu-items {
      display: flex;
      flex-direction: column;
      gap: var(--size-2);
    }
  }
</style>
