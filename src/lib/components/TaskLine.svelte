<script lang="ts">
  import type { Task } from '$lib/task';

  const { task }: { task: Task } = $props();
</script>

{#snippet box(text: string)}
  <span
    class="rounded-base border-1 border-surface-500 bg-surface-100-900 px-1 py-0.5 text-sm text-surface-900-100"
  >
    {text}
  </span>
{/snippet}

{#snippet dateTag(caption: string, when: Date | undefined)}
  {#if when}
    {@render box(`${caption}: ${when.toLocaleString()}`)}
  {/if}
{/snippet}

<div class="flex items-center gap-2 p-1">
  <input type="checkbox" aria-label="Complete {task.title}" />
  {task.title}

  <span class="sr-only">{task.blocks} blocks</span>
  {#each { length: task.blocks }}
    <div class="h-2 w-2 bg-surface-500"></div>
  {/each}

  {@render dateTag('wait', task.wait)}

  {@render dateTag('due', task.due)}
</div>
