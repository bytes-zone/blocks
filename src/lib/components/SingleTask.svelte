<script lang="ts">
  import { reldate } from '$lib/reldate';
  import type { Task } from '$lib/task';
  import { ClockFading, ClockAlert, Cuboid } from '@lucide/svelte';
  import { co } from 'jazz-tools';

  let { task }: { task: co.loaded<typeof Task> } = $props();
</script>

<div class="todo-item flex items-center gap-2 rounded-container px-2 py-1 hover:bg-primary-50-950">
  <div class="order-2">
    {task.title}
  </div>

  <input
    type="checkbox"
    checked={task?.completed}
    aria-label="Mark {task.title} {task.completed ? 'incomplete' : 'complete'}"
    onchange={(e) => (task.completed = e.currentTarget.checked)}
    class="order-1"
  />

  <div
    class="order-2 flex items-center gap-1 rounded-base border-1 p-0 pr-1 text-xs {task.plannedBlocks >
    0
      ? 'border-primary-500'
      : 'border-dashed border-primary-200-800'}"
  >
    <div class="px-1 {task.plannedBlocks > 0 ? 'bg-primary-500' : 'bg-primary-200-800'}">
      <Cuboid class="w-4 text-primary-50-950" aria-hidden="true" />
    </div>
    <div>
      {#if task.plannedBlocks > 0 || task.completedBlocks > 0}
        <span class="sr-only">
          {task.completedBlocks} out of {task.plannedBlocks} blocks completed
        </span>
        <span class="not-sr-only">
          {task.completedBlocks} / {task.plannedBlocks}
        </span>
      {:else}
        <span class="sr-only">less than one block planned</span>
        <span class="not-sr-only">&lt; 1</span>
      {/if}
    </div>
  </div>

  {#if task.wait && task.wait > new Date()}
    <div
      class="order-2 flex items-center gap-1 rounded-base border-1 border-surface-500 p-0 pr-1 text-xs"
    >
      <div class="bg-surface-500 px-1">
        <ClockFading class="w-4 text-surface-50-950" aria-hidden="true" />
      </div>
      <div>
        <span class="sr-only">start</span>
        {reldate(task.wait)}
      </div>
    </div>
  {/if}

  {#if task.due && task.due > new Date()}
    <div
      class="order-2 flex items-center gap-1 rounded-base border-1 border-warning-500 p-0 pr-1 text-xs"
    >
      <div class="bg-warning-500 px-1">
        <ClockAlert class="w-4 text-warning-50-950" aria-hidden="true" />
      </div>
      <div>
        <span class="sr-only">due</span>
        {reldate(task.due)}
      </div>
    </div>
  {/if}

  <button class="edit-todo-button">
    <span class="sr-only">Edit {task.title}</span>
  </button>
</div>

<style>
  .todo-item {
    position: relative;
  }

  .todo-item > input {
    z-index: 2;
  }

  .edit-todo-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }
</style>
