<script lang="ts">
  import type { Icon } from '@lucide/svelte';
  import type { Snippet } from 'svelte';

  const {
    theme,
    implicit = false,
    children,
    icon,
  }: {
    theme: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'surface';
    implicit?: boolean;
    children: Snippet;
    icon: typeof Icon;
  } = $props();

  const CurrentIcon = icon;
</script>

<div
  class="order-2 flex items-center gap-1 rounded-base border-1 p-0 pr-1 text-xs {implicit
    ? `border-dashed border-${theme}-200-800`
    : `border-${theme}-500`}"
>
  <div class="px-1 {implicit ? `bg-${theme}-200-800` : `bg-${theme}-500`}">
    <CurrentIcon class="w-4 text-{theme}-50-950" aria-hidden="true" />
  </div>
  <div>
    {@render children()}
  </div>
</div>
