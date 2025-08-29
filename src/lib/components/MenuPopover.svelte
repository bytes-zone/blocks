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
    padding: var(--box-padding);
    border-radius: var(--box-radius);
    background: light-dark(var(--gray-3), var(--gray-9));

    & > .menu-items {
      display: flex;
      flex-direction: column;
      gap: var(--between-items);
    }
  }
</style>
