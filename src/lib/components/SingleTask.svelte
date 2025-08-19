<script lang="ts">
  import { reldate } from '$lib/reldate';
  import type { Task } from '$lib/task';
  import { ClockFading, ClockAlert, Cuboid } from '@lucide/svelte';
  import { co } from 'jazz-tools';
  import Tag from './Tag.svelte';

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

  <Tag icon={Cuboid} theme="primary" implicit={task.plannedBlocks == 0}>
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
  </Tag>

  {#if task.wait && task.wait > new Date()}
    <Tag icon={ClockFading} theme="surface">
      <span class="sr-only">start</span>
      {reldate(task.wait)}
    </Tag>
  {/if}

  {#if task.due && task.due > new Date()}
    <Tag icon={ClockAlert} theme="warning">
      <span class="sr-only">due</span>
      {reldate(task.due)}
    </Tag>
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
