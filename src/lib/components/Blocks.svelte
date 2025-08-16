<script lang="ts">
  const { planned, complete }: { planned: number; complete: number } = $props();

  const base = ['h-4', 'w-4', 'rounded-base'];
</script>

<div class="flex gap-2">
  <span class="sr-only">planned {planned} blocks, completed {complete}</span>
  {#each { length: Math.max(planned) }, n}
    <div
      class={base.concat(
        n + 1 <= complete
          ? ['bg-success-100-900']
          : ['border-solid', 'border-1', 'border-surface-500'],
      )}
    ></div>
  {:else}
    <div
      class={base.concat(['border-dashed', 'border-1', 'border-surface-300-700'])}
      style="font-size: box-height"
    ></div>
  {/each}
</div>
