<script lang="ts">
  import type { Task } from '$lib/task';
  import { co } from 'jazz-tools';
  import Blocks from './Blocks.svelte';

  let { list }: { list: co.loaded<co.List<typeof Task>> } = $props();
</script>

{#snippet row(task: Task, idx: number)}
  <tr>
    <td style="padding-left: {idx * 2}em" class="flex items-center gap-2">
      <input type="checkbox" checked={task?.completed} />
      {task.title}
    </td>
    <td>
      <Blocks planned={task.plannedBlocks} complete={task.completedBlocks} />
    </td>
    <td>{task.wait?.toLocaleString()}</td>
    <td>{task.due?.toLocaleString()}</td>
  </tr>
{/snippet}

<div class="table-wrap">
  <table class="table">
    <thead>
      <tr>
        <th>Task</th>
        <th>Blocks</th>
        <th>Wait</th>
        <th>Due</th>
      </tr>
    </thead>
    <tbody>
      {#each list as task (task?.id)}
        {#if task}
          {@render row(task, 0)}
        {/if}
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
