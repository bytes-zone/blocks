<script lang="ts">
  import type { Task } from '$lib/task';
  import { co } from 'jazz-tools';
  import Blocks from './Blocks.svelte';
  import { ClockAlert, ClockFading, Trash } from '@lucide/svelte';

  let { list }: { list: co.loaded<co.List<typeof Task>> } = $props();
</script>

{#snippet row(parent: co.loaded<co.List<typeof Task>>, task: Task, idx: number)}
  <tr>
    <td style="padding-left: {idx * 2}em">
      <input
        type="checkbox"
        checked={task?.completed}
        aria-label="Mark {task.completed ? 'incomplete' : 'complete'}"
      />
    </td>
    <td>
      <span class="inline-flex items-center gap-2">
        {task.title}
      </span>
    </td>
    <td>
      <Blocks planned={task.plannedBlocks} complete={task.completedBlocks} />
    </td>
    <td>
      {#if task.wait}
        <span class="inline-flex items-center gap-2">
          <ClockFading class="w-4" />
          {task.wait.toLocaleString()}
        </span>
      {/if}
    </td>
    <td>
      {#if task.due}
        <span class="inline-flex items-center gap-2">
          <ClockAlert class="w-4" />
          {task.due.toLocaleString()}
        </span>
      {/if}
    </td>
    <td>
      <button
        type="button"
        class="btn-icon preset-filled-error-50-950"
        title="Delete {task.title}"
        aria-label="Delete {task.title}"
        onclick={() => {
          let idx = parent.indexOf(task);
          if (idx > -1) {
            parent.splice(idx, 1);
          }
        }}
      >
        <Trash />
      </button>
    </td>
  </tr>
{/snippet}

<div class="table-wrap">
  <table class="table">
    <thead>
      <tr>
        <th scope="col"><span class="sr-only">Complete</span></th>
        <th scope="col">Task</th>
        <th scope="col">Blocks</th>
        <th scope="col">Wait</th>
        <th scope="col">Due</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each list as task (task?.id)}
        {#if task}
          {@render row(list, task, 0)}
        {/if}
      {:else}
        <tr>
          <td colspan="5" align="center">No tasks found! Try adding one above?</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  thead,
  tr {
    border: 0;
  }
</style>
