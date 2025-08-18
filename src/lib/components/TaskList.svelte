<script lang="ts">
  import type { Task } from '$lib/task';
  import { co } from 'jazz-tools';
  import Blocks from './Blocks.svelte';
  import { ClockAlert, ClockFading, Trash } from '@lucide/svelte';
  import DateEditor from './DateEditor.svelte';
  import { reldate } from '$lib/reldate';
  import SingleTask from './SingleTask.svelte';

  let { list }: { list: co.loaded<co.List<typeof Task>> } = $props();
</script>

{#snippet row(parent: co.loaded<co.List<typeof Task>>, task: Task, idx: number)}
  <tr>
    <td style="padding-left: {idx * 2}em" class="w-2">
      <input
        type="checkbox"
        checked={task?.completed}
        aria-label="Mark {task.title} {task.completed ? 'incomplete' : 'complete'}"
        onchange={(e) => (task.completed = e.currentTarget.checked)}
      />
    </td>
    <th scope="row">
      {task.title}
    </th>
    <td>
      <Blocks planned={task.plannedBlocks} complete={task.completedBlocks} />
    </td>
    <td>
      <DateEditor
        label="wait"
        value={task.wait}
        update={(newValue: Date | undefined) => (task.wait = newValue)}
      >
        {#snippet absent()}
          <span class="text-surface-400-600">No wait set</span>
        {/snippet}

        {#snippet present(date: Date)}
          <span class="inline-flex items-center gap-2">
            <ClockFading class="w-4" />
            {reldate(date)}
          </span>
        {/snippet}
      </DateEditor>
    </td>
    <td>
      <DateEditor
        label="due date"
        value={task.due}
        update={(newValue: Date | undefined) => (task.due = newValue)}
      >
        {#snippet absent()}
          <span class="text-surface-400-600">No due date set</span>
        {/snippet}

        {#snippet present(date: Date)}
          <span class="inline-flex items-center gap-2">
            <ClockAlert class="w-4" />
            {reldate(date)}
          </span>
        {/snippet}
      </DateEditor>
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
          <td colspan="6" align="center">No tasks found! Try adding one above?</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<ol class="flex flex-col gap-2">
  {#each list as task (task?.id)}
    {#if task}
      <li>
        <SingleTask {task} />
      </li>
    {/if}
  {/each}
</ol>

<style>
  thead,
  tr {
    border: 0;
  }
</style>
